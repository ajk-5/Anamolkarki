'use client';

import { useEffect } from 'react';
import styles from '../TypingPractice.module.css';
import { initializeTypingPractice } from '../services/typingPracticeService';

interface Props {
  initialText: string;
}

export default function TypingPracticeClient({ initialText }: Props) {
  useEffect(() => {
    initializeTypingPractice(initialText, styles);
  }, [initialText]);

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Typing Practice</h1>
      <p className={styles.description}>
        Practice typing online using the latest Technology article.
      </p>
      <div className={styles.container}>
        <div className={`${styles.panel} ${styles.controls}`}>
          <h2> Typing Practice </h2>

          <div className={styles.group}>
            <label htmlFor="mode">Mode</label>
            <div className={styles.row}>
              <select id="mode" defaultValue="words">
                <option value="words">Words</option>
                <option value="quote">Quote</option>
              </select>
              <select id="difficulty" title="Word list difficulty" defaultValue="easy">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className={styles.group} id="wordsCountGroup">
            <label htmlFor="wordCount">Number of words</label>
            <input type="number" id="wordCount" min="5" max="200" defaultValue="30" />
          </div>
          <div className={styles.group}>
            <label htmlFor="customText">Custom text (optional)</label>
            <textarea
              id="customText"
              placeholder="Paste or type your own text here. If filled, it overrides Mode/Words."
            ></textarea>
          </div>
          <div className={`${styles.group} ${styles.row}`}>
            <button id="btnStart" className={`${styles.button} ${styles.buttonPrimary}`}>
              Start
            </button>
            <button id="btnPause" className={styles.button}>
              Pause
            </button>
            <button id="btnReset" className={`${styles.button} ${styles.buttonDanger}`}>
              Reset
            </button>
          </div>
          <div className={`${styles.group} ${styles.row}`}>
            <button id="btnNext" className={styles.button}>
              Next Text
            </button>
            <button id="btnTheme" className={styles.button}>
              Toggle Theme
            </button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.value} id="wpm">0</div>
              <div className={styles.label}>WPM</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.value} id="accuracy">100%</div>
              <div className={styles.label}>Accuracy</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.value} id="time">00:00</div>
              <div className={styles.label}>Time</div>
            </div>
          </div>
        </div>

        <div className={`${styles.panel} ${styles.canvasWrap}`}>
          <canvas
            id="typingCanvas"
            className={styles.canvas}
            aria-label="Typing practice canvas"
            tabIndex={0}
          />

          {/* Tiny in-viewport input to summon the mobile keyboard */}
          <input
            id="mobileInput"
            type="text"
            inputMode="text"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-hidden="true"
            className={styles.captureInput}
          />

          <div id="status" className={styles.status}>0% • Errors: 0</div>
          <div className={styles.footer}>
            Tip: Click the canvas (or press <span className={styles.kbd}>Start</span>) and just type. Use{' '}
            <span className={styles.kbd}>Backspace</span> to correct.
          </div>
        </div>
      </div>
    </main>
  );
}

