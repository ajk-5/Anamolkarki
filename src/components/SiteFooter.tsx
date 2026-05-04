"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const immersive =
    pathname === "/" || pathname.startsWith("/developer") || pathname.startsWith("/projects");
  if (immersive) return null;

  return (
    <footer className="relative z-10 px-4 pb-[calc(28px+var(--safe-bottom))]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="card-surface p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-200/85">
                (c) {new Date().getFullYear()} Anamol Jang Karki. All rights reserved.
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-300/70">
                Inspired by HTML5 UP · Stellar
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/privacy" className="footer-link">Privacy</Link>
              <Link href="/terms" className="footer-link">Terms</Link>
              <Link href="/cookies" className="footer-link">Cookies</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
              <Link href="/sitemap.xml" className="footer-link">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

