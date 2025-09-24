import { Metadata } from 'next';
import PrefetchLink from '../../components/PrefetchLink';
import styles from './Tools.module.css';

export const metadata: Metadata = {
  title: 'Newsroom Tools | QR Scanner, World Clock & Typing Practice',
  description:
    'Use The Nineties Times toolbox for a lightning-fast QR code scanner, global world clock, and typing speed practice while you follow breaking news.',
  keywords: [
    'free qr code scanner',
    'world clock online',
    'typing speed test',
    'newsroom productivity tools',
    'browser utilities 2025',
    '90sTimes tools',
    'real-time world time zones'
  ],
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Newsroom Tools by The Nineties Times',
    description: 'Scan QR codes, check world time zones, and sharpen your typing speed with free utilities from The Nineties Times.',
    url: '/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free QR Scanner & World Clock | The Nineties Times Tools',
    description: 'Access a quick QR reader, interactive world clock, and typing practice in one newsroom toolkit.',
  },
};

export default function ToolsPage() {
  return (
    <main className={styles.main}>
      <h1>Tools</h1>
      <ul className={styles.list}>
        <li className={styles.item}>
          <PrefetchLink
            href="/tools/world-clock"
            title="World Clock — current times around the globe"
            className={styles.blockLink}
          >
            World Clock
          </PrefetchLink>
        </li>
        {/* Mememaker entry removed */}
        <li className={styles.item}>
          <PrefetchLink
            href="/tools/qr-code-generator"
            title="QR Code Generator — free online tool, no sign up or login required"
            className={styles.blockLink}
          >
            QR Code Scanner
          </PrefetchLink>
        </li>
        <li className={styles.item}>
          <PrefetchLink
            href="/tools/typing-practice"
            title="Typing Practice — test and improve your speed"
            className={styles.blockLink}
          >
            Typing Practice
          </PrefetchLink>
        </li>
      </ul>
    </main>
  );
}

