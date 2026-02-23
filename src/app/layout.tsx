
import "../styles/globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AuroraBackground from "@/components/AuroraBackground";
import GridPattern from "@/components/GridPattern";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Atkinson_Hyperlegible, Fraunces } from "next/font/google";

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

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
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

  <body className={`${atkinson.variable} ${fraunces.variable} antialiased`}>
    {/* Global visual backdrop */}
    <AuroraBackground />
    <GridPattern />
    <div className="noise-overlay" />
    <SiteHeader />

    <div className="relative z-10 min-h-[calc(100vh-140px)]">
      {children}
    </div>

    <SiteFooter />
    <SpeedInsights />
    <Analytics />
  </body>
</html>
  );
}
