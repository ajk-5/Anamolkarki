import { Metadata } from 'next';
import PrefetchLink from '../../components/PrefetchLink';
import styles from './Tools.module.css';

export const metadata: Metadata = {
  title: 'Free Online Tools | PDF Signer, Image Compressor, QR, World Clock',
  description:
    'Use fast, privacy-friendly browser tools: sign PDFs, compress/convert images (AVIF/WebP/JPEG/PNG), scan/generate QR codes, check world times, and practice typing.',
  keywords: [
    'online tools',
    'pdf signer',
    'image compressor',
    'avif converter',
    'webp converter',
    'qr code generator',
    'world clock',
    'typing practice',
    'free browser utilities',
  ],
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free Online Tools | PDF, Images, QR, World Clock',
    description:
      'Sign PDFs, compress images to AVIF/WebP/JPEG/PNG, scan QR codes, check world times, and practice typing. 100% in-browser.',
    url: '/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Browser Tools | PDF Signer, Image Compressor, QR',
    description:
      'One-stop toolbox: PDF signer, image compressor/converter, QR code generator, world clock, and typing practice.',
  },
};

const icons = {
  pdf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="5" y="3" width="11" height="18" rx="2" />
      <path d="M9 7h4m-4 4h3m-3 4h2" />
      <path d="M16 3v5h5" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M5 17 10 12l2 2 3-3 4 4" />
    </svg>
  ),
  qr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM16 16h2v2h-2z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  type: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </svg>
  ),
};

const tools = [
  {
    href: "/tools/pdf-signer",
    label: "PDF Signer & Writer",
    title:
      "Sign and write onto PDF files, then download a new PDF where added text stays selectable.",
    icon: icons.pdf,
  },
  {
    href: "/tools/image-compressor",
    label: "Image Compressor & Converter",
    title:
      "Compress and convert images locally (AVIF, WebP, JPEG, PNG) with resize controls and PSNR-guided quality.",
    icon: icons.image,
  },
  {
    href: "/tools/facture",
    label: "Invoice PDF generator",
    title:
      "Invoice PDF generator with French-style layout, timestamped numbers, and printable export.",
    icon: icons.pdf,
  },
  {
    href: "/tools/world-clock",
    label: "World Clock",
    title: "World Clock - check current times around the globe.",
    icon: icons.clock,
  },
  {
    href: "/tools/qr-code-generator",
    label: "QR Code Scanner",
    title:
      "QR Code Scanner - free online tool, no sign up or login required.",
    icon: icons.qr,
  },
  {
    href: "/tools/typing-practice",
    label: "Typing Practice",
    title: "Typing Practice - test and improve your speed.",
    icon: icons.type,
  },
];

export default function ToolsPage() {
  return (
    <main className={styles.main}>
      <h1>Tools</h1>
      <ul className={styles.list}>
        {tools.map((tool) => (
          <li className={styles.item} key={tool.href}>
            <PrefetchLink href={tool.href} title={tool.title} className={styles.blockLink}>
              <span className={styles.iconWrap}>{tool.icon}</span>
              <span className={styles.text}>
                <span className={styles.title}>{tool.label}</span>
                <span className={styles.desc}>{tool.title}</span>
              </span>
            </PrefetchLink>
          </li>
        ))}
      </ul>
    </main>
  );
}
