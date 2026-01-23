import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Cookies policy for the Anamol Jang Karki portfolio website.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-14">
      <div className="card-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Cookies</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-100 font-display">
          Cookies Policy
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          This page explains how cookies and similar technologies are used on this website.
        </p>

        <div className="mt-6 space-y-5 text-sm text-slate-300">
          <section>
            <h2 className="text-base font-semibold text-slate-100">What are cookies</h2>
            <p className="mt-2">
              Cookies are small text files stored on your device. They help sites remember preferences,
              measure usage, and deliver relevant content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">How cookies are used</h2>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Essential functionality such as navigation and basic preferences.</li>
              <li>Performance and analytics to understand usage and improve the site.</li>
              <li>Advertising measurement and personalization where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Advertising cookies</h2>
            <p className="mt-2">
              Google AdSense may set cookies to show relevant ads and measure performance. Learn more at
              <span className="text-sky-200"> google.com/policies/technologies/ads</span>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Managing cookies</h2>
            <p className="mt-2">
              You can control or delete cookies in your browser settings. Blocking cookies may affect
              some site functionality.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
