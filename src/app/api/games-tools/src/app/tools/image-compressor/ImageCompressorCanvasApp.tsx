'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import PrefetchLink from "../../../components/PrefetchLink";

/**
 * Canvas Image Compressor & Converter (TSX)
 * - Local-only: no uploads.
 * - Converts between PNG/JPEG/WebP/AVIF (browser support dependent).
 * - "Auto optimize" tries to minimize file size while keeping perceptual quality (via PSNR on a downsampled preview).
 *
 * Reality check:
 * - "Minimum size without losing quality" is not physically possible for lossy codecs.
 *   What we can do is keep quality above a measurable threshold while shrinking size.
 */

type Format = {
  label: string;
  mime: string;
  ext: string;
  lossy: boolean;
  supportsQuality: boolean;
  supportsAlpha: boolean;
};

type ImageItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  width?: number;
  height?: number;
  outUrl?: string;
  outBytes?: number;
  outPSNR?: number | null;
  outBlob?: Blob | null;
  outExt?: string;
  outMime?: string;
};

const ALL_FORMATS: Format[] = [
  { label: "AVIF", mime: "image/avif", ext: "avif", lossy: true, supportsQuality: true, supportsAlpha: true },
  { label: "WebP", mime: "image/webp", ext: "webp", lossy: true, supportsQuality: true, supportsAlpha: true },
  { label: "JPEG", mime: "image/jpeg", ext: "jpg", lossy: true, supportsQuality: true, supportsAlpha: false },
  { label: "PNG", mime: "image/png", ext: "png", lossy: false, supportsQuality: false, supportsAlpha: true },
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "--";
  const units = ["B", "KB", "MB", "GB"];
  let u = 0;
  let v = bytes;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u++;
  }
  return `${v.toFixed(u === 0 ? 0 : 2)} ${units[u]}`;
}

function safeFileName(base: string): string {
  return (
    base
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^[-.]+|[-.]+$/g, "")
      .slice(0, 80) || "image"
  );
}

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function createTestCanvas(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 2;
  c.height = 2;
  const ctx = c.getContext("2d", { willReadFrequently: false });
  if (ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = "#fff";
    ctx.fillRect(1, 1, 1, 1);
  }
  return c;
}

function supportsMime(mime: string): boolean {
  try {
    const c = createTestCanvas();
    const url = c.toDataURL(mime);
    return url.startsWith(`data:${mime}`);
  } catch {
    return false;
  }
}

async function toBlobAsync(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob> {
  return await new Promise<Blob>((resolve, reject) => {
    try {
      canvas.toBlob(
        (b) => {
          if (!b) reject(new Error("Encoding failed (toBlob returned null)."));
          else resolve(b);
        },
        mime,
        quality
      );
    } catch (e) {
      reject(e instanceof Error ? e : new Error("Encoding failed."));
    }
  });
}

function drawImageHighQuality(
  ctx: CanvasRenderingContext2D,
  src: CanvasImageSource,
  dx: number,
  dy: number,
  dw: number,
  dh: number
) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(src, dx, dy, dw, dh);
}

function computeFitSize(w: number, h: number, maxSide: number) {
  if (maxSide <= 0) return { w, h, scale: 1 };
  const largest = Math.max(w, h);
  if (largest <= maxSide) return { w, h, scale: 1 };
  const scale = maxSide / largest;
  return { w: Math.max(1, Math.round(w * scale)), h: Math.max(1, Math.round(h * scale)), scale };
}

function computePSNR(a: ImageData, b: ImageData): number {
  const ad = a.data;
  const bd = b.data;
  let mse = 0;
  for (let i = 0; i < ad.length; i += 4) {
    const dr = ad[i] - bd[i];
    const dg = ad[i + 1] - bd[i + 1];
    const db = ad[i + 2] - bd[i + 2];
    mse += dr * dr + dg * dg + db * db;
  }
  mse /= (ad.length / 4) * 3;
  if (mse === 0) return Infinity;
  return 10 * Math.log10((255 * 255) / mse);
}

async function decodeToImageBitmap(blob: Blob): Promise<ImageBitmap> {
  if ("createImageBitmap" in window) {
    return await createImageBitmap(blob);
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Decode failed."));
      el.src = url;
    });
    return await createImageBitmap(img);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function loadFileToBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return await createImageBitmap(file);
  }
}

