'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { PageViewport, PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import workerSrc from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url';
import { PDFDocument } from 'pdf-lib';

const GWO = pdfjs.GlobalWorkerOptions;
if (GWO && !GWO.workerSrc) {
  GWO.workerSrc = workerSrc;
}

type UiError = { title: string; detail?: string };

type Placement = {
  id: string;
  pageNumber: number;
  xPdf: number;
  yPdf: number;
  wPdf: number;
  hPdf: number;
};

type DragMode =
  | { kind: 'none' }
  | {
      kind: 'move';
      id: string;
      startVx: number;
      startVy: number;
      startX: number;
      startY: number;
    }
  | {
      kind: 'resize';
      id: string;
      startVx: number;
      startVy: number;
      startW: number;
      startH: number;
    };

function safeId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {
      // ignore
    }
  }
  return `id_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return String(error);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const comma = dataUrl.indexOf(',');
  if (comma < 0) throw new Error('Invalid data URL');
  const b64 = dataUrl.slice(comma + 1);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let index = 0; index < bin.length; index += 1) bytes[index] = bin.charCodeAt(index);
  return bytes;
}

async function svgTextToPng(
  text: string,
  w = 720,
  h = 240,
  fontFamily = 'cursive'
): Promise<string> {
  const escaped = text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="transparent"/>
  <text x="${Math.round(w * 0.06)}" y="${Math.round(h * 0.7)}" font-family="${fontFamily}, cursive" font-size="${Math.round(
    h * 0.58
  )}" fill="#111" style="font-weight: 500; letter-spacing: 0.5px;">${escaped}</text>
</svg>`;

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error('Failed to render typed signature'));
    i.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });

  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL('image/png');
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="ic">{children}</span>;
}

const Icons = {
  Upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5-5 5 5" />
      <path d="M12 5v14" />
    </svg>
  ),
  Download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  ),
  Pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  Minus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14" />
    </svg>
  ),
  Plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  ),
  Left: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  Right: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  Trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  ),
};

function Btn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'danger';
  }
) {
  const { variant = 'ghost', className, ...rest } = props;
  return (
    <button
      {...rest}
      type={props.type ?? 'button'}
      className={`btn ${variant} ${className || ''}`.trim()}
    />
  );
}

