
import "../styles/globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import AuroraBackground from "@/components/AuroraBackground";
import GridPattern from "@/components/GridPattern";
import MobileTabBar from "@/components/MobileTabBar";
import { Space_Grotesk, Fraunces } from "next/font/google";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anamol Jang Karki - Full-stack Developer",
    template: "%s | Anamol Jang Karki",
  },
  description:
    "Full-stack developer portfolio featuring product case studies, tools, games, and UX-focused builds.",
  applicationName: "Anamol Jang Karki Portfolio",
  keywords: [
    "Anamol Jang Karki",
    "full-stack developer",
    "Next.js portfolio",
    "web developer",
    "UX UI",
    "product engineer",
  ],
  authors: [{ name: "Anamol Jang Karki" }],
  creator: "Anamol Jang Karki",
  publisher: "Anamol Jang Karki",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Anamol Jang Karki - Full-stack Developer",
    description:
      "Full-stack developer portfolio featuring product case studies, tools, games, and UX-focused builds.",
    url: "/",
    siteName: "Anamol Jang Karki",
    images: [
      {
        url: "/images/ajklogo.svg",
        width: 512,
        height: 512,
        alt: "Anamol Jang Karki",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Anamol Jang Karki - Full-stack Developer",
    description:
      "Full-stack developer portfolio featuring product case studies, tools, games, and UX-focused builds.",
    images: ["/images/ajklogo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
  <head>
    <meta name="google-adsense-account" content="ca-pub-2858608482723109" />
  </head>

  <body className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased`}>
    {/* Global visual backdrop */}
    <AuroraBackground />
    <GridPattern />
    <div className="noise-overlay" />
    {/* Brand at top-center */}
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
      <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-full border border-slate-700/60 bg-slate-950/70 backdrop-blur-xl shadow-lg transition hover:border-sky-300/60 hover:bg-slate-900/70">
        <Image src="/images/ajklogo.svg" alt="Anamol Karki Logo" width={40} height={40} className="rounded-full" />
        <span className="text-xs md:text-sm lg:text-base font-semibold uppercase tracking-[0.22em] text-slate-100">Anamol Jang Karki</span>
      </Link>
    </header>

    {/* Creative global sidebar */}
    <SideBar />

    {/* Page content with space for sidebar and mobile tab bar */}
    <div className="pt-24 pb-16 pl-4 md:pl-16 lg:pl-16 xl:pl-20 pr-4">
      {children}
    </div>

    <footer className="relative z-10 px-4 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-slate-800/70 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {new Date().getFullYear()} Anamol Jang Karki. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-slate-300">
          <Link href="/privacy" className="transition hover:text-sky-200">Privacy</Link>
          <Link href="/terms" className="transition hover:text-sky-200">Terms</Link>
          <Link href="/cookies" className="transition hover:text-sky-200">Cookies</Link>
          <Link href="/contact" className="transition hover:text-sky-200">Contact</Link>
          <Link href="/sitemap.xml" className="transition hover:text-sky-200">Sitemap</Link>
        </div>
      </div>
    </footer>
    {/* Mobile primary navigation */}
    <MobileTabBar />
    <SpeedInsights />
    <Analytics />
  </body>
</html>
  );
}
