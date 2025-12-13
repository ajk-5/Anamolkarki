'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { PDFPage, RGB } from 'pdf-lib';
import styles from './PdfSigner.module.css';

type MarkKind = 'text' | 'signature';

interface Mark {
  id: string;
  pageIndex: number;
  xPercent: number; // 0..1 in preview space
  yPercent: number; // 0..1 in preview space
  value: string;
  kind: MarkKind;
}

interface SignaturePoint {
  xPercent: number;
  yPercent: number;
}

interface SignatureStroke {
  pageIndex: number;
  points: SignaturePoint[];
  color: string;
  width: number;
}

type PDFPageWithLine = PDFPage & {
  drawLine?: (options: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    thickness?: number;
    color?: RGB;
  }) => void;
};

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const PdfSignerApp: React.FC = () => {
  const [basePdfBytes, setBasePdfBytes] = useState<Uint8Array | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);
  const [pageSizes, setPageSizes] = useState<
    { width: number; height: number }[]
  >([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [mode, setMode] = useState<MarkKind>('text');
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>('#000000');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [textSize, setTextSize] = useState<number>(12);
  // Normalized stroke thickness in [0, 0.02] relative to page height
  const [strokeWidth, setStrokeWidth] = useState<number>(0.004);
  const [strokes, setStrokes] = useState<SignatureStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<SignatureStroke | null>(
    null
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please choose a PDF file.');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPageCount();

      setBasePdfBytes(new Uint8Array(arrayBuffer));
      setPageCount(pages);

       // Capture actual PDF page sizes so the on-screen aspect ratio
       // matches what we will use when writing into the PDF.
      const sizes: { width: number; height: number }[] = [];
      for (let index = 0; index < pages; index += 1) {
        const page = pdfDoc.getPage(index);
        const { width, height } = page.getSize();
        sizes.push({ width, height });
      }
      setPageSizes(sizes);

      setActivePage(0); // first page by default
      setMarks([]);
      setStrokes([]);
      setCurrentStroke(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } catch (error) {
      console.error(error);
      alert('Unable to read this PDF. Please try another file.');
    }
  };

  const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

  const getRelativePoint = (
    event: React.MouseEvent<HTMLDivElement>
  ): SignaturePoint | null => {
    if (!overlayRef.current) return null;
    const rect = overlayRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    return {
      xPercent: clamp01(x),
      yPercent: clamp01(y),
    };
  };

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!basePdfBytes) return;

    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, button')) {
      return;
    }

    const point = getRelativePoint(event);
    if (!point) return;

    if (mode === 'text') {
      const id = createId();
      const mark: Mark = {
        id,
        pageIndex: activePage,
        xPercent: point.xPercent,
        yPercent: point.yPercent,
        value: 'Your text here',
        kind: 'text',
      };
      setMarks((prev) => [...prev, mark]);
      setFocusedId(id);
      return;
    }

    if (mode === 'signature') {
      event.preventDefault();
      const newStroke: SignatureStroke = {
        pageIndex: activePage,
        points: [point],
        color: strokeColor,
        width: strokeWidth,
      };
      setCurrentStroke(newStroke);
      setIsDrawing(true);
    }
  };

  const handleOverlayMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || mode !== 'signature') return;

    const point = getRelativePoint(event);
    if (!point) return;

    setCurrentStroke((prev) =>
      prev ? { ...prev, points: [...prev.points, point] } : prev
    );
  };

  const finishStroke = () => {
    if (!isDrawing || !currentStroke || currentStroke.points.length < 2) {
      setIsDrawing(false);
      setCurrentStroke(null);
      return;
    }
    setStrokes((prev) => [...prev, currentStroke]);
    setIsDrawing(false);
    setCurrentStroke(null);
  };

  const handleOverlayMouseUp = () => {
    if (mode !== 'signature') return;
    finishStroke();
  };

  const handleOverlayMouseLeave = () => {
    if (mode !== 'signature') return;
    finishStroke();
  };

  const handleMarkChange = (id: string, value: string) => {
    setMarks((prev) => prev.map((mark) => (mark.id === id ? { ...mark, value } : mark)));
  };

  const handleRemoveMark = (id: string) => {
    setMarks((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearMarks = () => {
    if (!marks.length && !strokes.length) return;
    const ok = window.confirm('Remove all annotations from this PDF?');
    if (!ok) return;
    setMarks([]);
    setStrokes([]);
    setCurrentStroke(null);
    setIsDrawing(false);
  };

  const hexToRgb = (hex: string) => {
    const normalized = hex.trim();
    const value =
      normalized[0] === '#'
        ? normalized.slice(1)
        : normalized;

    if (value.length !== 6) return null;
    const r = Number.parseInt(value.slice(0, 2), 16);
    const g = Number.parseInt(value.slice(2, 4), 16);
    const b = Number.parseInt(value.slice(4, 6), 16);

    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
    return rgb(r / 255, g / 255, b / 255);
  };

  const handleDownload = async () => {
    if (!basePdfBytes) {
      alert('Upload a PDF first.');
      return;
    }

    if (!marks.length) {
      const ok = window.confirm(
        'No text or signatures have been placed. Download original PDF?'
      );
      if (!ok) return;
    }

    try {
      setIsDownloading(true);
      const pdfDoc = await PDFDocument.load(basePdfBytes);
      const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSignature = await pdfDoc.embedFont(
        StandardFonts.HelveticaOblique
      );

      const pages = pdfDoc.getPages();

      const textColorRgb = hexToRgb(textColor) ?? rgb(0, 0, 0);

      // Draw typed annotations (text) - top-left anchored like the overlay
      marks.forEach((mark) => {
        const page = pages[mark.pageIndex] || pages[0];
        const { width, height } = page.getSize();

        const x = mark.xPercent * width;

        const value = (mark.value || '').trim();
        if (!value) return;

        const font = mark.kind === 'signature' ? fontSignature : fontNormal;
        const size = mark.kind === 'signature' ? textSize : textSize;

        // mark.yPercent is the top edge of the box in overlay space (0 at top)
        const yTop = height * (1 - mark.yPercent);
        const baselineY = yTop - size;

        page.drawText(value, {
          x,
          y: baselineY,
          size,
          font,
          color: textColorRgb,
        });
      });

      // Draw pencil signatures as vector strokes
      strokes.forEach((stroke) => {
        const page = (pages[stroke.pageIndex] || pages[0]) as PDFPageWithLine;
        const { width, height } = page.getSize();
        const strokeRgb = hexToRgb(stroke.color) ?? rgb(0, 0, 0);

        for (let index = 1; index < stroke.points.length; index += 1) {
          const previous = stroke.points[index - 1];
          const current = stroke.points[index];

          const startX = previous.xPercent * width;
          const startY = height * (1 - previous.yPercent);
          const endX = current.xPercent * width;
          const endY = height * (1 - current.yPercent);

          if (typeof page.drawLine === 'function') {
            page.drawLine({
              start: { x: startX, y: startY },
              end: { x: endX, y: endY },
              thickness: stroke.width * height,
              color: strokeRgb,
            });
          } else {
            // Fallback: approximate by drawing very short text segments if drawLine is unavailable.
            page.drawText('.', {
              x: startX,
              y: startY,
              size: stroke.width * height,
              font: fontNormal,
              color: strokeRgb,
            });
          }
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'signed-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Something went wrong while generating the PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const marksForActivePage = marks.filter((m) => m.pageIndex === activePage);
  const strokesForActivePage = strokes.filter(
    (stroke) => stroke.pageIndex === activePage
  );
  const activePageSize = pageSizes[activePage];
  const pageSrc =
    previewUrl && pageCount > 0
      ? `${previewUrl}#page=${activePage + 1}`
      : previewUrl;

  const goToPage = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= pageCount) return;
    setActivePage(nextIndex);
    setFocusedId(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>PDF Signer &amp; Writer</h1>
        <p className={styles.subtitle}>
          Upload a PDF, click anywhere to add text or a typed signature, then
          download a new PDF where your additions remain fully selectable.
        </p>
      </div>

      <div className={styles.layout}>
        <section className={`${styles.panel} ${styles.previewPanel}`}>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className={styles.fileInputHidden}
          />

          <div className={styles.topToolbar}>
            <div className={styles.toolbarRowMain}>
              <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => goToPage(activePage - 1)}
                disabled={!basePdfBytes || activePage <= 0}
                title="Previous page"
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M14.7 6.7 13.3 5.3 6.6 12l6.7 6.7 1.4-1.4L9.4 12l5.3-5.3z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>Prev</span>
              </button>

              <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => goToPage(activePage + 1)}
                disabled={!basePdfBytes || activePage >= pageCount - 1}
                title="Next page"
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="m9.3 6.7 1.4-1.4 6.7 6.7-6.7 6.7-1.4-1.4L14.6 12 9.3 6.7z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>Next</span>
              </button>

              <button
                type="button"
                className={styles.toolbarButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4h7l3 3h6v13H4V4zm2 2v11h12V9h-5.5L9.5 6H6z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>
                  {basePdfBytes ? 'Change PDF' : 'Open PDF'}
                </span>
              </button>

              <button
                type="button"
                className={`${styles.toolbarButton} ${
                  mode === 'text' ? styles.toolbarButtonActive : ''
                }`}
                onClick={() => setMode('text')}
                disabled={!basePdfBytes}
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5h14v3h-2.5v11h-3V8H10v11H7V8H5V5z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>Text</span>
              </button>

              <button
                type="button"
                className={`${styles.toolbarButton} ${
                  mode === 'signature' ? styles.toolbarButtonActive : ''
                }`}
                onClick={() => setMode('signature')}
                disabled={!basePdfBytes}
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3 17.25c2.5-2 4-3 5.5-3 1.5 0 2 1 3 1s1.5-1 3-1c1.4 0 2.9.8 4.5 2.25V20c-1.6-1.45-3.1-2.25-4.5-2.25-1.5 0-2 .95-3 0.95s-1.5-.95-3-.95c-1.5 0-3 .8-5.5 2.25v-2.75z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>Signature</span>
              </button>

              <button
                type="button"
                className={styles.toolbarButton}
                onClick={handleClearMarks}
                disabled={!basePdfBytes || (!marks.length && !strokes.length)}
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5h14v2H5V5zm2.5 4h9L15 18H9L7.5 9z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>Clear</span>
              </button>

              <button
                type="button"
                className={styles.toolbarButton}
                onClick={handleDownload}
                disabled={isDownloading || !basePdfBytes}
              >
                <svg
                  className={styles.toolbarIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M11 3h2v9l3.5-3.5 1.4 1.4L12 15.3 6.1 9.9 7.5 8.5 11 12V3zm-6 14h14v2H5v-2z"
                    fill="currentColor"
                  />
                </svg>
                <span className={styles.toolbarLabel}>Download</span>
              </button>
            </div>

            <div className={styles.toolbarRowSecondary}>
              {pageCount > 1 && (
                <div className={styles.toolbarControl}>
                  <svg
                    className={styles.toolbarIconSmall}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 4h9l5 5v11H6V4zm9 1.5V10h4.5L15 5.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className={styles.toolbarControlInputs}>
                    <label className={styles.toolbarControlLabel}>
                      Page
                      <select
                        value={activePage}
                        onChange={(event) =>
                          setActivePage(Number(event.target.value))
                        }
                        className={styles.pageSelect}
                      >
                        {Array.from({ length: pageCount }, (_, index) => (
                          <option key={index} value={index}>
                            {index + 1} / {pageCount}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              <div className={styles.toolbarControl}>
                <svg
                  className={styles.toolbarIconSmall}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 5h16v3h-6v11h-4V8H4V5z"
                    fill="currentColor"
                  />
                </svg>
                <div className={styles.toolbarControlInputs}>
                  <label className={styles.toolbarControlLabel}>
                    Text colour
                    <input
                      type="color"
                      value={textColor}
                      onChange={(event) => setTextColor(event.target.value)}
                      className={styles.toolbarColorInput}
                    />
                  </label>
                  <label className={styles.toolbarControlLabel}>
                    Text size
                    <input
                      type="range"
                      min={8}
                      max={28}
                      step={1}
                      value={textSize}
                      onChange={(event) =>
                        setTextSize(Number(event.target.value))
                      }
                      className={styles.toolbarRangeInput}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.toolbarControl}>
                <svg
                  className={styles.toolbarIconSmall}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M4 18l6.5-6.5 3 3L7 21H4v-3zm14.8-9.9l-3 3-3-3L16 2.8c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4z"
                    fill="currentColor"
                  />
                </svg>
                <div className={styles.toolbarControlInputs}>
                  <label className={styles.toolbarControlLabel}>
                    Pencil colour
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(event) => setStrokeColor(event.target.value)}
                      className={styles.toolbarColorInput}
                    />
                  </label>
                  <label className={styles.toolbarControlLabel}>
                    Pencil width
                    <input
                      type="range"
                      min={0.001}
                      max={0.01}
                      step={0.0005}
                      value={strokeWidth}
                      onChange={(event) =>
                        setStrokeWidth(Number(event.target.value))
                      }
                      className={styles.toolbarRangeInput}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.previewHeader}>
            <div className={styles.sectionLabel}>Preview</div>
            {pageCount > 0 && (
              <div className={styles.previewMeta}>
                Page {activePage + 1} of {pageCount}
              </div>
            )}
          </div>

          {!previewUrl && (
            <div className={styles.previewPlaceholder}>
              <div className={styles.previewPlaceholderInner}>
                <div className={styles.previewIcon}>PDF</div>
                <div className={styles.previewTitle}>Waiting for a PDF</div>
                <div className={styles.previewText}>
                  Click “Open PDF” above to choose a file, then add text and
                  signatures directly on the page.
                </div>
              </div>
            </div>
          )}

          {previewUrl && (
            <div
              className={styles.previewFrameWrapper}
              style={
                activePageSize
                  ? { aspectRatio: activePageSize.width / activePageSize.height }
                  : undefined
              }
            >
              <div
                ref={overlayRef}
                className={styles.previewOverlay}
                onMouseDown={handleOverlayMouseDown}
                onMouseMove={handleOverlayMouseMove}
                onMouseUp={handleOverlayMouseUp}
                onMouseLeave={handleOverlayMouseLeave}
              >
                <svg
                  className={styles.signatureSvg}
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {strokesForActivePage.map((stroke, strokeIndex) => (
                    <polyline
                      key={strokeIndex}
                      points={stroke.points
                        .map(
                          (point) =>
                            `${point.xPercent},${point.yPercent}`
                        )
                        .join(' ')}
                      fill="none"
                      stroke={stroke.color}
                      strokeWidth={stroke.width}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                  {currentStroke &&
                    currentStroke.pageIndex === activePage &&
                    currentStroke.points.length > 1 && (
                      <polyline
                        points={currentStroke.points
                          .map(
                            (point) =>
                              `${point.xPercent},${point.yPercent}`
                          )
                          .join(' ')}
                        fill="none"
                        stroke={currentStroke.color}
                        strokeWidth={currentStroke.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                </svg>
                {marksForActivePage.map((mark) => (
                  <div
                    key={mark.id}
                    className={`${styles.mark} ${
                      mark.kind === 'signature' ? styles.markSignature : ''
                    }`}
                    style={{
                      left: `${mark.xPercent * 100}%`,
                      top: `${mark.yPercent * 100}%`,
                    }}
                  >
                    <textarea
                      className={styles.markInput}
                      style={{
                        color: textColor,
                        fontSize: `${textSize}px`,
                      }}
                      value={mark.value}
                      onChange={(event) =>
                        handleMarkChange(mark.id, event.target.value)
                      }
                      rows={mark.kind === 'signature' ? 1 : 2}
                      autoFocus={focusedId === mark.id}
                    />
                    <button
                      type="button"
                      className={styles.markRemove}
                      onClick={() => handleRemoveMark(mark.id)}
                      title="Remove"
                    >
                      x
                    </button>
                    <div className={styles.markLabel}>
                      {mark.kind === 'signature' ? 'Signature' : 'Text'}
                    </div>
                  </div>
                ))}
              </div>
              <iframe
                src={pageSrc ?? undefined}
                className={styles.pdfFrame}
                title="PDF preview"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PdfSignerApp;
