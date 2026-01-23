"use client";

import { useState } from "react";
import { MotionDiv } from "@/components/MotionDiv";
// removed unused Image import after cleanup

interface ContactSectionProps {
  contactRef: React.RefObject<HTMLDivElement>;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactRef }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent");
        setForm({ name: "", email: "", message: "" });
      } else if (res.status === 429) {
        const data = await res.json();
        setStatus(data.error || "Rate limit reached. Try again later.");
        setRateLimited(true);
      } else {
        const data = await res.json();
        setStatus(data.error || "Error");
      }
    } catch {
      setStatus("Error");
    }
  };

  return (
    <footer className="py-12 px-3 sm:px-4 md:px-8 lg:px-16 2xl:max-w-[1600px] 2xl:mx-auto z-10">
      <section ref={contactRef}>
        <MotionDiv
          className="text-2xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-slate-100 uppercase tracking-[0.3em] font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          CONTACT
        </MotionDiv>
        <MotionDiv
          className="card-surface p-6 sm:p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <p className="text-sm sm:text-base font-semibold text-slate-300 mb-4 uppercase tracking-[0.2em]">
              Retrouvez moi sur
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-sky-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <a href="https://www.linkedin.com/in/anamoljang/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-sky-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <a href="https://github.com/ajk-5" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </div>
            {rateLimited ? (
              <div className="mt-6 space-y-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6 text-center text-sm text-slate-200">
                <h2 className="text-xl font-semibold text-slate-100">
                  Contact limit reached
                </h2>
                <p>You&apos;ve already sent 3 messages in the past hour. Please try again later.</p>
                {status && <p className="text-xs text-slate-300">{status}</p>}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-6 max-w-md mx-auto"
              >
                <h2 className="text-xl font-semibold text-slate-100">Envoyer un message</h2>
                <input
                  className="input-field"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className="input-field min-h-[120px]"
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn-primary w-full"
                  type="submit"
                >
                  Send
                </button>
                {status && <p className="text-sm text-center text-slate-300">{status}</p>}
              </form>
            )}
          </MotionDiv>
        </section>
      </footer>
  );
};

export default ContactSection;