export default function PdfSignerApp() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [err, setErr] = useState<UiError | null>(null);
  const [loading, setLoading] = useState(false);

  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfName, setPdfName] = useState('');
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1.15);

  const viewportRef = useRef<PageViewport | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  const [pagePx, setPagePx] = useState({ w: 0, h: 0 });

  const [sigPng, setSigPng] = useState<string | null>(null);
  const [sigAspect, setSigAspect] = useState(3.0);
  const [mode, setMode] = useState<'view' | 'place'>('view');

  const [placements, setPlacements] = useState<Placement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const drag = useRef<DragMode>({ kind: 'none' });

  const current = useMemo(
    () => placements.filter((p) => p.pageNumber === page),
    [placements, page]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMode('view');
        setSelectedId(null);
      }
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedId) {
        setPlacements((prev) => prev.filter((p) => p.id !== selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId]);

  const pickFile = () => fileInputRef.current?.click();

  async function loadFile(file: File) {
    setErr(null);
    setLoading(true);
    setMode('view');
    setSelectedId(null);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setLoading(false);
      setErr({ title: 'Not a PDF', detail: 'Please choose a .pdf file.' });
      return;
    }

    if (file.size > 80 * 1024 * 1024) {
      setLoading(false);
      setErr({ title: 'PDF is too large', detail: 'Try a smaller file.' });
      return;
    }

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      try {
        await pdfDoc?.destroy();
      } catch {
        // ignore
      }

      const task = pdfjs.getDocument({ data: bytes });
      const doc = await task.promise;

      setPdfBytes(bytes);
      setPdfName(file.name);
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setPage(1);
      setZoom(1.15);
      setPlacements([]);
    } catch (errorUnknown: unknown) {
      setErr({ title: 'Could not open PDF', detail: getErrorMessage(errorUnknown) });
    } finally {
      setLoading(false);
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) loadFile(file);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!pdfDoc) return;
      const canvas = pdfCanvasRef.current;
      if (!canvas) return;

      setLoading(true);
      setErr(null);

      try {
        renderTaskRef.current?.cancel?.();
      } catch {
        // ignore
      }

      try {
        const p = await pdfDoc.getPage(page);
        if (cancelled) return;

        const viewport = p.getViewport({
          scale: zoom,
          rotation: p.rotate || 0,
        });
        viewportRef.current = viewport;
        setPagePx({ w: Math.round(viewport.width), h: Math.round(viewport.height) });

        const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
        canvas.style.width = `${Math.round(viewport.width)}px`;
        canvas.style.height = `${Math.round(viewport.height)}px`;
        canvas.width = Math.round(viewport.width * dpr);
        canvas.height = Math.round(viewport.height * dpr);

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) throw new Error('No canvas context');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, viewport.width, viewport.height);

        const task = p.render({ canvasContext: ctx, viewport });
        renderTaskRef.current = task;
        await task.promise;
      } catch (errorUnknown: unknown) {
        const isCancelled =
          errorUnknown instanceof Error && errorUnknown.name === 'RenderingCancelledException';
        if (!isCancelled) {
          setErr({
            title: 'Failed to render page',
            detail: getErrorMessage(errorUnknown),
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
      try {
        renderTaskRef.current?.cancel?.();
      } catch {
        // ignore
      }
    };
  }, [pdfDoc, page, zoom]);

  function stageToPdf(vx: number, vy: number) {
    const vp = viewportRef.current;
    if (!vp) return null;
    const [x, y] = vp.convertToPdfPoint(vx, vy);
    return { x, y };
  }

  function pdfToStage(xPdf: number, yPdf: number) {
    const vp = viewportRef.current;
    if (!vp) return null;
    const [x, y] = vp.convertToViewportPoint(xPdf, yPdf);
    return { x, y };
  }

  function placementRect(p: Placement) {
    const tl = pdfToStage(p.xPdf, p.yPdf);
    const tr = pdfToStage(p.xPdf + p.wPdf, p.yPdf);
    const bl = pdfToStage(p.xPdf, p.yPdf - p.hPdf);
    if (!tl || !tr || !bl) return null;
    return { left: tl.x, top: tl.y, width: tr.x - tl.x, height: bl.y - tl.y };
  }

  const onStageClick = (event: React.MouseEvent) => {
    if (mode !== 'place') return;
    if (!sigPng) {
      setErr({ title: 'No signature', detail: 'Create a signature first.' });
      return;
    }
    const vp = viewportRef.current;
    const stage = stageRef.current;
    if (!vp || !stage) return;

    const rect = stage.getBoundingClientRect();
    const vx = event.clientX - rect.left;
    const vy = event.clientY - rect.top;

    const wPx = clamp(vp.width * 0.28, 120, 320);
    const hPx = wPx / Math.max(0.8, sigAspect);

    const pdfTL = stageToPdf(vx, vy);
    if (!pdfTL) return;

    const pdfTR = stageToPdf(vx + wPx, vy) || pdfTL;
    const pdfBL = stageToPdf(vx, vy + hPx) || pdfTL;

    const newPlacement: Placement = {
      id: safeId(),
      pageNumber: page,
      xPdf: pdfTL.x,
      yPdf: pdfTL.y,
      wPdf: Math.abs(pdfTR.x - pdfTL.x) || 120,
      hPdf: Math.abs(pdfTL.y - pdfBL.y) || 40,
    };

    setPlacements((prev) => [...prev, newPlacement]);
    setSelectedId(newPlacement.id);
  };

  const beginMove = (event: React.PointerEvent, p: Placement) => {
    event.preventDefault();
    event.stopPropagation();
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const vx = event.clientX - rect.left;
    const vy = event.clientY - rect.top;
    drag.current = {
      kind: 'move',
      id: p.id,
      startVx: vx,
      startVy: vy,
      startX: p.xPdf,
      startY: p.yPdf,
    };
    try {
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    setSelectedId(p.id);
  };

  const beginResize = (event: React.PointerEvent, p: Placement) => {
    event.preventDefault();
    event.stopPropagation();
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const vx = event.clientX - rect.left;
    const vy = event.clientY - rect.top;
    drag.current = {
      kind: 'resize',
      id: p.id,
      startVx: vx,
      startVy: vy,
      startW: p.wPdf,
      startH: p.hPdf,
    };
    try {
      (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    setSelectedId(p.id);
  };

  const onStagePointerMove = (event: React.PointerEvent) => {
    const d = drag.current;
    if (d.kind === 'none') return;

    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const vx = event.clientX - rect.left;
    const vy = event.clientY - rect.top;

    if (d.kind === 'move') {
      const dx = vx - d.startVx;
      const dy = vy - d.startVy;

      const a = stageToPdf(0, 0);
      const b = stageToPdf(dx, dy);
      if (!a || !b) return;
      const dxPdf = b.x - a.x;
      const dyPdf = b.y - a.y;

      setPlacements((prev) =>
        prev.map((p) =>
          p.id === d.id ? { ...p, xPdf: d.startX + dxPdf, yPdf: d.startY + dyPdf } : p
        )
      );
    }

    if (d.kind === 'resize') {
      const ddx = vx - d.startVx;

      const a = stageToPdf(0, 0);
      const b = stageToPdf(ddx, 0);
      if (!a || !b) return;
      const dWPdf = b.x - a.x;

      setPlacements((prev) =>
        prev.map((p) => {
          if (p.id !== d.id) return p;
          const newW = Math.max(20, d.startW + dWPdf);
          const newH = Math.max(10, newW / Math.max(0.8, sigAspect));
          return { ...p, wPdf: newW, hPdf: newH };
        })
      );
    }
  };

  const onStagePointerUp = (event: React.PointerEvent) => {
    if (drag.current.kind === 'none') return;
    drag.current = { kind: 'none' };
    try {
      (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setPlacements((prev) => prev.filter((p) => p.id !== selectedId));
    setSelectedId(null);
  };

  const exportPdf = async () => {
    setErr(null);
    if (!pdfBytes) {
      setErr({ title: 'No PDF loaded', detail: 'Open a PDF first.' });
      return;
    }
    if (!sigPng) {
      setErr({ title: 'No signature', detail: 'Create a signature first.' });
      return;
    }
    if (placements.length === 0) {
      setErr({ title: 'Nothing to export', detail: 'Place at least one signature.' });
      return;
    }

    setLoading(true);
    try {
      const doc = await PDFDocument.load(pdfBytes);
      const pngBytes = dataUrlToUint8Array(sigPng);
      const sigImg = await doc.embedPng(pngBytes);

      const pages = doc.getPages();
      for (const p of placements) {
        const pageObj = pages[p.pageNumber - 1];
        if (!pageObj) continue;
        pageObj.drawImage(sigImg, {
          x: p.xPdf,
          y: p.yPdf - p.hPdf,
          width: p.wPdf,
          height: p.hPdf,
          opacity: 1,
        });
      }

      const outBytes = await doc.save({ useObjectStreams: true });
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      const base = pdfName?.replace(/\.pdf$/i, '') || 'document';
      a.download = `${base}-signed.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (errorUnknown: unknown) {
      setErr({ title: 'Export failed', detail: getErrorMessage(errorUnknown) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app" onDrop={onDrop} onDragOver={onDragOver}>
      <header className="bar">
        <div className="brand">
          <div className="logo">PDF</div>
          <div>
            <div className="bt">PDF Signer</div>
            <div className="bs">multi-page - canvas - client-side</div>
          </div>
        </div>

        <div className="row">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />

          <Btn onClick={pickFile}>
            <Icon>{Icons.Upload}</Icon> PDF
          </Btn>

          <Btn
            onClick={async () => {
              const name = window.prompt('Type your name for a quick signature:', 'Your Name');
              if (!name) return;
              const png = await svgTextToPng(name);
              setSigPng(png);
              setSigAspect(720 / 240);
            }}
          >
            <Icon>{Icons.Pen}</Icon> Quick signature
          </Btn>

          <Btn
            variant={mode === 'place' ? 'primary' : 'ghost'}
            onClick={() => setMode((m) => (m === 'place' ? 'view' : 'place'))}
            disabled={!pdfDoc}
          >
            Place
          </Btn>

          <div className="sep" />

          <Btn
            onClick={() =>
              setZoom((z) => clamp(Number((z - 0.15).toFixed(2)), 0.4, 3))
            }
            disabled={!pdfDoc}
          >
            <Icon>{Icons.Minus}</Icon>
          </Btn>
          <span className="pill">{Math.round(zoom * 100)}%</span>
          <Btn
            onClick={() =>
              setZoom((z) => clamp(Number((z + 0.15).toFixed(2)), 0.4, 3))
            }
            disabled={!pdfDoc}
          >
            <Icon>{Icons.Plus}</Icon>
          </Btn>

          <div className="sep" />

          <Btn variant="primary" onClick={exportPdf} disabled={!pdfDoc || !sigPng || placements.length === 0}>
            <Icon>{Icons.Download}</Icon> Export
          </Btn>
        </div>
      </header>

      <main className="body">
        <aside className="side">
          <div className="sec">
            <div className="h">Document</div>
            <div className="muted">{pdfDoc ? pdfName : 'No PDF'}</div>
          </div>

          <div className="sec">
            <div className="h">Pages</div>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <Btn
                onClick={() => setPage((p) => clamp(p - 1, 1, numPages))}
                disabled={!pdfDoc || page <= 1}
              >
                <Icon>{Icons.Left}</Icon>
              </Btn>
              <span className="pill">
                {pdfDoc ? (
                  <>
                    <b>{page}</b> / {numPages}
                  </>
                ) : (
                  'N/A'
                )}
              </span>
              <Btn
                onClick={() => setPage((p) => clamp(p + 1, 1, numPages))}
                disabled={!pdfDoc || page >= numPages}
              >
                <Icon>{Icons.Right}</Icon>
              </Btn>
            </div>
          </div>

          <div className="sec">
            <div className="h">Placed</div>
            <div className="muted">{placements.length} total</div>
            <div className="row" style={{ marginTop: 8 }}>
              <Btn variant="danger" onClick={deleteSelected} disabled={!selectedId}>
                <Icon>{Icons.Trash}</Icon> Delete
              </Btn>
              <Btn
                onClick={() => setPlacements((p) => p.filter((x) => x.pageNumber !== page))}
                disabled={!pdfDoc || current.length === 0}
              >
                Clear page
              </Btn>
            </div>
          </div>

          <div className="sec">
            <div className="muted">
              {mode === 'place'
                ? 'Place mode: click page to add.'
                : 'Drag to move. Corner to resize. Delete removes.'}
            </div>
          </div>
        </aside>

        <section className="mainViewer">
          {!pdfDoc ? (
            <div className="empty" onClick={pickFile} role="button" tabIndex={0}>
              <div className="emptyCard">
                <div className="big">Drop a PDF here</div>
                <div className="muted">or click to choose one. Everything stays in your browser.</div>
              </div>
            </div>
          ) : (
            <div className="viewer">
              <div
                ref={stageRef}
                className={`stage ${mode === 'place' ? 'place' : ''}`}
                style={{ width: pagePx.w || undefined, height: pagePx.h || undefined }}
                onClick={onStageClick}
                onPointerMove={onStagePointerMove}
                onPointerUp={onStagePointerUp}
                onPointerCancel={onStagePointerUp}
              >
                <canvas ref={pdfCanvasRef} className="pdf" />

                {sigPng
                  ? current.map((p) => {
                      const rect = placementRect(p);
                      if (!rect) return null;
                      const selected = selectedId === p.id;
                      return (
                        <div
                          key={p.id}
                          className={`sig ${selected ? 'sel' : ''}`}
                          style={{
                            left: rect.left,
                            top: rect.top,
                            width: rect.width,
                            height: rect.height,
                          }}
                          onPointerDown={(event) => beginMove(event, p)}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedId(p.id);
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={sigPng} alt="Signature" draggable={false} />
                          <div
                            className="handle"
                            title="Resize"
                            onPointerDown={(event) => beginResize(event, p)}
                          />
                        </div>
                      );
                    })
                  : null}

                {loading ? <div className="load">Loading...</div> : null}
              </div>

              {sigPng ? (
                <div className="preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sigPng} alt="Signature preview" />
                </div>
              ) : (
                <div className="preview muted">No signature</div>
              )}

              {err ? (
                <div className="err" role="alert">
                  <div className="et">{err.title}</div>
                  {err.detail ? <div className="ed">{err.detail}</div> : null}
                </div>
              ) : null}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
