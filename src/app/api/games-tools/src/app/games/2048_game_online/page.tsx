"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./2048Game.module.css";

type Board = number[][];
type Direction = "left" | "right" | "up" | "down";

const SIZE = 4;
const TARGET_MERGES = 2048;
const LOCAL_BEST_KEY = "merge2048_best";

/* --------------------------- Board utilities --------------------------- */
function createEmptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}
function cloneBoard(b: Board): Board {
  return b.map((row) => row.slice());
}
function getEmptyCells(b: Board): Array<[number, number]> {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (b[r][c] === 0) cells.push([r, c]);
    }
  }
  return cells;
}
function addRandomTile(b: Board): Board {
  const empty = getEmptyCells(b);
  if (!empty.length) return b;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  b[r][c] = Math.random() < 0.9 ? 2 : 4;
  return b;
}
function transpose(b: Board): Board {
  const t = createEmptyBoard();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      t[c][r] = b[r][c];
    }
  }
  return t;
}
function reverseRows(b: Board): Board {
  return b.map((row) => row.slice().reverse());
}

// Avoid Array.prototype.flat() to keep bundles free of legacy polyfills
function flatten(b: Board): number[] {
  const out: number[] = [];
  for (let r = 0; r < b.length; r++) {
    const row = b[r];
    for (let c = 0; c < row.length; c++) out.push(row[c]);
  }
  return out;
}

function compressRow(row: number[]) {
  const filtered = row.filter((n) => n !== 0);
  const result = Array(SIZE).fill(0);
  let scoreGained = 0;
  let merges = 0;
  let i = 0;
  let write = 0;

  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      result[write++] = merged;
      scoreGained += merged;
      merges += 1;
      i += 2;
    } else {
      result[write++] = filtered[i++];
    }
  }
  return { row: result, scoreGained, merges };
}

