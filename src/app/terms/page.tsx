import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for the Anamol Jang Karki portfolio website.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-14">
      <div className="card-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Terms</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-100 font-display">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          By accessing this website, you agree to the terms below. If you do not agree, please do not
          use the site.
        </p>

        <div className="mt-6 space-y-5 text-sm text-slate-300">
          <section>
            <h2 className="text-base font-semibold text-slate-100">Use of the site</h2>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Use the site for lawful purposes only.</li>
              <li>Do not attempt to disrupt, exploit, or harm the site or its users.</li>
              <li>Do not scrape or reuse content without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Intellectual property</h2>
            <p className="mt-2">
              All content, visuals, and code samples on this site are the property of Anamol Jang Karki
              unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Third party services</h2>
            <p className="mt-2">
              The site may display third party services such as Google AdSense. Those services may
              collect data in accordance with their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Disclaimer</h2>
            <p className="mt-2">
              This site is provided as is without warranties of any kind. Availability and content may
              change at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Limitation of liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, the site owner will not be liable for any damages
              resulting from the use of this site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Changes</h2>
            <p className="mt-2">
              Terms may be updated periodically. Continued use of the site means you accept the updated
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Contact</h2>
            <p className="mt-2">
              For questions about these terms, use the contact form on the Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
