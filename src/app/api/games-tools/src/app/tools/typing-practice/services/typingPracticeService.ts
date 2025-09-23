import { WORDS_EASY, WORDS_MEDIUM, WORDS_HARD, QUOTES } from '../utilities/wordBank';
import { formatTime } from '../utilities/format';

export function initializeTypingPractice(initialText: string, styles: { [key: string]: string }) {
  // === DOM refs ===
  const canvas = document.getElementById('typingCanvas') as HTMLCanvasElement;
  const mobileInput = document.getElementById('mobileInput') as HTMLInputElement;
  const modeSel = document.getElementById('mode') as HTMLSelectElement;
  const diffSel = document.getElementById('difficulty') as HTMLSelectElement;
  const wordCountInput = document.getElementById('wordCount') as HTMLInputElement;
  const wordsCountGroup = document.getElementById('wordsCountGroup') as HTMLDivElement;
  const customTextEl = document.getElementById('customText') as HTMLTextAreaElement;
  const btnStart = document.getElementById('btnStart') as HTMLButtonElement;
  const btnPause = document.getElementById('btnPause') as HTMLButtonElement;
  const btnReset = document.getElementById('btnReset') as HTMLButtonElement;
  const btnNext = document.getElementById('btnNext') as HTMLButtonElement;
  const btnTheme = document.getElementById('btnTheme') as HTMLButtonElement;
  const wpmEl = document.getElementById('wpm') as HTMLDivElement;
  const accEl = document.getElementById('accuracy') as HTMLDivElement;
  const timeEl = document.getElementById('time') as HTMLDivElement;
  const statusEl = document.getElementById('status') as HTMLDivElement;

  // === Canvas state ===
  const DPR = window.devicePixelRatio || 1;
  const PADDING = 32; // css pixels
  const FONT_SIZE = 22; // css px
  const LINE_HEIGHT = 34; // css px
  const FONT_FAMILY = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
  let ctx: CanvasRenderingContext2D | null;

  // Typing state
  let target = '';
  let typed = '';
  let started = false;
  let paused = false;
  let completed = false;
  let correctCount = 0; // total correct keypresses
  let errorCount = 0; // total incorrect keypresses
  let totalKeypress = 0;
  let startTimeMs = 0;
  let pausedAccumMs = 0; // total paused duration
  let pauseStartMs = 0;

  // Layout + view state
  let charLayout: { x: number; y: number; w: number; c: string }[] = [];
  let caretBlinkOn = true;
  let caretBlinkTimer = 0;
  let rafId = 0;
  let errorFlashUntil = 0; // timestamp (ms) until which we flash error highlight
  let scrollY = 0; // virtual vertical scroll inside the canvas

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  function initCanvas() {
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(cssWidth * DPR));
    canvas.height = Math.max(1, Math.floor(cssHeight * DPR));
    ctx = canvas.getContext('2d');
    ctx?.setTransform(DPR, 0, 0, DPR, 0, 0); // scale for crispness
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    }
    layoutText();
    render();
  }

  function getWordBank() {
    switch (diffSel.value) {
      case 'hard':
        return WORDS_HARD;
      case 'medium':
        return WORDS_MEDIUM;
      default:
        return WORDS_EASY;
    }
  }

  function generateText() {
    const custom = (customTextEl.value || '').trim();
    if (custom) {
      return custom.replace(/\s+/g, ' ').slice(0, 2000);
    }
    if (modeSel.value === 'quote') {
      return QUOTES[Math.floor(Math.random() * QUOTES.length)];
    }
    const n = Math.max(5, Math.min(200, parseInt(wordCountInput.value || '30', 10)));
    const bank = getWordBank();
    const words: string[] = [];
    for (let i = 0; i < n; i++) words.push(bank[Math.floor(Math.random() * bank.length)]);
    return words.join(' ');
  }

  function resetTest(newTarget?: string) {
    target = newTarget != null ? newTarget : generateText();
    typed = '';
    started = false;
    paused = false;
    completed = false;
    correctCount = 0;
    errorCount = 0;
    totalKeypress = 0;
    startTimeMs = 0;
    pausedAccumMs = 0;
    pauseStartMs = 0;
    caretBlinkOn = true;
    caretBlinkTimer = 0;
    scrollY = 0;
    layoutText();
    render();
    updateStats();
  }

  function layoutText() {
    if (!ctx) return;
    ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    const maxWidth = canvas.clientWidth - PADDING * 2;
    let curX = PADDING;
    let curY = PADDING;
    charLayout = [];
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      const w = Math.ceil(ctx.measureText(ch).width);
      if (ch === '\n' || (curX + w > PADDING + maxWidth && ch !== ' ')) {
        curX = PADDING;
        curY += LINE_HEIGHT;
      }
      charLayout.push({ x: curX, y: curY, w, c: ch });
      curX += w;
    }
  }

  function elapsedMs() {
    if (!started) return 0;
    const active = paused ? pauseStartMs - startTimeMs : Date.now() - startTimeMs;
    return active + pausedAccumMs;
  }

  function wpmNow() {
    const mins = Math.max(1 / 600, elapsedMs() / 60000);
    return (correctCount / 5) / mins;
  }

  function accuracyNow() {
    if (totalKeypress === 0) return 100;
    return Math.max(0, Math.min(100, (correctCount / totalKeypress) * 100));
  }

  function updateStats() {
    wpmEl.textContent = Math.round(wpmNow()).toString();
    accEl.textContent = `${Math.round(accuracyNow())}%`;
    timeEl.textContent = formatTime(elapsedMs());

    const prog = Math.min(100, Math.round((typed.length / Math.max(1, target.length)) * 100));
    statusEl.textContent = `${prog}% • Errors: ${errorCount}` + (completed ? ' • Completed! 🎉' : paused ? ' • Paused' : '');
  }

  function flashError() {
    errorFlashUntil = Date.now() + 200;
    if (navigator.vibrate) {
      try { navigator.vibrate(10); } catch {}
    }
  }

  function pressBackspace() {
    if (!started || paused || completed) return;
    if (typed.length > 0) typed = typed.slice(0, -1);
    updateStats();
    render();
  }

  function pressChar(ch: string) {
    if (!started || paused || completed) return;
    const expected = target[typed.length] || '';
    totalKeypress++;
    if (ch === expected) {
      correctCount++;
      typed += ch;
    } else {
      errorCount++;
      flashError();
    }
    if (typed.length >= target.length) {
      completed = true;
      cancelAnimationFrame(rafId);
    }
    caretBlinkTimer = 0;
    caretBlinkOn = true;
    updateStats();
    render();
  }

  function handleKey(e: KeyboardEvent) {
    if (!started || paused || completed) return;
    if (e.ctrlKey || e.metaKey) return;
    const key = e.key;
    if (key === 'Backspace') {
      pressBackspace();
      e.preventDefault();
      return;
    }
    if (key === 'Enter') {
      pressChar('\n');
      e.preventDefault();
      return;
    }
    if (key.length === 1) {
      pressChar(key);
      e.preventDefault();
      return;
    }
  }

  function bindMobileInput() {
    let lastValue = '';
    mobileInput.value = '';
    lastValue = '';

    mobileInput.addEventListener('input', (ev) => {
      if (!started) start();
      const e = ev as InputEvent;
      const val = mobileInput.value;

      if (e.inputType && e.inputType.startsWith('delete')) {
        const delCount = Math.max(1, lastValue.length - val.length);
        for (let i = 0; i < delCount; i++) pressBackspace();
      }

      if (val.length > lastValue.length) {
        const inserted = val.slice(lastValue.length);
        for (const ch of inserted) {
          if (ch === '\r') continue;
          pressChar(ch === '\n' ? '\n' : ch);
        }
      }

      mobileInput.value = '';
      lastValue = '';
    });
  }

  function ensureMobileKeyboard() {
    mobileInput.classList.add(styles.captureInputVisible);
    mobileInput.focus({ preventScroll: true });
    try { mobileInput.setSelectionRange(mobileInput.value.length, mobileInput.value.length); } catch {}
  }

  function start() {
    if (completed) return;
    if (!started) {
      started = true;
      startTimeMs = Date.now();
    }
    if (paused) {
      paused = false;
      pausedAccumMs += Date.now() - pauseStartMs;
    }
    if (isMobile) {
      ensureMobileKeyboard();
    } else {
      canvas.focus();
    }
    loop();
  }

  function pause() {
    if (!started || paused || completed) return;
    paused = true;
    pauseStartMs = Date.now();
    cancelAnimationFrame(rafId);
    render();
    updateStats();
  }

  function toggleTheme() {
    const dark = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() === '#0f172a';
    if (dark) {
      document.documentElement.style.setProperty('--bg', '#f3f4f6');
      document.documentElement.style.setProperty('--panel', '#ffffff');
      document.documentElement.style.setProperty('--text', '#111827');
      document.documentElement.style.setProperty('--muted', '#6b7280');
      document.documentElement.style.setProperty('--accent', '#2563eb');
      document.documentElement.style.setProperty('--ok', '#16a34a');
      document.documentElement.style.setProperty('--bad', '#dc2626');
      document.documentElement.style.setProperty('--warn', '#d97706');
    } else {
      document.documentElement.style.setProperty('--bg', '#0f172a');
      document.documentElement.style.setProperty('--panel', '#111827');
      document.documentElement.style.setProperty('--text', '#e5e7eb');
      document.documentElement.style.setProperty('--muted', '#9ca3af');
      document.documentElement.style.setProperty('--accent', '#60a5fa');
      document.documentElement.style.setProperty('--ok', '#22c55e');
      document.documentElement.style.setProperty('--bad', '#ef4444');
      document.documentElement.style.setProperty('--warn', '#f59e0b');
    }
    render();
  }

  function applyAutoScroll() {
    if (!ctx) return;
    const h = canvas.clientHeight;
    const idx = Math.min(typed.length, charLayout.length - 1);
    const caretPos = charLayout[idx] || { x: PADDING, y: PADDING, w: 12 };
    const topThreshold = PADDING + LINE_HEIGHT * 1.5;
    const bottomThreshold = h - PADDING - LINE_HEIGHT * 1.5;
    const caretScreenY = caretPos.y - scrollY;
    if (caretScreenY > bottomThreshold) {
      scrollY = Math.max(0, caretPos.y - (h - PADDING - LINE_HEIGHT * 1.5));
    } else if (caretScreenY < topThreshold) {
      scrollY = Math.max(0, caretPos.y - (PADDING + LINE_HEIGHT * 1.5));
    }
  }

  function drawRoundedRect(x: number, y: number, w: number, h: number, r: number) {
    const rr = Math.min(r, h / 2, w / 2);
    ctx!.beginPath();
    ctx!.moveTo(x + rr, y);
    ctx!.arcTo(x + w, y, x + w, y + h, rr);
    ctx!.arcTo(x + w, y + h, x, y + h, rr);
    ctx!.arcTo(x, y + h, x, y, rr);
    ctx!.arcTo(x, y, x + w, y, rr);
    ctx!.closePath();
  }

  function render() {
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const w = canvas.clientWidth;

    applyAutoScroll();

    ctx.save();
    ctx.translate(0, -scrollY);
    ctx.globalAlpha = 0.05;
    const lastIndex = charLayout.length > 0 ? charLayout.length - 1 : -1;
    const lastY = lastIndex >= 0 ? charLayout[lastIndex].y : PADDING;
    const contentHeight = lastY + LINE_HEIGHT + PADDING;
    for (let y = PADDING; y < contentHeight - PADDING; y += LINE_HEIGHT) {
      ctx.beginPath();
      ctx.moveTo(PADDING, y + LINE_HEIGHT);
      ctx.lineTo(w - PADDING, y + LINE_HEIGHT);
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.font = `600 16px ${FONT_FAMILY}`;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#9ca3af';
    ctx.fillText('Text', PADDING, 8 + scrollY);

    ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    const ok = getComputedStyle(document.documentElement).getPropertyValue('--ok').trim() || '#22c55e';
    const bad = getComputedStyle(document.documentElement).getPropertyValue('--bad').trim() || '#ef4444';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#60a5fa';
    const up = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#9ca3af';

    const idx = Math.min(typed.length, charLayout.length - 1);
    const caretPos = charLayout[idx] || ({ x: PADDING, y: PADDING, w: 12 } as { x: number; y: number; w: number });

    if (!completed) {
      const now = Date.now();
      const isErrorFlash = now < errorFlashUntil;
      ctx.globalAlpha = isErrorFlash ? 0.35 : 0.2;
      drawRoundedRect(caretPos.x - 1, caretPos.y - 2, Math.max(12, caretPos.w + 2), LINE_HEIGHT, 6);
      ctx.fillStyle = isErrorFlash ? bad : accent;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (let i = 0; i < charLayout.length; i++) {
      const { x, y, c } = charLayout[i];
      const typedCh = typed[i];
      if (i < typed.length) {
        ctx.fillStyle = typedCh === c ? ok : bad;
      } else {
        ctx.fillStyle = up;
      }
      ctx.fillText(c, x, y);
    }

    if (!completed && caretBlinkOn) {
      ctx.beginPath();
      ctx.moveTo(caretPos.x - 2, caretPos.y);
      ctx.lineTo(caretPos.x - 2, caretPos.y + LINE_HEIGHT - 4);
      ctx.lineWidth = 2;
      ctx.strokeStyle = accent;
      ctx.stroke();
    }
    ctx.restore();

    ctx.restore();
  }

  function loop() {
    rafId = requestAnimationFrame(loop);
    if (paused || completed || !started) return;
    caretBlinkTimer += 16;
    if (caretBlinkTimer > 600) {
      caretBlinkOn = !caretBlinkOn;
      caretBlinkTimer = 0;
    }
    updateStats();
    render();
  }

  btnStart.addEventListener('click', start);
  btnPause.addEventListener('click', () => (paused ? start() : pause()));
  btnReset.addEventListener('click', () => resetTest());
  btnNext.addEventListener('click', () => resetTest(generateText()));
  btnTheme.addEventListener('click', toggleTheme);

  function updateModeUI() {
    const showWords = modeSel.value === 'words' && !customTextEl.value.trim();
    wordsCountGroup.style.display = showWords ? 'block' : 'none';
    diffSel.disabled = modeSel.value !== 'words';
  }
  modeSel.addEventListener('change', () => { updateModeUI(); resetTest(); });
  diffSel.addEventListener('change', () => resetTest());
  wordCountInput.addEventListener('change', () => resetTest());
  customTextEl.addEventListener('input', () => { updateModeUI(); resetTest(); });

  window.addEventListener('keydown', handleKey);
  window.addEventListener('resize', () => { initCanvas(); render(); });
  canvas.addEventListener('pointerdown', () => { start(); });

  window.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || e.repeat) return;
    if (e.defaultPrevented) return;
    if (!(document.activeElement === canvas || document.activeElement === document.body)) return;
    if (!started || paused) {
      start();
      e.preventDefault();
    }
  });

  bindMobileInput();
  updateModeUI();
  initCanvas();
  resetTest(initialText && initialText.trim().slice(0, 2000));
}

