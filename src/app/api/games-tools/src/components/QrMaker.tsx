'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import styles from './QrMaker.module.css';

export default function QrMaker() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(2);
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [renderAs, setRenderAs] = useState<'canvas' | 'svg'>('canvas');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const options = useMemo(() => ({
    errorCorrectionLevel: level,
    margin,
    color: {
      dark: fgColor,
      light: bgColor,
    },
    width: size,
    scale: undefined as number | undefined,
  }), [level, margin, fgColor, bgColor, size]);

  useEffect(() => {
    let isCancelled = false;
    async function draw() {
      try {
        if (renderAs === 'canvas' && canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, text || ' ', options);
        } else if (renderAs === 'svg' && svgRef.current) {
          const svgStr = await QRCode.toString(text || ' ', { ...options, type: 'svg', width: size });
          if (!isCancelled && svgRef.current) {
            svgRef.current.innerHTML = svgStr;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    draw();
    return () => {
      isCancelled = true;
    };
  }, [text, options, renderAs, size]);

  const handleDownload = () => {
    const filenameBase = `qr_${Date.now()}`;
    if (renderAs === 'canvas' && canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filenameBase}.png`;
      a.click();
    } else if (renderAs === 'svg' && svgRef.current) {
      const svgContainer = svgRef.current;
      const innerSvg = svgContainer.querySelector('svg') || svgContainer;
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(innerSvg);
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filenameBase}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopyPng = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
       
        await navigator.clipboard.write([
          new window.ClipboardItem({ 'image/png': blob }),
        ]);
        alert('Copied PNG to clipboard!');
      });
    } catch {
      alert('Copy failed. Your browser may not support image clipboard yet.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>QR Code Generator</h1>
        <a href="https://www.npmjs.com/package/qrcode" target="_blank" rel="noreferrer">
          Powered by <code>qrcode</code>
        </a>
      </header>
      <div className={styles.grid}>
        <section className={styles.controls}>
          <div className={styles.field}>
            <label className={styles.label}>Text / URL</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className={styles.textarea}
              placeholder="Enter text or URL"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Size: {size}px</label>
            <input
              type="range"
              min={128}
              max={1024}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className={styles.range}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Margin: {margin}</label>
            <input
              type="range"
              min={0}
              max={8}
              value={margin}
              onChange={(e) => setMargin(parseInt(e.target.value))}
              className={styles.range}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Error Correction</label>
            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')
              }
              className={styles.select}
            >
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Foreground</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className={styles.colorInput}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Background</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className={styles.colorInput}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Render As</label>
            <div>
              <label>
                <input
                  type="radio"
                  checked={renderAs === 'canvas'}
                  onChange={() => setRenderAs('canvas')}
                />{' '}
                Canvas (PNG)
              </label>
              <label>
                <input
                  type="radio"
                  checked={renderAs === 'svg'}
                  onChange={() => setRenderAs('svg')}
                />{' '}
                SVG
              </label>
            </div>
          </div>
          <div className={styles.buttonRow}>
            <button onClick={handleDownload} className={styles.buttonPrimary}>
              Download {renderAs === 'canvas' ? 'PNG' : 'SVG'}
            </button>
            {renderAs === 'canvas' && (
              <button onClick={handleCopyPng} className={styles.buttonSecondary}>
                Copy PNG to Clipboard
              </button>
            )}
          </div>
        </section>
        <section className={styles.preview}>
          <h2 className={styles.label}>Preview</h2>
          <div className={styles.previewBox}>
            {renderAs === 'canvas' ? (
              <canvas ref={canvasRef} width={size} height={size} />
            ) : (
              <div>
                <svg ref={svgRef} />
              </div>
            )}
          </div>
          <p className={styles.tip}>
            Tip: Higher error correction (Q/H) makes the code more robust but slightly denser.
          </p>
        </section>
      </div>
    </div>
  );
}