export default function ImageCompressorCanvasApp() {
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const workCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [items, setItems] = useState<ImageItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [imgName, setImgName] = useState<string>("image");
  const [origBytes, setOrigBytes] = useState<number>(0);
  const [origW, setOrigW] = useState<number>(0);
  const [origH, setOrigH] = useState<number>(0);

  // Start with all formats for SSR stability, then check client support.
  const [supportedMimeSet, setSupportedMimeSet] = useState<Set<string>>(new Set(ALL_FORMATS.map((f) => f.mime)));
  const [formatMime, setFormatMime] = useState<string>(ALL_FORMATS[0].mime);

  const [maxSide, setMaxSide] = useState<number>(2048);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [quality, setQuality] = useState<number>(0.82);
  const [psnrThreshold, setPsnrThreshold] = useState<number>(40);

  const [outBlob, setOutBlob] = useState<Blob | null>(null);
  const [outUrl, setOutUrl] = useState<string>("");
  const [outBytes, setOutBytes] = useState<number>(0);
  const [outPSNR, setOutPSNR] = useState<number | null>(null);

  const [busy, setBusy] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const selectedFormat = useMemo(
    () => ALL_FORMATS.find((f) => f.mime === formatMime) ?? ALL_FORMATS[ALL_FORMATS.length - 1],
    [formatMime]
  );

  useEffect(() => {
    const detected = new Set<string>();
    ALL_FORMATS.forEach((f) => {
      if (supportsMime(f.mime)) detected.add(f.mime);
    });
    setSupportedMimeSet(detected);
  }, []);

  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
      if (bitmap) bitmap.close();
    };
  }, [outUrl, bitmap]);

  useEffect(() => {
    if (!supportedMimeSet.size) return;
    // Only coerce if somehow current value is unknown.
    if (!ALL_FORMATS.some((f) => f.mime === formatMime)) {
      setFormatMime(ALL_FORMATS[0].mime);
    }
  }, [supportedMimeSet, formatMime]);

  useEffect(() => {
    if (!bitmap || !previewCanvasRef.current) return;
    const c = previewCanvasRef.current;
    const fit = computeFitSize(bitmap.width, bitmap.height, 900);
    c.width = fit.w;
    c.height = fit.h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    drawImageHighQuality(ctx, bitmap, 0, 0, c.width, c.height);
  }, [bitmap]);

  function syncActiveState(item: ImageItem, bm: ImageBitmap | null) {
    setActiveId(item.id);
    setImgName(item.name);
    setOrigBytes(item.size);
    setOrigW(item.width ?? bm?.width ?? 0);
    setOrigH(item.height ?? bm?.height ?? 0);
    setOutUrl(item.outUrl ?? "");
    setOutBlob(item.outBlob ?? null);
    setOutBytes(item.outBytes ?? 0);
    setOutPSNR(item.outPSNR ?? null);
  }

  async function activateItem(item: ImageItem) {
    setError("");
    setStatus("");
    setOutPSNR(null);

    if (bitmap) bitmap.close();

    try {
      const bm = await loadFileToBitmap(item.file);
      setBitmap(bm);
      const updated: ImageItem = { ...item, width: bm.width, height: bm.height };
      setItems((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
      syncActiveState(updated, bm);
    } catch (e) {
      setBitmap(null);
      syncActiveState(item, null);
      setError(e instanceof Error ? e.message : "Failed to load image.");
    }
  }

  async function handlePickFiles(fileList: FileList) {
    const files = Array.from(fileList);
    if (!files.length) return;

    const newItems: ImageItem[] = files.map((f) => ({
      id: createId(),
      file: f,
      name: safeFileName(f.name),
      size: f.size,
    }));

    setItems((prev) => [...prev, ...newItems]);
    await activateItem(newItems[0]);
  }

  function getWorkCanvas(): HTMLCanvasElement {
    if (!workCanvasRef.current) {
      workCanvasRef.current = document.createElement("canvas");
    }
    return workCanvasRef.current;
  }

  function drawToWorkCanvas(bm: ImageBitmap, outW: number, outH: number) {
    const c = getWorkCanvas();
    c.width = outW;
    c.height = outH;
    const ctx = c.getContext("2d", { willReadFrequently: false });
    if (!ctx) throw new Error("Canvas 2D context not available.");

    if (!selectedFormat.supportsAlpha) {
      ctx.save();
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, outW, outH);
      ctx.restore();
    } else {
      ctx.clearRect(0, 0, outW, outH);
    }

    drawImageHighQuality(ctx, bm, 0, 0, outW, outH);
    return c;
  }

  async function encodeWithSettingsFor(bm: ImageBitmap, q: number | undefined) {
    const fit = computeFitSize(bm.width, bm.height, maxSide);
    const c = drawToWorkCanvas(bm, fit.w, fit.h);

    const usedQ = selectedFormat.supportsQuality ? clamp(q ?? quality, 0.01, 1) : undefined;
    let blob: Blob;
    try {
      blob = await toBlobAsync(c, selectedFormat.mime, usedQ);
    } catch {
      throw new Error(
        `Encoding to ${selectedFormat.label} is not available in this browser. Try WebP or JPEG instead.`
      );
    }

    return { blob, usedQ, outW: fit.w, outH: fit.h };
  }

async function computePSNRAgainstOriginalFor(bm: ImageBitmap, out: Blob, bgColor: string, selectedFormat: Format) {
  const SAMPLE_MAX = 256;
  const fit = computeFitSize(bm.width, bm.height, SAMPLE_MAX);

  const aCanvas = document.createElement("canvas");
  aCanvas.width = fit.w;
  aCanvas.height = fit.h;
  const aCtx = aCanvas.getContext("2d", { willReadFrequently: true });
  if (!aCtx) return null;

  if (!selectedFormat.supportsAlpha) {
    aCtx.fillStyle = bgColor;
    aCtx.fillRect(0, 0, fit.w, fit.h);
  }
  drawImageHighQuality(aCtx, bm, 0, 0, fit.w, fit.h);
  const aData = aCtx.getImageData(0, 0, fit.w, fit.h);

  const outBm = await decodeToImageBitmap(out);
  try {
    const bCanvas = document.createElement("canvas");
    bCanvas.width = fit.w;
    bCanvas.height = fit.h;
    const bCtx = bCanvas.getContext("2d", { willReadFrequently: true });
    if (!bCtx) return null;

    if (!selectedFormat.supportsAlpha) {
      bCtx.fillStyle = bgColor;
      bCtx.fillRect(0, 0, fit.w, fit.h);
    }

    drawImageHighQuality(bCtx, outBm, 0, 0, fit.w, fit.h);
    const bData = bCtx.getImageData(0, 0, fit.w, fit.h);

    return computePSNR(aData, bData);
  } finally {
    outBm.close?.();
  }
}

  function persistOutputForItem(itemId: string, blob: Blob, psnr: number | null) {
    const fmt = ALL_FORMATS.find((f) => f.mime === formatMime) ?? ALL_FORMATS[ALL_FORMATS.length - 1];
    const url = URL.createObjectURL(blob);
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        if (item.outUrl && item.outUrl !== url) URL.revokeObjectURL(item.outUrl);
        return { ...item, outUrl: url, outBytes: blob.size, outPSNR: psnr, outBlob: blob, outExt: fmt.ext, outMime: fmt.mime };
      })
    );

    if (activeId === itemId) {
      if (outUrl && outUrl !== url) URL.revokeObjectURL(outUrl);
      setOutBlob(blob);
      setOutUrl(url);
      setOutBytes(blob.size);
      setOutPSNR(psnr);
    }
    return url;
  }

  async function optimizeSingle(item: ImageItem) {
    const bm = await loadFileToBitmap(item.file);
    const updatedItem = { ...item, width: bm.width, height: bm.height };
    setItems((prev) => prev.map((p) => (p.id === item.id ? updatedItem : p)));

    if (!selectedFormat.supportsQuality) {
      const { blob } = await encodeWithSettingsFor(bm, undefined);
      const psnr = selectedFormat.lossy ? await computePSNRAgainstOriginalFor(bm, blob, bgColor, selectedFormat) : Infinity;
      const url = persistOutputForItem(item.id, blob, psnr);
      return { blob, psnr, url };
    }

    let low = 0.3;
    let high = 1.0;
    let best: { blob: Blob; q: number; psnr: number } | null = null;

    for (const q of [0.35, 0.45, 0.55, 0.65, 0.75, 0.82, 0.9, 0.95, 1.0]) {
      const { blob } = await encodeWithSettingsFor(bm, q);
      const psnr = await computePSNRAgainstOriginalFor(bm, blob, bgColor, selectedFormat);
      if (psnr !== null && psnr >= psnrThreshold) {
        best = { blob, q, psnr };
        high = q;
        break;
      }
      low = q;
    }

    if (!best) {
      const { blob } = await encodeWithSettingsFor(bm, 1.0);
      const psnr = (await computePSNRAgainstOriginalFor(bm, blob, bgColor, selectedFormat)) ?? null;
      setQuality(1.0);
      const url = persistOutputForItem(item.id, blob, psnr);
      return { blob, psnr, url };
    }

    for (let i = 0; i < 8; i++) {
      const mid = (low + high) / 2;
      const { blob } = await encodeWithSettingsFor(bm, mid);
      const psnr = await computePSNRAgainstOriginalFor(bm, blob, bgColor, selectedFormat);
      if (psnr !== null && psnr >= psnrThreshold) {
        best = { blob, q: mid, psnr };
        high = mid;
      } else {
        low = mid;
      }
    }

    if (!best) throw new Error("Optimization failed.");
    setQuality(clamp(best.q, 0.01, 1));
    const url = persistOutputForItem(item.id, best.blob, best.psnr);
    return { blob: best.blob, psnr: best.psnr, url };
  }

  async function optimizeAll() {
    if (!items.length) {
      setError("Add images first.");
      return;
    }
    setError("");
    setStatus("Optimizing...");
    setBusy(true);
    let done = 0;
    try {
      for (const item of items) {
        setStatus(`Optimizing ${item.name} (${++done}/${items.length})...`);
        await optimizeSingle(item);
      }
      setStatus("All images optimized. Ready to download.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Optimize failed.");
    } finally {
      setBusy(false);
    }
  }

  function downloadItem(item: ImageItem) {
    if (!item.outUrl || !item.outBlob) {
      setError("Optimize the image first.");
      return;
    }
    const ext = item.outExt ?? (ALL_FORMATS.find((f) => f.mime === formatMime)?.ext ?? "img");
    const a = document.createElement("a");
    a.href = item.outUrl;
    a.download = `${item.name}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadAll() {
    const ready = items.filter((i) => i.outUrl);
    if (!ready.length) {
      setError("Nothing to download. Optimize first.");
      return;
    }
    ready.forEach(downloadItem);
    setStatus("Downloaded all optimized images.");
  }

  const savingsPct = useMemo(() => {
    if (!origBytes || !outBytes) return null;
    return (1 - outBytes / origBytes) * 100;
  }, [origBytes, outBytes]);

  return (
    <div className="app">
      <style>{`
        .app {
          color-scheme: dark;
          min-height: auto;
          background: transparent;
          color: var(--foreground);
          font-family: inherit;
        }
        .app *, .app *::before, .app *::after { box-sizing: border-box; }
        .app .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 16px clamp(10px, 4vw, 24px) 32px;
          width: 100%;
        }
        .app .header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.01em;
        }
        .app .muted { color: #a1a1aa; }
        .app .header p {
          margin: 8px 0 0;
          font-size: 13px;
        }
        .app .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 16px;
        }
        @media (min-width: 1200px) {
          .app .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
          }
        }
        .app .card {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(18,18,22,0.6);
          border-radius: 18px;
          padding: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          width: 100%;
        }
        .app .card h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .app .card .sub {
          margin: 4px 0 0;
          font-size: 12px;
          color: #a1a1aa;
        }
        .app .row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .app .stack { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
        .app .field { display: grid; gap: 6px; }
        .app label { font-size: 13px; color: #e4e4e7; }
        .app input[type="file"], .app select, .app input[type="number"], .app input[type="text"] {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.25);
          color: #f4f4f5;
          padding: 10px 12px;
          font-size: 13px;
          outline: none;
        }
        .app input[type="range"] { width: 100%; }
        .app .pill {
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.20);
          padding: 10px 12px;
          font-size: 13px;
          color: #e4e4e7;
        }
        .app .fileList { display: flex; flex-direction: column; gap: 8px; }
        .app .chipRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-height: 180px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .app .fileChip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #e4e4e7;
          font-size: 12px;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.15s;
        }
        .app .fileChipActive { border-color: rgba(45,212,191,0.6); transform: translateY(-1px); }
        .app .fileDot { width: 8px; height: 8px; border-radius: 999px; background: #2dd4bf; }
        .app .fileName { font-weight: 600; }
        .app .fileMeta { color: #a1a1aa; font-size: 11px; }
        .app .preview {
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.10);
          overflow: hidden;
          background: rgba(0,0,0,0.20);
        }
        .app canvas, .app img { display: block; width: 100%; height: auto; }
        .app .placeholder {
          padding: 18px;
          text-align: center;
          font-size: 13px;
          color: #a1a1aa;
        }
        .app .buttons { display: flex; gap: 10px; flex-wrap: wrap; }
        @media (max-width: 640px) { .app .buttons { flex-direction: column; width: 100%; } }
        .app .btn {
          border-radius: 16px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.18);
          color: #f4f4f5;
          cursor: pointer;
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .app .btnSmall { padding: 8px 10px; font-size: 12px; }
        .app .btnPrimary {
          background: #fafafa;
          border-color: rgba(255,255,255,0.0);
          color: #0a0a0b;
        }
        .app .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .app .btnIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
        }
        .app .downloadList {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
          max-height: 260px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .app .dlRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          gap: 12px;
        }
        .app .dlMeta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .app .alert {
          border-radius: 16px;
          padding: 10px 12px;
          font-size: 13px;
          border: 1px solid rgba(16,185,129,0.35);
          background: rgba(16,185,129,0.10);
          color: rgba(167,243,208,0.95);
        }
        .app .alertError {
          border-color: rgba(239,68,68,0.40);
          background: rgba(239,68,68,0.10);
          color: rgba(254,202,202,0.95);
        }
        .app .small { font-size: 12px; color: #a1a1aa; }
        .app .footer { margin-top: 18px; font-size: 12px; color: #7b7b86; }
        .app .colorRow { display: grid; grid-template-columns: 70px 1fr; gap: 10px; align-items: center; }
        .app input[type="color"] { width: 70px; height: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.14); background: transparent; padding: 0; }
        .app .backLink { margin-top: 12px; display: inline-block; color: #a1a1aa; }
      `}</style>

      <div className="container">
        <header className="header">
          <h1>Canvas Image Compressor &amp; Converter</h1>
          <p className="muted">
            Everything runs locally in your browser. Re-encoding strips metadata automatically. AVIF/WebP support depends on
            your browser.
          </p>
        </header>

        <div className="grid">
          <section className="card">
            <div>
              <h2>1) Pick an image</h2>
              <p className="sub">PNG, JPEG, WebP, AVIF... whatever your browser can decode.</p>
            </div>

            <div className="stack">
              <input
                type="file"
                accept="image/*,.avif,.heic,.heif,.tif,.tiff,.bmp,.gif,.png,.jpg,.jpeg,.webp"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) void handlePickFiles(files);
                }}
              />

              {items.length > 0 && (
                <div className="pill fileList">
                  <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 650 }}>Images</span>
                    <span className="small">{items.length} selected</span>
                  </div>
                  <div className="chipRow">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        className={["fileChip", activeId === item.id ? "fileChipActive" : ""].join(" ")}
                        onClick={() => void activateItem(item)}
                        type="button"
                      >
                        <span className="fileDot" />
                        <span className="fileName">{item.name}</span>
                        <span className="fileMeta">
                          {item.width && item.height ? `${item.width}x${item.height}` : "--"} - {formatBytes(item.size)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pill">
                <div className="row">
                  <span style={{ fontWeight: 650 }}>Active:</span>
                  <span>{imgName || "--"}</span>
                  <span className="muted">&bull;</span>
                  <span>{origW && origH ? `${origW}x${origH}` : "--"}</span>
                  <span className="muted">&bull;</span>
                  <span>{formatBytes(origBytes)}</span>
                </div>
              </div>

              <div className="preview">
                <canvas ref={previewCanvasRef} />
                {!bitmap && <div className="placeholder">No image loaded yet. Pick a file and the preview will show here.</div>}
              </div>
            </div>
          </section>

          <section className="card">
            <h2>2) Convert &amp; compress</h2>

            <div className="stack">
              <div className="field">
                <label>Output format</label>
                <select value={formatMime} onChange={(e) => setFormatMime(e.target.value)}>
                  {ALL_FORMATS.map((f) => {
                    const supported = supportedMimeSet.has(f.mime);
                    return (
                      <option key={f.mime} value={f.mime}>
                        {f.label} ({f.mime}){supported ? "" : " - may not be supported"}
                      </option>
                    );
                  })}
                </select>
                <div className="small">
                  Tip: AVIF and WebP often shrink best. If an option is disabled, your browser cannot encode it.
                </div>
              </div>

              <div className="field">
                <label>Resize (max side in px)</label>
                <input
                  type="number"
                  min={1}
                  max={20000}
                  value={maxSide}
                  onChange={(e) => setMaxSide(clamp(parseInt(e.target.value || "0", 10) || 0, 1, 20000))}
                />
                <div className="small">2048 is a nice default for web. Set higher to keep full resolution.</div>
              </div>

              {!selectedFormat.supportsAlpha && (
                <div className="field">
                  <label>Background (for transparency to JPEG)</label>
                  <div className="colorRow">
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                    <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                  </div>
                </div>
              )}

              {selectedFormat.supportsQuality && (
                <div className="field">
                  <label>Quality (manual)</label>
                  <input
                    type="range"
                    min={0.3}
                    max={1}
                    step={0.01}
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                  />
                  <div className="row small" style={{ justifyContent: "space-between" }}>
                    <span>{quality.toFixed(2)}</span>
                    <span>Higher = bigger file, fewer artifacts</span>
                  </div>
                </div>
              )}

              <div className="field">
                <label>Auto optimize target (PSNR dB)</label>
                <input
                  type="number"
                  min={25}
                  max={60}
                  value={psnrThreshold}
                  onChange={(e) => setPsnrThreshold(clamp(parseFloat(e.target.value || "40") || 40, 25, 60))}
                />
                <div className="small">40 dB is very high fidelity; 35 dB is usually visually clean.</div>
              </div>

              <div className="buttons">
                <button className="btn btnPrimary" disabled={!items.length || busy} onClick={() => void optimizeAll()}>
                  <span className="btnIcon">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M4 10a6 6 0 0 1 12 0 6 6 0 0 1-12 0Z" />
                      <path d="M10 4v3m0 6v3m6-6h-3M7 10H4" />
                    </svg>
                  </span>
                  Optimize all
                </button>
                <button
                  className="btn"
                  disabled={!items.some((i) => i.outUrl) || busy}
                  onClick={() => downloadAll()}
                >
                  <span className="btnIcon">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M10 3v10m0 0 4-4m-4 4-4-4" />
                      <path d="M4 15h12" />
                    </svg>
                  </span>
                  Download all
                </button>
              </div>

              {(status || error) && <div className={`alert ${error ? "alertError" : ""}`}>{error || status}</div>}

              <div className="pill">
                <div className="row" style={{ alignItems: "baseline" }}>
                  <span style={{ fontWeight: 650 }}>Output:</span>
                  <span>{outBlob ? formatBytes(outBytes) : "--"}</span>

                  {savingsPct !== null && (
                    <>
                      <span className="muted">&bull;</span>
                      <span>
                        {savingsPct >= 0 ? `${savingsPct.toFixed(1)}% smaller` : `${(-savingsPct).toFixed(1)}% larger`}
                      </span>
                    </>
                  )}

                  {outPSNR !== null && outPSNR !== Infinity && (
                    <>
                      <span className="muted">&bull;</span>
                      <span>PSNR: {outPSNR.toFixed(2)} dB</span>
                    </>
                  )}

                  {outPSNR === Infinity && (
                    <>
                      <span className="muted">&bull;</span>
                      <span>Lossless</span>
                    </>
                  )}
                </div>

                {outUrl ? (
                  <div className="preview" style={{ marginTop: 10 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={outUrl} alt="Output preview" />
                  </div>
                ) : (
                  <div className="small" style={{ marginTop: 10 }}>
                    Encode something to see the output preview.
                  </div>
                )}

                <div className="small" style={{ marginTop: 10 }}>
                  Nerd note: PSNR is computed on a small downsample (fast), so it is a guide, not a courtroom verdict.
                </div>
              </div>

              {items.length > 0 && (
                <div className="pill">
                  <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 650 }}>Downloads</span>
                    <span className="small">Pick a format, optimize, then download.</span>
                  </div>
                  <div className="downloadList">
                    {items.map((item) => (
                      <div className="dlRow" key={item.id}>
                        <div className="dlMeta">
                          <div className="fileName">{item.name}</div>
                          <div className="fileMeta">
                            {(item.width && item.height ? `${item.width}x${item.height}` : "--") + " - " + formatBytes(item.size)}
                            {item.outBytes ? ` -> ${formatBytes(item.outBytes)} (${item.outExt ?? selectedFormat.ext})` : ""}
                          </div>
                        </div>
                        <button
                          className="btn btnSmall"
                          disabled={!item.outUrl || busy}
                          onClick={() => downloadItem(item)}
                        >
                          <span className="btnIcon">
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                              <path d="M10 3v10m0 0 4-4m-4 4-4-4" />
                              <path d="M4 15h12" />
                            </svg>
                          </span>
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="footer">
                Privacy: the file never leaves your device. If AVIF is missing from the list, your browser cannot encode it yet.
              </div>
              <PrefetchLink href="/tools" className="backLink">
                Back to Tools
              </PrefetchLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
