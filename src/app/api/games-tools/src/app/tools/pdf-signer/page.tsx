import type { Metadata } from 'next';
import PdfSignerApp from './PdfSignerApp';

export const metadata: Metadata = {
  title: 'Sign & Write on PDF - Online PDF Signer',
  description:
    'Upload any PDF, click to place text or a typed signature, and download a signed PDF where added text stays fully selectable. No account required.',
  keywords: [
    'pdf signer',
    'sign pdf online',
    'fill pdf form',
    'add text to pdf',
    'online pdf editor',
    'free pdf signer',
  ],
  openGraph: {
    title: 'Sign & Write on PDF - Online PDF Signer',
    description:
      'Add text or signatures to PDF files directly in your browser and download a selectable, updated PDF. No uploads required.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Online PDF Signer & Writer',
    description: 'Sign and annotate PDFs in-browser; download a selectable PDF. Free and private.',
  },
};

export default function PdfSignerPage() {
  return <PdfSignerApp />;
}
