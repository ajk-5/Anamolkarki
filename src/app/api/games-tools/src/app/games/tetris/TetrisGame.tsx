'use client';
/* eslint-disable */
import { useEffect } from 'react';
import styles from './tetris.module.css';

export default function TetrisGame() {
  useEffect(() => {
    const canvas = document.getElementById('tetris') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    const ROWS = 20, COLS = 12; // logical grid size

    // dynamic pixel scale (updated on resize)
    let unitScale = 24; // pixels per logical unit (tile size)
    function resizeCanvas() {
      const small = window.matchMedia('(max-width:780px)').matches;
      const dpr = window.devicePixelRatio || 1;

      // Account for site chrome: header (+breaking bar) and footer
      const footer = document.querySelector('body > footer') as HTMLElement | null;
      const footerH = footer ? footer.getBoundingClientRect().height : 0;
      const rootStyle = getComputedStyle(document.documentElement);
      const headerRaw =
        rootStyle.getPropertyValue('--header-offset') ||
        rootStyle.getPropertyValue('--header-height') ||
        '0';
      const headerH = parseFloat(String(headerRaw)) || 0;
      const breakingBar = document.querySelector("[data-component='breaking-bar']") as HTMLElement | null;
      const barH = breakingBar ? breakingBar.getBoundingClientRect().height : 0;
      const vvh = window.visualViewport?.height ?? window.innerHeight;
      const safeH = Math.max(240, Math.floor(vvh - headerH - barH - footerH - 16));

      // Leave room for the info panel on desktop; tighter cap to avoid giant boards
      const estSidebar = small ? 0 : 320; // estimate sidebar + gap
      const maxW = Math.max(200, Math.min(window.innerWidth - estSidebar - 24, 560));
      const maxH = Math.max(260, Math.min(safeH, 560));

      const baseTile = Math.min(maxW / COLS, maxH / ROWS);
      const scale = small ? 0.9 : 0.92; // compact a bit
      // Ensure desktop board width >= sidebar (12 cols * ~25px = 300px)
      const minTile = small ? 12 : 25;
      const maxTile = 32; // slightly reduce max size for a smaller board
      const tileCss = Math.max(minTile, Math.min(maxTile, Math.floor(baseTile * scale)));
      const cssW = tileCss * COLS;
      const cssH = tileCss * ROWS;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      unitScale = canvas.width / COLS; // since aspect is exact, height/ROWS equals width/COLS
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 200));

    // --- Piece colors (used as subtle tints across all designs) -------------
    const colors = [
      null,
      '#c86ba0', // T
      '#5ec9e6', // I
      '#57d79d', // S
      '#bf7cf1', // Z
      '#ff9f2b', // L
      '#f3d36b', // O
      '#6f8dff', // J
    ];

    const pieces = 'TJLOSZI';

    // --- Game State ----------------------------------------------------------
    function createMatrix(w: number, h: number) {
      const m: number[][] = [];
      while (h--) m.push(new Array(w).fill(0));
      return m;
    }
    function createPiece(type: string) {
      switch (type) {
        case 'T':
          return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
          ];
        case 'O':
          return [
            [2, 2],
            [2, 2],
          ];
        case 'L':
          return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
          ];
        case 'J':
          return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
          ];
        case 'I':
          return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
          ];
        case 'S':
          return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
          ];
        case 'Z':
          return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
          ];
        default:
          return [];
      }
    }

    function collide(matrix: number[][], player: any) {
      const m = player.matrix;
      const o = player.pos;
      for (let y = 0; y < m.length; y++)
        for (let x = 0; x < m[y].length; x++)
          if (m[y][x] !== 0 && ((matrix[y + o.y] && matrix[y + o.y][x + o.x]) !== 0))
            return true;
      return false;
    }
    function merge(matrix: number[][], player: any) {
      player.matrix.forEach((row: number[], y: number) =>
        row.forEach((v, x) => {
          if (v) matrix[y + player.pos.y][x + player.pos.x] = v;
        }),
      );
    }

    // --- UI & Theme ----------------------------------------------------------
    const designSelect = document.getElementById('designSelect') as HTMLSelectElement;
    let theme = designSelect.value; // 'wood' | 'glass' | 'concrete' | 'metal'
    let designLocked = false;
    function lockDesign() {
      if (!designLocked) {
        designLocked = true;
        designSelect.disabled = true;
        designSelect.title = 'Design locked for this run';
      }
    }
    designSelect.addEventListener('change', () => {
      if (designLocked) {
        designSelect.value = theme;
        return;
      }
      theme = designSelect.value;
      ensureTextures();
    });

    // --- High-Res Textures (photoreal) --------------------------------------
    const TILE_PX = 128; // texture resolution
    const woodTiles: Record<number, HTMLCanvasElement> = {};
    const concreteTiles: Record<number, HTMLCanvasElement> = {};
    const glassTiles: Record<number, HTMLCanvasElement> = {};
    const metalTiles: Record<number, HTMLCanvasElement> = {};

    function hexToRGBA(hex: string, a = 1) {
      const h = hex.replace('#', '');
      const big = parseInt(h.length === 3 ? h.split('').map((ch) => ch + ch).join('') : h, 16);
      const r = (big >> 16) & 255,
        g = (big >> 8) & 255,
        b = big & 255;
      return `rgba(${r},${g},${b},${a})`;
    }

    function seededRandom(seed: number = 123456789) {
      let x = seed | 0;
      return () => {
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        return (x >>> 0) / 4294967296;
      };
    }

    // Wood: layered grain, knots, noise, varnish
    function makeWoodTile(tintHex: string) {
      const c = document.createElement('canvas');
      c.width = c.height = TILE_PX;
      const g = c.getContext('2d')!;
      const base = g.createLinearGradient(0, 0, TILE_PX, 0);
      base.addColorStop(0, '#6f3b12');
      base.addColorStop(0.5, '#9a5f2a');
      base.addColorStop(1, '#73441c');
      g.fillStyle = base;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      const rand = seededRandom((Math.random() * 1e9) | 0);
      g.globalAlpha = 0.16;
      g.lineWidth = 1;
      for (let i = 0; i < 32; i++) {
        const y = rand() * TILE_PX;
        const amp = 3 + rand() * 6;
        const freq = 0.02 + rand() * 0.06;
        g.beginPath();
        for (let x = 0; x <= TILE_PX; x++) {
          const yy = y + Math.sin(x * freq + i) * amp * (rand() * 0.6 + 0.7);
          if (x === 0) g.moveTo(0, yy);
          else g.lineTo(x, yy);
        }
        g.strokeStyle = rand() > 0.5 ? '#2a1407' : '#b98246';
        g.stroke();
      }
      g.globalAlpha = 1;
      for (let k = 0; k < 5; k++) {
        const cx = rand() * TILE_PX,
          cy = rand() * TILE_PX;
        const r = 3 + rand() * 6;
        const rg = g.createRadialGradient(cx, cy, 1, cx, cy, r);
        rg.addColorStop(0, 'rgba(40,20,8,0.55)');
        rg.addColorStop(1, 'rgba(40,20,8,0)');
        g.fillStyle = rg;
        g.beginPath();
        g.arc(cx, cy, r, 0, Math.PI * 2);
        g.fill();
      }
      // pores/noise
      const id = g.getImageData(0, 0, TILE_PX, TILE_PX);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = Math.random() * 24 - 12;
        d[i] += n;
        d[i + 1] += n;
        d[i + 2] += n;
      }
      g.putImageData(id, 0, 0);
      // tint & varnish
      g.globalCompositeOperation = 'multiply';
      g.fillStyle = hexToRGBA(tintHex, 0.18);
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      g.globalCompositeOperation = 'source-over';
      const varn = g.createLinearGradient(0, 0, 0, TILE_PX);
      varn.addColorStop(0, 'rgba(255,255,255,0.12)');
      varn.addColorStop(0.2, 'rgba(255,255,255,0.03)');
      varn.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = varn;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      return c;
    }

    // Concrete: speckle noise, micro cracks, pits, tint overlay
    function makeConcreteTile(tintHex: string) {
      const c = document.createElement('canvas');
      c.width = c.height = TILE_PX;
      const g = c.getContext('2d')!;
      g.fillStyle = '#8a8f96';
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      // random speckles
      const id = g.createImageData(TILE_PX, TILE_PX);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = 100 + (Math.random() * 80) | 0;
        d[i] = d[i + 1] = d[i + 2] = n;
        d[i + 3] = 255;
      }
      g.globalCompositeOperation = 'multiply';
      g.putImageData(id, 0, 0);
      g.globalCompositeOperation = 'source-over';
      // micro cracks
      g.strokeStyle = 'rgba(0,0,0,0.25)';
      g.lineWidth = 1;
      for (let i = 0; i < 14; i++) {
        g.beginPath();
        let x = Math.random() * TILE_PX,
          y = Math.random() * TILE_PX;
        g.moveTo(x, y);
        for (let k = 0; k < 10; k++) {
          x += (Math.random() - 0.5) * 18;
          y += (Math.random() - 0.5) * 18;
          g.lineTo(x, y);
        }
        g.stroke();
      }
      // pits
      for (let i = 0; i < 40; i++) {
        const cx = Math.random() * TILE_PX,
          cy = Math.random() * TILE_PX,
          r = 1 + Math.random() * 2;
        const rg = g.createRadialGradient(cx, cy, 0, cx, cy, r);
        rg.addColorStop(0, 'rgba(0,0,0,0.25)');
        rg.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = rg;
        g.beginPath();
        g.arc(cx, cy, r, 0, Math.PI * 2);
        g.fill();
      }
      // tint
      g.globalCompositeOperation = 'overlay';
      g.fillStyle = hexToRGBA(tintHex, 0.1);
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      g.globalCompositeOperation = 'source-over';
      return c;
    }

    // Glass: beveled slab with dust, rim Fresnel, internal reflections
    function makeGlassTile(tintHex: string) {
      const c = document.createElement('canvas');
      c.width = c.height = TILE_PX;
      const g = c.getContext('2d')!;
      // base slab
      const base = g.createLinearGradient(0, 0, 0, TILE_PX);
      base.addColorStop(0, '#ffffff');
      base.addColorStop(0.35, tintHex);
      base.addColorStop(1, '#0a0a0a');
      g.fillStyle = base;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      // rim fresnel
      const rg = g.createRadialGradient(TILE_PX / 2, TILE_PX / 2, TILE_PX * 0.3, TILE_PX / 2, TILE_PX / 2, TILE_PX * 0.7);
      rg.addColorStop(0, 'rgba(255,255,255,0)');
      rg.addColorStop(1, 'rgba(255,255,255,0.4)');
      g.fillStyle = rg;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      // highlight band
      const hg = g.createLinearGradient(0, TILE_PX * 0.1, 0, TILE_PX * 0.45);
      hg.addColorStop(0, 'rgba(255,255,255,0.70)');
      hg.addColorStop(1, 'rgba(255,255,255,0.03)');
      g.fillStyle = hg;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      // dust/scratches
      g.globalAlpha = 0.08;
      g.fillStyle = '#ffffff';
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * TILE_PX,
          y = Math.random() * TILE_PX,
          w = 1 + Math.random() * 8,
          h = 0.7;
        g.fillRect(x, y, w, h);
      }
      g.globalAlpha = 1;
      // tiny bubbles/imperfections
      for (let i = 0; i < 50; i++) {
        const cx = Math.random() * TILE_PX,
          cy = Math.random() * TILE_PX,
          r = 0.6 + Math.random() * 1.4;
        const b = g.createRadialGradient(cx, cy, 0, cx, cy, r);
        b.addColorStop(0, 'rgba(255,255,255,0.35)');
        b.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = b;
        g.beginPath();
        g.arc(cx, cy, r, 0, Math.PI * 2);
        g.fill();
      }
      // subtle tint overlay for depth
      g.globalCompositeOperation = 'multiply';
      g.fillStyle = hexToRGBA(tintHex, 0.2);
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      g.globalCompositeOperation = 'source-over';
      return c;
    }

    // Metal: brushed anisotropy, specular lobe, rivets
    function makeMetalTile(tintHex: string) {
      const c = document.createElement('canvas');
      c.width = c.height = TILE_PX;
      const g = c.getContext('2d')!;
      // base gradient
      const base = g.createLinearGradient(0, 0, TILE_PX, TILE_PX);
      base.addColorStop(0, '#868c96');
      base.addColorStop(0.5, '#c9ceda');
      base.addColorStop(1, '#7d8591');
      g.fillStyle = base;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      // brushed lines
      g.globalAlpha = 0.25;
      g.strokeStyle = '#aeb4c3';
      g.lineWidth = 1;
      for (let y = 0; y < TILE_PX; y += 2) {
        g.beginPath();
        for (let x = 0; x < TILE_PX; x += 8) {
          const n = (Math.random() - 0.5) * 4;
          g.moveTo(x, y + n);
          g.lineTo(x + 8, y + n);
        }
        g.stroke();
      }
      g.globalAlpha = 1;
      // fine noise
      const id = g.getImageData(0, 0, TILE_PX, TILE_PX);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = Math.random() * 14 - 7;
        d[i] += n;
        d[i + 1] += n;
        d[i + 2] += n;
      }
      g.putImageData(id, 0, 0);
      // specular lobe
      const spec = g.createRadialGradient(
        TILE_PX * 0.2,
        TILE_PX * 0.2,
        TILE_PX * 0.05,
        TILE_PX * 0.2,
        TILE_PX * 0.2,
        TILE_PX * 0.6,
      );
      spec.addColorStop(0, 'rgba(255,255,255,0.65)');
      spec.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = spec;
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      // tint overlay
      g.globalCompositeOperation = 'multiply';
      g.fillStyle = hexToRGBA(tintHex, 0.18);
      g.fillRect(0, 0, TILE_PX, TILE_PX);
      g.globalCompositeOperation = 'source-over';
      // rivets (baked)
      g.fillStyle = 'rgba(0,0,0,0.45)';
      const rr = 4;
      [
        [14, 14],
        [TILE_PX - 14, 14],
        [14, TILE_PX - 14],
        [TILE_PX - 14, TILE_PX - 14],
      ].forEach(([cx, cy]) => {
        g.beginPath();
        g.arc(cx, cy, rr, 0, Math.PI * 2);
        g.fill();
      });
      return c;
    }

    function ensureTextures() {
      if (theme === 'wood') {
        for (let i = 1; i <= 7; i++) if (!woodTiles[i]) woodTiles[i] = makeWoodTile(colors[i]!);
      }
      if (theme === 'concrete') {
        for (let i = 1; i <= 7; i++) if (!concreteTiles[i]) concreteTiles[i] = makeConcreteTile(colors[i]!);
      }
      if (theme === 'glass') {
        for (let i = 1; i <= 7; i++) if (!glassTiles[i]) glassTiles[i] = makeGlassTile(colors[i]!);
      }
      if (theme === 'metal') {
        for (let i = 1; i <= 7; i++) if (!metalTiles[i]) metalTiles[i] = makeMetalTile(colors[i]!);
      }
    }

    // --- Rendering -----------------------------------------------------------
    function applyScale() {
      ctx.setTransform(unitScale, 0, 0, unitScale, 0, 0);
    }

    function roundedPath(x: number, y: number, w: number, h: number, r: number) {
      const rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + w - rr, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
      ctx.lineTo(x + w, y + h - rr);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
      ctx.lineTo(x + rr, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
      ctx.lineTo(x, y + rr);
      ctx.quadraticCurveTo(x, y, x + rr, y);
      ctx.closePath();
    }

    function drawBlock(x: number, y: number, index: number) {
      switch (theme) {
        case 'wood':
          drawTexturedBlock(x, y, woodTiles[index], 0.18, true);
          break;
        case 'glass':
          drawTexturedBlock(x, y, glassTiles[index], 0.22, true, true);
          break;
        case 'concrete':
          drawTexturedBlock(x, y, concreteTiles[index], 0.1, false);
          break;
        case 'metal':
          drawTexturedBlock(x, y, metalTiles[index], 0.1, false);
          break;
        default:
          break;
      }
    }

    // shared textured draw with optional bevel and rim highlights
    function drawTexturedBlock(
      x: number,
      y: number,
      tile: HTMLCanvasElement,
      radius = 0.18,
      bevel = true,
      glossy = false,
    ) {
      const r = radius;
      ctx.save();
      roundedPath(x + 0.06, y + 0.06, 0.88, 0.88, r);
      ctx.clip();
      ctx.drawImage(tile, 0, 0, TILE_PX, TILE_PX, x, y, 1, 1);
      if (glossy) {
        const gg = ctx.createLinearGradient(x, y, x, y + 0.3);
        gg.addColorStop(0, 'rgba(255,255,255,0.65)');
        gg.addColorStop(1, 'rgba(255,255,255,0.05)');
        ctx.fillStyle = gg;
        ctx.fillRect(x, y, 1, 0.3);
      }
      ctx.restore();
      if (bevel) {
        ctx.lineWidth = 0.04;
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.beginPath();
        ctx.moveTo(x + 0.12, y + 0.14);
        ctx.lineTo(x + 0.88, y + 0.14);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 0.12, y + 0.14);
        ctx.lineTo(x + 0.12, y + 0.86);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(0,0,0,0.45)';
        ctx.beginPath();
        ctx.moveTo(x + 0.12, y + 0.86);
        ctx.lineTo(x + 0.88, y + 0.86);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 0.88, y + 0.14);
        ctx.lineTo(x + 0.88, y + 0.86);
        ctx.stroke();
      }
      ctx.lineWidth = 0.05;
      ctx.strokeStyle = glossy ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
      roundedPath(x + 0.06, y + 0.06, 0.88, 0.88, r);
      ctx.stroke();
    }

    function drawMatrix(matrix: number[][], offset: { x: number; y: number }) {
      matrix.forEach((row, y) =>
        row.forEach((value, x) => {
          if (value) drawBlock(x + offset.x, y + offset.y, value);
        }),
      );
    }

    // Grid lines (neutral across themes)
    function drawGrid() {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.16)';
      ctx.lineWidth = 0.05;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ROWS);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(COLS, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- Particles (line-clear only; style-specific) -------------------------
    const particles: any[] = [];
    function emitLineParticles(yRow: number) {
      for (let x = 0; x < COLS; x++) {
        const px = x + 0.5,
          py = yRow + 0.5;
        const count = 6;
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2;
          const s = Math.random() * 0.8 + 0.4;
          let color = '#fff';
          let r = 0.05;
          let life = 500 + Math.random() * 500;
          let type = theme;
          if (theme === 'wood') {
            color = '#d6a66a';
            r = 0.05 + Math.random() * 0.05;
          }
          if (theme === 'glass') {
            color = '#cfeeff';
            r = 0.04 + Math.random() * 0.04;
          }
          if (theme === 'concrete') {
            color = '#ccc';
            r = 0.05 + Math.random() * 0.06;
          }
          if (theme === 'metal') {
            color = '#ffd577';
            r = 0.03 + Math.random() * 0.05;
          }
          const vx = Math.cos(a) * 0.5 * s,
            vy = (Math.sin(a) - 0.8) * 0.5 * s;
          particles.push({ x: px, y: py, vx, vy, life, r, color, type });
        }
      }
    }
    function updateParticles(dt: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        if (p.type === 'metal') {
          p.vx *= 0.995;
          p.vy += 0.0015 * dt;
        } else {
          p.vy += (0.002 * dt) / 16;
        }
        p.x += (p.vx * dt) / 16;
        p.y += (p.vy * dt) / 16;
      }
    }
    function drawParticles() {
      ctx.save();
      particles.forEach((p) => {
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 800));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // --- WebAudio SFX (trigger on events) -----------------------------------
    let audioCtx: AudioContext | null = null,
      masterGain: GainNode | null = null;
    const soundBtn = document.getElementById('soundBtn') as HTMLButtonElement;
    let sfxVolume = 0.8;
    const volRange = document.getElementById('volRange') as HTMLInputElement;
    function ensureAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (!masterGain && audioCtx) {
        masterGain = audioCtx.createGain();
        masterGain.gain.value = sfxVolume;
        masterGain.connect(audioCtx.destination);
      }
    }
    soundBtn.addEventListener('click', () => {
      ensureAudio();
      audioCtx?.resume();
      soundBtn.textContent = '🔊 Sound on';
    });
    document.addEventListener('keydown', () => {
      ensureAudio();
      audioCtx?.resume();
      soundBtn.textContent = '🔊 Sound on';
    });
    function unlockAudioOnGesture() {
      ensureAudio();
      audioCtx?.resume();
      soundBtn.textContent = '🔊 Sound on';
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
      window.removeEventListener('mousedown', unlockAudioOnGesture);
    }
    window.addEventListener('touchstart', unlockAudioOnGesture, { passive: true });
    window.addEventListener('pointerdown', unlockAudioOnGesture);
    window.addEventListener('mousedown', unlockAudioOnGesture);

    volRange.addEventListener('input', () => {
      sfxVolume = +volRange.value / 100;
      if (masterGain) masterGain.gain.value = sfxVolume;
    });

    function sanitizeUI() {
      try {
        startBtn.textContent = 'Start';
        pauseBtn.textContent = 'Pause';
        restartBtn.textContent = 'Restart';
        const summary = document.querySelector('#settings > summary') as HTMLElement | null;
        if (summary) summary.textContent = 'Settings';
        soundBtn.textContent = 'Enable sound';
        const info = document.getElementById('info');
        const infoP = info?.querySelector('p');
        if (infoP) infoP.innerHTML = 'Enter: Start/Resume • P: Pause • R: Restart<br />←/→ Move • ↑ Rotate • ↓ Soft drop • Space Hard drop';
      } catch {}
      const setSoundOn = () => (soundBtn.textContent = 'Sound on');
      soundBtn.addEventListener('click', setSoundOn);
      document.addEventListener('keydown', setSoundOn);
      window.addEventListener('touchstart', setSoundOn, { passive: true });
      window.addEventListener('pointerdown', setSoundOn);
      window.addEventListener('mousedown', setSoundOn);
    }

    function noiseBuffer() {
      const sr = audioCtx?.sampleRate || 44100;
      const len = (sr * 0.6) | 0;
      const buf = audioCtx ? audioCtx.createBuffer(1, len, sr) : null;
      if (!buf) return null;
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      return buf;
    }
    function envGain(g: GainNode, t0: number, a: number, d: number) {
      g.gain.cancelScheduledValues(t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(1, t0 + a);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + a + d);
    }

    function playBreakSound() {
      if (!audioCtx) return;
      ensureAudio();
      const t = audioCtx.currentTime;
      const nb = noiseBuffer();
      if (!nb) return;
      const out = masterGain || audioCtx.destination;
      if (theme === 'glass') {
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const hp = audioCtx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2200;
        const g = audioCtx.createGain();
        envGain(g, t, 0.005, 0.25);
        n.connect(hp).connect(g).connect(out);
        n.start(t);
        n.stop(t + 0.3);
        [1800, 2400, 3200].forEach((f, i) => {
          const o = audioCtx!.createOscillator();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, t);
          const og = audioCtx!.createGain();
          envGain(og, t, 0.005, 0.2 - i * 0.04);
          o.connect(og).connect(out);
          o.start(t);
          o.stop(t + 0.25);
        });
      } else if (theme === 'wood') {
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 900;
        const g = audioCtx.createGain();
        envGain(g, t, 0.005, 0.18);
        n.connect(lp).connect(g).connect(out);
        n.start(t);
        n.stop(t + 0.25);
        const o = audioCtx.createOscillator();
        o.type = 'triangle';
        o.frequency.setValueAtTime(180, t);
        const og = audioCtx.createGain();
        envGain(og, t, 0.005, 0.12);
        o.connect(og).connect(out);
        o.start(t);
        o.stop(t + 0.2);
      } else if (theme === 'concrete') {
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 500;
        const g = audioCtx.createGain();
        envGain(g, t, 0.005, 0.35);
        n.connect(lp).connect(g).connect(out);
        n.start(t);
        n.stop(t + 0.4);
        const o = audioCtx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(90, t);
        const og = audioCtx.createGain();
        envGain(og, t, 0.003, 0.25);
        o.connect(og).connect(out);
        o.start(t);
        o.stop(t + 0.3);
      } else if (theme === 'metal') {
        const o1 = audioCtx.createOscillator();
        o1.type = 'sine';
        o1.frequency.setValueAtTime(520, t);
        const g1 = audioCtx.createGain();
        envGain(g1, t, 0.002, 0.18);
        o1.connect(g1).connect(out);
        o1.start(t);
        o1.stop(t + 0.2);
        const o2 = audioCtx.createOscillator();
        o2.type = 'sine';
        o2.frequency.setValueAtTime(820, t);
        const g2 = audioCtx.createGain();
        envGain(g2, t, 0.002, 0.15);
        o2.connect(g2).connect(out);
        o2.start(t);
        o2.stop(t + 0.18);
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const bp = audioCtx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 3000;
        const g3 = audioCtx.createGain();
        envGain(g3, t, 0.003, 0.12);
        n.connect(bp).connect(g3).connect(out);
        n.start(t);
        n.stop(t + 0.15);
      }
    }

    function playDropSound() {
      if (!audioCtx) return;
      ensureAudio();
      const t = audioCtx.currentTime;
      const nb = noiseBuffer();
      if (!nb) return;
      const out = masterGain || audioCtx.destination;
      if (theme === 'wood') {
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 600;
        const g = audioCtx.createGain();
        envGain(g, t, 0.004, 0.1);
        n.connect(lp).connect(g).connect(out);
        n.start(t);
        n.stop(t + 0.12);
        const o = audioCtx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(140, t);
        const og = audioCtx.createGain();
        envGain(og, t, 0.003, 0.08);
        o.connect(og).connect(out);
        o.start(t);
        o.stop(t + 0.1);
      } else if (theme === 'glass') {
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const hp = audioCtx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2500;
        const g = audioCtx.createGain();
        envGain(g, t, 0.002, 0.05);
        n.connect(hp).connect(g).connect(out);
        n.start(t);
        n.stop(t + 0.08);
        const o = audioCtx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(2100, t);
        const og = audioCtx.createGain();
        envGain(og, t, 0.002, 0.06);
        o.connect(og).connect(out);
        o.start(t);
        o.stop(t + 0.07);
      } else if (theme === 'concrete') {
        const n = audioCtx.createBufferSource();
        n.buffer = nb;
        const lp = audioCtx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 350;
        const g = audioCtx.createGain();
        envGain(g, t, 0.003, 0.14);
        n.connect(lp).connect(g).connect(out);
        n.start(t);
        n.stop(t + 0.16);
      } else if (theme === 'metal') {
        const o = audioCtx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(700, t);
        const og = audioCtx.createGain();
        envGain(og, t, 0.002, 0.07);
        o.connect(og).connect(out);
        o.start(t);
        o.stop(t + 0.09);
      }
    }

    // --- Start / Pause / Restart --------------------------------------------
    const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
    const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
    const restartBtn = document.getElementById('restartBtn') as HTMLButtonElement;

    let isRunning = false;
    let isPaused = false;
    let isGameOver = false;

    function updateButtons() {
      startBtn.disabled = isRunning;
      pauseBtn.disabled = !isRunning;
      pauseBtn.textContent = isPaused ? '▶️ Resume' : '⏸ Pause';
    }
    function refreshUI() {
      startBtn.disabled = isRunning;
      pauseBtn.disabled = !isRunning;
      pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    }

    function startGame() {
      if (isRunning) return;
      isRunning = true;
      isPaused = false;
      isGameOver = false;
      lockDesign();
      arena.forEach((row) => row.fill(0));
      player.score = 0;
      player.level = 1;
      dropInterval = 1000;
      updateScore();
      playerReset();
      refreshUI();
    }

    function pauseGame() {
      if (!isRunning) return;
      isPaused = true;
      refreshUI();
    }
    function resumeGame() {
      if (!isRunning) return;
      isPaused = false;
      refreshUI();
    }
    function restartGame() {
      isRunning = false;
      isPaused = false;
      isGameOver = false;
      designLocked = false;
      designSelect.disabled = false;
      designSelect.title = 'Pick a design then Start';
      arena.forEach((row) => row.fill(0));
      player.score = 0;
      player.level = 1;
      dropInterval = 1000;
      updateScore();
      playerReset();
      refreshUI();
    }

    function gameOver() {
      isRunning = false;
      isPaused = false;
      isGameOver = true;
      updateBest();
      refreshUI();
    }

    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', () => {
      if (!isRunning) return;
      isPaused ? resumeGame() : pauseGame();
    });
    restartBtn.addEventListener('click', restartGame);

    // --- Auto-pause on background (mobile friendly) -------------------------
    let wasRunningBeforeHide = false;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        wasRunningBeforeHide = isRunning && !isPaused;
        if (wasRunningBeforeHide) pauseGame();
      } else {
        if (audioCtx?.state === 'suspended') audioCtx.resume();
        if (wasRunningBeforeHide) resumeGame();
      }
    });

    // --- Best score (localStorage) ------------------------------------------
    const bestEl = document.getElementById('best')!;
    let best = Number(localStorage.getItem('tetrisBest') ?? 0);
    bestEl.textContent = best.toString();
    function updateBest() {
      if (player.score > best) {
        best = player.score;
        bestEl.textContent = best.toString();
        localStorage.setItem('tetrisBest', best.toString());
      }
    }

    // --- Gameplay ------------------------------------------------------------
    function rotate(matrix: number[][], dir: number) {
      for (let y = 0; y < matrix.length; y++)
        for (let x = 0; x < y; x++)
          [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      if (dir > 0) matrix.forEach((row) => row.reverse());
      else matrix.reverse();
    }

    function playerDrop() {
      player.pos.y++;
      if (collide(arena, player)) {
        player.pos.y--;
        playDropSound();
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
      }
      dropCounter = 0;
    }
    function hardDrop() {
      while (!collide(arena, player)) player.pos.y++;
      player.pos.y--;
      playDropSound();
      merge(arena, player);
      playerReset();
      arenaSweep();
      updateScore();
    }
    function playerMove(dir: number) {
      player.pos.x += dir;
      if (collide(arena, player)) player.pos.x -= dir;
    }

    function playerReset() {
      const type = pieces[Math.floor(pieces.length * Math.random())];
      player.matrix = createPiece(type);
      player.pos.y = 0;
      player.pos.x = Math.floor(COLS / 2) - Math.floor(player.matrix[0].length / 2);
      if (collide(arena, player)) {
        gameOver();
      }
    }

    function playerRotate(dir: number) {
      const pos = player.pos.x;
      let offset = 1;
      rotate(player.matrix, dir);
      while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
          rotate(player.matrix, -dir);
          player.pos.x = pos;
          return;
        }
      }
    }

    function arenaSweep() {
      let clearedAny = false;
      let rowsCleared = 0;
      const clearedRowsY: number[] = [];
      outer: for (let y = arena.length - 1; y >= 0; y--) {
        for (let x = 0; x < arena[y].length; x++) if (arena[y][x] === 0) continue outer;
        clearedAny = true;
        rowsCleared++;
        clearedRowsY.push(y);
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        y++;
      }
      if (clearedAny) {
        clearedRowsY.forEach((y) => emitLineParticles(y));
        playBreakSound();
        let rowCount = 1;
        for (let i = 0; i < rowsCleared; i++) {
          player.score += rowCount * 10;
          rowCount *= 2;
        }
        if (player.score >= player.level * 100) {
          player.level++;
          dropInterval = Math.max(120, dropInterval - 100);
        }
        updateBest();
      }
    }

    function updateScore() {
      (document.getElementById('score') as HTMLElement).textContent = player.score.toString();
      (document.getElementById('level') as HTMLElement).textContent = player.level.toString();
      updateBest();
    }

    // --- Render loop ---------------------------------------------------------
    let dropCounter = 0,
      dropInterval = 1000,
      lastTime = 0;
    function drawBackground() {
      const g = ctx.createLinearGradient(0, 0, 0, ROWS);
      g.addColorStop(0, '#3d16c1');
      g.addColorStop(1, '#1a073f');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, COLS, ROWS);
    }

    function drawOverlay(text: string) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fff';
      const size = Math.max(18, Math.floor(canvas.width / 18));
      ctx.font = `bold ${size}px system-ui`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      ctx.restore();
    }

    function update(time = 0) {
      const dt = time - lastTime;
      lastTime = time;
      if (isRunning && !isPaused) {
        dropCounter += dt;
        if (dropCounter > dropInterval) playerDrop();
        updateParticles(dt);
      }

      applyScale();
      drawBackground();
      drawGrid();
      ensureTextures();
      drawMatrix(arena, { x: 0, y: 0 });
      drawMatrix(player.matrix, player.pos);
      drawParticles();

      if (!isRunning) drawOverlay('Tap ▶️ Start or press Enter');
      else if (isPaused) drawOverlay('Paused — tap ▶️ or press Enter');

      if (isGameOver) drawOverlay('Game Over — Tap Start or press Enter');
      if (!isRunning && !isGameOver) drawOverlay('Tap Start or press Enter');
      else if (isPaused) drawOverlay('Paused — tap Pause or press Enter');
      requestAnimationFrame(update);
    }

    // --- Init ----------------------------------------------------------------
    const arena = createMatrix(COLS, ROWS);
    const player: any = { pos: { x: 0, y: 0 }, matrix: null, score: 0, level: 1 };

    const handled = new Set([
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
      'Space',
      'Enter',
      'KeyP',
      'KeyR',
    ]);
    document.addEventListener('keydown', (e) => {
      if (handled.has(e.code)) e.preventDefault();
      if (!isRunning) {
        if (e.code === 'Enter') {
          startGame();
        } else return;
      }
      if (isPaused) {
        if (e.code === 'KeyP' || e.code === 'Enter') {
          resumeGame();
        }
        return;
      }
      switch (e.code) {
        case 'ArrowLeft':
          playerMove(-1);
          break;
        case 'ArrowRight':
          playerMove(1);
          break;
        case 'ArrowDown':
          playerDrop();
          break;
        case 'ArrowUp':
          playerRotate(1);
          break;
        case 'Space': {
          hardDrop();
          break;
        }
        case 'KeyP':
          pauseGame();
          break;
        case 'KeyR':
          restartGame();
          break;
      }
    });

    // Touch gestures on canvas
    let tStartX: number | null = null,
      tStartY: number | null = null,
      tStartT = 0,
      lastTap = 0;
    canvas.addEventListener(
      'touchstart',
      (e) => {
        const t = e.touches[0];
        tStartX = t.clientX;
        tStartY = t.clientY;
        tStartT = Date.now();
      },
      { passive: true },
    );
    canvas.addEventListener(
      'touchend',
      (e) => {
        if (!isRunning) {
          startGame();
          return;
        }
        if (isPaused) {
          resumeGame();
          return;
        }
        const t = e.changedTouches[0];
        const dx = t.clientX - (tStartX || 0);
        const dy = t.clientY - (tStartY || 0);
        const adx = Math.abs(dx),
          ady = Math.abs(dy);
        const now = Date.now();
        if (adx < 12 && ady < 12) {
          // Treat both single and double taps as rotate (no drop on double tap)
          playerRotate(1);
          lastTap = now;
        } else if (adx > ady) {
          playerMove(dx > 0 ? 1 : -1);
        } else if (dy > 0) {
          // On mobile, make swipe-down a hard drop; otherwise soft drop
          if (window.matchMedia('(max-width:780px)').matches) hardDrop();
          else playerDrop();
        }
      },
      { passive: true },
    );

    // On-screen buttons
    document.getElementById('touchControls')!.addEventListener(
      'touchstart',
      (e) => {
        const btn = (e.target as HTMLElement).closest('button');
        if (!btn) return;
        const act = btn.getAttribute('data-act');
        if (!isRunning) {
          startGame();
        }
        if (isPaused) {
          resumeGame();
        }
        if (act === 'left') playerMove(-1);
        if (act === 'right') playerMove(1);
        if (act === 'rotate') playerRotate(1);
        if (act === 'drop') hardDrop();
      },
      { passive: true },
    );

    ensureTextures();
    updateScore();
    playerReset();
    refreshUI();
    sanitizeUI();
    update();
  }, []);

  return (
    <div className={styles.container}>
      <canvas
        id="tetris"
        className={styles.canvas}
        width={288}
        height={480}
        aria-label="Tetris board"
      ></canvas>
      <div
        id="touchControls"
        className={styles.touchControls}
        aria-label="Touch controls"
      >
        <button data-act="left" aria-label="Move left">&larr;</button>
        <button data-act="rotate" aria-label="Rotate">&#8635;</button>
        <button data-act="right" aria-label="Move right">&rarr;</button>
        <button data-act="drop" className={styles.wide} aria-label="Hard drop">&darr; Hard Drop</button>
      </div>
      <div id="info" className={styles.info} aria-live="polite">
        <h2>Controls</h2>
        <p>
          Enter: Start/Resume · P: Pause · R: Restart
          <br />⬅️ ➡️ Move · ⬆️ Rotate · ⬇️ Soft drop · Space Hard drop
        </p>
        <div className={styles.row}>
          <label htmlFor="designSelect">
            Design <small>(locks on Start)</small>
          </label>
          <select id="designSelect"  defaultValue="wood">
            <option value="wood">
              Wood
            </option>
            <option value="glass">Glass</option>
            <option value="concrete">Concrete</option>
            <option value="metal">Metal</option>
          </select>
        </div>
        <div className={styles.btnrow}>
          <button id="startBtn">▶️ Start</button>
          <button id="pauseBtn" disabled>
            ⏸ Pause
          </button>
          <button id="restartBtn">🔄 Restart</button>
        </div>
        <details id="settings" className={styles.settings}>
          <summary>⚙️ Settings</summary>
          <div className={styles.row}>
            <button id="soundBtn">🔊 Enable sound</button>
          </div>
          <div className={styles.row}>
            <label htmlFor="volRange">
              <span>SFX Volume</span>
            </label>
            <input id="volRange" type="range" min="0" max="100" defaultValue="80" />
          </div>
        </details>
        <div className={styles.stat}>
          <span className={styles.title}>Score</span>
          <span className={styles.value} id="score">
            0
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.title}>Level</span>
          <span className={styles.value} id="level">
            1
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.title}>Best</span>
          <span className={styles.value} id="best">
            0
          </span>
        </div>
      </div>
    </div>
  );
}

