import { Metadata } from 'next';
import PrefetchLink from '../../components/PrefetchLink';
import styles from './Games.module.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Free Online Games | The Nineties Times Arcade',
  description: 'Play trending browser games including 2048, Tetris, and MetroTrader while you catch up on the latest headlines from The Nineties Times.',
  keywords: [
    'free online games',
    'play 2048 online',
    'tetris browser game',
    'casual newsroom games',
    'metro trader simulator',
    'news break games',
    '90sTimes arcade'
  ],
  alternates: { canonical: '/games' },
  openGraph: {
    title: 'Play Free Online Games at The Nineties Times',
    description: 'Relax with 2048, Tetris, MetroTrader, and more casual games curated by The Nineties Times newsroom.',
    url: '/games',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Online Games | The Nineties Times',
    description: 'Try trending browser games like 2048, Tetris, and MetroTrader while staying connected to the news.',
  },
};

export default function GamesPage() {
  return (
    <main className={styles.main}>
      <h1>Games</h1>
      <ul className={styles.list}>
        <li className={styles.item}>
          <PrefetchLink
            href="/games/2048_game_online"
            title="Play the classic 2048 puzzle game"
            className={styles.blockLink}
          >
            <span>2048</span>
            <div className={styles.preview}>
              <Image
                src="/images/2048.png"
                alt="2048 game preview"
                width={602}
                height={470}
                quality={100}
                sizes="(max-width: 768px) 4rem, (max-width: 1200px) 5rem, 6rem"
                className={styles.logoImage}
                priority
              />
            </div>
          </PrefetchLink>
        </li>
        <li className={styles.item}>
          <PrefetchLink href="/games/tetris" title="Play Tetris" className={styles.blockLink}>
            <span>Tetris</span>
            <div className={styles.preview}>
              <Image
                src="/images/tetris.png"
                alt="tetris game preview"
                width={602}
                height={470}
                quality={100}
                sizes="(max-width: 768px) 4rem, (max-width: 1200px) 5rem, 6rem"
                className={styles.logoImage}
                priority
              />
            </div>
          </PrefetchLink>
        </li>
        <li className={styles.item}>
          <PrefetchLink
            href="/games/metrotrade"
            title="Play Metropolotan Trader"
            className={styles.blockLink}
          >
            <span>Metropolotan Trader</span>
            <div className={styles.preview}>
              <Image
                src="/images/metrotrade.png"
                alt="Metrotrade preview"
                width={602}
                height={470}
                quality={100}
                sizes="(max-width: 768px) 4rem, (max-width: 1200px) 5rem, 6rem"
                className={styles.logoImage}
                priority
              />
            </div>
          </PrefetchLink>
        </li>
      </ul>
    </main>
  );
}