function moveLeft(board: Board) {
  let moved = false;
  let scoreGained = 0;
  let merges = 0;
  const newBoard = board.map((row) => {
    const { row: newRow, scoreGained: s, merges: m } = compressRow(row);
    if (!moved && newRow.some((v, i) => v !== row[i])) moved = true;
    scoreGained += s;
    merges += m;
    return newRow;
  });
  return { newBoard, moved, scoreGained, merges };
}
function moveRight(board: Board) {
  const reversed = reverseRows(board);
  const left = moveLeft(reversed);
  return {
    newBoard: reverseRows(left.newBoard),
    moved: left.moved,
    scoreGained: left.scoreGained,
    merges: left.merges,
  };
}
function moveUp(board: Board) {
  const t = transpose(board);
  const left = moveLeft(t);
  return {
    newBoard: transpose(left.newBoard),
    moved: left.moved,
    scoreGained: left.scoreGained,
    merges: left.merges,
  };
}
function moveDown(board: Board) {
  const t = transpose(board);
  const right = moveRight(t);
  return {
    newBoard: transpose(right.newBoard),
    moved: right.moved,
    scoreGained: right.scoreGained,
    merges: right.merges,
  };
}
function hasMoves(b: Board) {
  if (getEmptyCells(b).length) return true;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = b[r][c];
      if ((r + 1 < SIZE && b[r + 1][c] === v) || (c + 1 < SIZE && b[r][c + 1] === v))
        return true;
    }
  }
  return false;
}
function boardsEqual(a: Board, b: Board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

/* ------------------------------ Component ------------------------------ */
export default function Game() {
  // IMPORTANT: deterministic initial render (no random, no localStorage)
  const [locked, setLocked] = useState(false);
  const [board, setBoard] = useState<Board>(() => createEmptyBoard());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(0);
  const [merges, setMerges] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [goalReached, setGoalReached] = useState(false);

  const historyRef = useRef<
    { board: Board; score: number; merges: number; moves: number }[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lockSizeRef = useRef(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Load best + seed board ONLY on client (post-hydration)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_BEST_KEY);
      if (raw) setBest(parseInt(raw, 10) || 0);
    } catch {
      // ignore
    }

    setBoard((prev) => {
      // If HMR/navigation kept a board, keep it
      const prevFlat = flatten(prev);
      if (prevFlat.some((v) => v !== 0)) return prev;
      const b = createEmptyBoard();
      addRandomTile(b);
      addRandomTile(b);
      return b;
    });

    // Focus for keyboard play
    requestAnimationFrame(() => wrapperRef.current?.focus());
  }, []);

  // Decide whether to use the 'locked' fixed layout (mobile) or normal flow (desktop)
  useEffect(() => {
    const update = () => {
      setLocked(window.innerWidth <= 900);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pushHistory = useCallback(() => {
    historyRef.current.push({
      board: cloneBoard(board),
      score,
      merges,
      moves,
    });
    if (historyRef.current.length > 50) historyRef.current.shift();
  }, [board, score, merges, moves]);

  const startNew = useCallback(() => {
    const b = createEmptyBoard();
    addRandomTile(b);
    addRandomTile(b);
    setBoard(b);
    setScore(0);
    setMerges(0);
    setMoves(0);
    setGameOver(false);
    setGoalReached(false);
    historyRef.current = [];
    requestAnimationFrame(() => wrapperRef.current?.focus());
  }, []);

  const undo = useCallback(() => {
    const last = historyRef.current.pop();
    if (!last) return;
    setBoard(last.board);
    setScore(last.score);
    setMerges(last.merges);
    setMoves(last.moves);
  }, []);

  const applyMove = useCallback(
    (dir: Direction) => {
      if (gameOver || goalReached) return;

      const before = cloneBoard(board);
      const exec =
        dir === "left" ? moveLeft : dir === "right" ? moveRight : dir === "up" ? moveUp : moveDown;

      const res = exec(before);
      if (!res.moved || boardsEqual(before, res.newBoard)) return;

      pushHistory();

      addRandomTile(res.newBoard);
      setBoard(res.newBoard);
      setScore((s) => s + res.scoreGained);
      setMerges((m) => m + res.merges);
      setMoves((mv) => mv + 1);
    },
    [board, gameOver, goalReached, pushHistory]
  );

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key;
      if (key.startsWith("Arrow")) {
        e.preventDefault();
        applyMove(
          key === "ArrowLeft"
            ? "left"
            : key === "ArrowRight"
            ? "right"
            : key === "ArrowUp"
            ? "up"
            : "down"
        );
      }
      if ((key === "u" || key === "U") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [applyMove, undo]);

  // Touch (swipe)
  const onTouchStart = (e: React.TouchEvent) => {
    // Lock board sizing once player starts interacting to avoid mobile jitter
    lockSizeRef.current = true;
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const threshold = 24; // px
    if (Math.max(absX, absY) >= threshold) {
      applyMove(absX > absY ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
    }
    touchStart.current = null;
  };

  // Persist best on client when score beats it
  useEffect(() => {
    if (score > best) {
      setBest(score);
      try {
        localStorage.setItem(LOCAL_BEST_KEY, String(score));
      } catch {
        // ignore
      }
    }
  }, [score, best]);

  // Measure and fit the board to available viewport space between site header and footer
  useEffect(() => {
    const calc = () => {
      const wrap = wrapperRef.current;
      const boardEl = boardRef.current;
      if (!wrap || !boardEl) return;

      // Heights of fixed header and site footer
      const siteFooter = document.querySelector('body > footer') as HTMLElement | null;
      const footerH = siteFooter ? siteFooter.getBoundingClientRect().height : 0;
      const rootStyle = getComputedStyle(document.documentElement);
      const headerRaw =
        rootStyle.getPropertyValue('--header-offset') ||
        rootStyle.getPropertyValue('--header-height') ||
        '0';
      const headerH = parseFloat(String(headerRaw));
      const breakingBar = document.querySelector("[data-component='breaking-bar']") as HTMLElement | null;
      const barH = breakingBar ? breakingBar.getBoundingClientRect().height : 0;
      const headerTotal = headerH + barH;

      // Viewport height (accounts for mobile dynamic viewport when available)
      const viewportH = window.visualViewport?.height ?? window.innerHeight;

      // Wrapper computed spacing
      const cs = getComputedStyle(wrap);
      // wrapper margins are ignored in locked layout
      const padX = parseFloat(cs.paddingLeft || '0') + parseFloat(cs.paddingRight || '0');

      // Main element bottom margin (space above footer)
      // main margins are ignored in locked layout

      // Local overhead inside wrapper (elements above/below the board)
      const wrapRect = wrap.getBoundingClientRect();
      const boardRect = boardEl.getBoundingClientRect();
      const aboveBoard = Math.max(0, boardRect.top - wrapRect.top);
      const belowBoard = Math.max(0, wrapRect.height - aboveBoard - boardRect.height);
      const nonBoard = aboveBoard + belowBoard;

      // Height budget available for a square board, independent of scroll offset
      const allowance = viewportH - headerTotal - footerH;
      const maxByHeight = Math.max(0, Math.floor(allowance - nonBoard));

      // Max by wrapper inner width (respect wrapper paddings)
      const innerW = Math.max(0, wrap.clientWidth - padX);

      // Cap board size on desktop to avoid overly large square on huge monitors
      const DESKTOP_CAP = 420; // px
      const cap = locked ? Number.MAX_SAFE_INTEGER : DESKTOP_CAP;
      const size = Math.max(0, Math.min(maxByHeight, innerW, cap));

      // Apply as CSS var that .board uses for width/height
      const prev = wrap.style.getPropertyValue('--board-size');
      const next = `${size}px`;
      if (prev !== next) wrap.style.setProperty('--board-size', next);
    };

    // Run after paint to ensure accurate rects
    const raf = () => requestAnimationFrame(calc);
    raf();

    // Recompute on resize/orientation but avoid mobile jitter during play by honoring lock
    const onResize = () => { if (!lockSizeRef.current) raf(); };
    const onOrientation = () => { lockSizeRef.current = false; raf(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrientation);
    // Visual viewport changes (mobile address bar) — also respect lock
    const vv = window.visualViewport;
    const onVvResize = () => { if (!lockSizeRef.current) raf(); };
    vv?.addEventListener('resize', onVvResize);

    // Observe wrapper/footer size changes
    const ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(() => { if (!lockSizeRef.current) raf(); }) : null;
    const siteFooter = document.querySelector('body > footer') as HTMLElement | null;
    const siteHeader = document.querySelector('body > header') as HTMLElement | null;
    const mainEl = wrapperRef.current?.closest('main') as HTMLElement | null;
    if (ro && wrapperRef.current) ro.observe(wrapperRef.current);
    if (ro && siteFooter) ro.observe(siteFooter);
    if (ro && siteHeader) ro.observe(siteHeader);
    if (ro && mainEl) ro.observe(mainEl);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
      vv?.removeEventListener('resize', onVvResize);
      ro?.disconnect();
    };
  }, [locked]);

  // Lock the game view between header and footer and disable page scroll (only when locked)
  useEffect(() => {
    if (!locked) return;
    const updateLockHeight = () => {
      const wrap = wrapperRef.current;
      if (!wrap) return;
      const footer = document.querySelector('body > footer') as HTMLElement | null;
      const footerH = footer ? footer.getBoundingClientRect().height : 0;
      const viewportH = window.visualViewport?.height ?? window.innerHeight;
      const rootStyle = getComputedStyle(document.documentElement);
      const headerRaw =
        rootStyle.getPropertyValue('--header-offset') ||
        rootStyle.getPropertyValue('--header-height') ||
        '0';
      const headerH = parseFloat(String(headerRaw));
      const breakingBar = document.querySelector("[data-component='breaking-bar']") as HTMLElement | null;
      const barH = breakingBar ? breakingBar.getBoundingClientRect().height : 0;
      const headerTotal = headerH + barH;
      const h = Math.max(0, Math.floor(viewportH - headerTotal - footerH));
      wrap.style.setProperty('--lock-height', `${h}px`);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    updateLockHeight();

    const onResize = () => updateLockHeight();
    window.addEventListener('resize', onResize);
    const vv = window.visualViewport;
    vv?.addEventListener('resize', onResize);
    const ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(updateLockHeight) : null;
    const footer = document.querySelector('body > footer') as HTMLElement | null;
    const header = document.querySelector('body > header') as HTMLElement | null;
    if (ro && footer) ro.observe(footer);
    if (ro && header) ro.observe(header);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('resize', onResize);
      vv?.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
  }, [locked]);

  // End conditions
  useEffect(() => {
    if (merges >= TARGET_MERGES && !goalReached) setGoalReached(true);
    else if (!hasMoves(board) && !gameOver) setGameOver(true);
  }, [board, merges, goalReached, gameOver]);

  // Dynamic lighting / 3D tilt (pointer)
  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tx = (x - 0.5) * 10; // deg
    const ty = (0.5 - y) * 10; // deg
    el.style.setProperty("--tiltX", `${tx}deg`);
    el.style.setProperty("--tiltY", `${ty}deg`);
    el.style.setProperty("--lx", `${x * 100}%`);
    el.style.setProperty("--ly", `${y * 100}%`);
  }, []);
  const handlePointerLeave = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty("--tiltX", `0deg`);
    el.style.setProperty("--tiltY", `0deg`);
    el.style.setProperty("--lx", `50%`);
    el.style.setProperty("--ly", `35%`);
  }, []);

  const maxTile = useMemo(() => Math.max(...flatten(board)), [board]);

  return (
    <div
      className={`${styles.wrapper} ${locked ? styles.locked : ''}`}
      tabIndex={0}
      ref={wrapperRef}
      role="application"
      aria-label="2048 merge game board"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>2048 Merge</h1>
        </div>
        <div className={styles.stats}>
          <div className={styles.card} aria-live="polite">
            <div className={styles.label}>Score</div>
            <div className={styles.value}>{score}</div>
          </div>
          <div className={styles.card} aria-live="polite">
            <div className={styles.label}>Best</div>
            <div className={styles.value}>{best}</div>
          </div>
          <div className={styles.card} aria-live="polite">
            <div className={styles.label}>Merges</div>
            <div className={styles.value}>
              {merges}/{TARGET_MERGES}
            </div>
          </div>
        </div>
      </header>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={startNew} aria-label="New game">
          New Game
        </button>
        <button className={styles.btn} onClick={undo} aria-label="Undo last move">
          Undo
        </button>
 
      </div>

      <div className={styles.progress} aria-label="Merge progress">
        <div
          className={styles.progressBar}
          style={{ width: `${Math.min(100, (merges / TARGET_MERGES) * 100)}%` }}
        />
      </div>

      <div className={styles.board} aria-describedby="board-help" ref={boardRef}>
        {board.map((row, r) => (
          <div key={r} className={styles.row}>
            {row.map((val, c) => (
              <Tile key={`${r}-${c}`} value={val} />
            ))}
          </div>
        ))}
      </div>
      <p id="board-help" className={styles.srOnly}>
        Use arrow keys or swipe to move tiles. Equal tiles merge into higher values.
      </p>

      {(gameOver || goalReached) && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.overlayCard}>
            <h2 className={styles.overlayTitle}>
              {goalReached ? "Goal reached 🎉" : "No more moves 😵"}
            </h2>
            <p className={styles.overlayText}>
              {goalReached
                ? `You completed ${TARGET_MERGES} merges!`
                : "You ran out of moves. Try again?"}
            </p>
            <div className={styles.overlayStats}>
              <span>Max tile: {maxTile}</span>
              <span>Score: {score}</span>
              <span>Merges: {merges}</span>
              <span>Moves: {moves}</span>
            </div>
            <button className={styles.btnPrimary} onClick={startNew}>
              Play Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function Tile({ value }: { value: number }) {
  const className =
    value === 0
      ? `${styles.cell} ${styles.empty}`
      : `${styles.cell} ${styles.glass} ${
          styles[(("v" + value) as keyof typeof styles)] ?? styles.vSuper
        }`;

  return (
    <div className={className} aria-label={value === 0 ? "empty" : `tile ${value}`}>
      {value !== 0 ? <span className={styles.num}>{value}</span> : ""}
    </div>
  );
}
