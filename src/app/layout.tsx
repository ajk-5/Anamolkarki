
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">

  <body className={`${geistSans.variable} ${geistMono.variable}`}>
    {/* Brand at top-center */}
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
      <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-full border border-teal-500/40 bg-white/10 backdrop-blur-md shadow-md hover:bg-white/15 transition">
        <Image src="/images/ajklogo.svg" alt="Anamol Karki Logo" width={40} height={40} className="rounded-full" />
        <span className="text-sm md:text-base lg:text-lg font-semibold tracking-wide text-teal-200">ANAMOL JANG KARKI</span>
      </Link>
    </header>

    {/* Creative global sidebar */}
    <SideBar />

    {/* Page content with space for sidebar */}
    <div className="pt-24 pl-4 md:pl-16 lg:pl-16 xl:pl-20 pr-4">
      {children}
    </div>
    <SpeedInsights />
  </body>
</html>
  );
}
