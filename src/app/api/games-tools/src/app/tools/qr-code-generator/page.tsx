import type { Metadata } from 'next';
import PrefetchLink from '../../../components/PrefetchLink';
import QrMaker from '../../../components/QrMaker';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'QR Code Scanner Online - Free Tool, No Sign Up',
  description: 'QR code scanner online no sign up or login required.Downloadable in png or svg format. Free to use.',
  keywords: 'QR code generator, free QR code, custom QR code, QR code PNG, QR code SVG, QR code for Wi-Fi, QR code for payment,QR code no sign up needed, QR code for business',
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
