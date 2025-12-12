import type { Metadata } from 'next';
import PrefetchLink from '../../../components/PrefetchLink';
import QrMaker from '../../../components/QrMaker';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'QR Code Generator & Scanner | Free, No Sign Up',
  description:
    'Create or scan QR codes instantly in your browser. Export PNG or SVG, no account or upload required.',
  keywords: [
    'qr code generator',
    'free qr code',
    'qr code png',
    'qr code svg',
    'qr code scanner online',
    'wifi qr code',
    'payment qr code',
  ],
  openGraph: {
    title: 'Free QR Code Generator & Scanner (PNG/SVG)',
    description: 'Generate and scan QR codes in the browser. Export PNG or SVG without sign-up.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'QR Code Generator & Scanner | Free',
    description: 'Make or read QR codes instantly. Export PNG/SVG. 100% browser-based.',
  },
};
 
export default function QrCodeScannerPage() {
  return (
    <main className={styles.main}>

      <QrMaker />
      <p className={styles.back}>
        <PrefetchLink href="/tools">Back to Tools</PrefetchLink>
      </p>
    </main>
  );
}
