import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Anamol Jang Karki portfolio website.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-14">
      <div className="card-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Privacy</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-100 font-display">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          This policy explains what data is collected and how it is used when you visit this website.
        </p>

        <div className="mt-6 space-y-5 text-sm text-slate-300">
          <section>
            <h2 className="text-base font-semibold text-slate-100">Information collected</h2>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Contact form details such as your name, email address, and message.</li>
              <li>Usage data such as pages viewed, device type, and performance metrics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">How data is used</h2>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Respond to messages submitted through the contact form.</li>
              <li>Improve site performance, reliability, and user experience.</li>
              <li>Support advertising measurement and personalization where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Advertising and analytics</h2>
            <p className="mt-2">
              This site may use Google AdSense to display ads. Google may use cookies or similar
              technologies to serve and measure ads. You can learn more at
              <span className="text-sky-200"> google.com/policies/technologies/ads</span>
              and manage ad settings at
              <span className="text-sky-200"> adssettings.google.com</span>.
            </p>
            <p className="mt-2">
              Analytics and performance data may be collected via Vercel Analytics and Speed Insights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Cookies</h2>
            <p className="mt-2">
              Cookies may be used for basic site functionality, analytics, and advertising. See the
              Cookies Policy for more details.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Data retention</h2>
            <p className="mt-2">
              Contact submissions are retained only as long as needed to respond and keep a record of the
              conversation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Your choices</h2>
            <p className="mt-2">
              You can request updates or deletion of your contact data by using the contact form.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-100">Contact</h2>
            <p className="mt-2">
              For privacy questions, use the contact form on the Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
