"use client";

import { useRouter } from "next/navigation";
import { JSX, useState, type SVGProps } from "react";

// --- Inline SVG Icons ---
type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const UsersIcon: Icon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <circle cx="8" cy="8" r="3" strokeWidth={1.5} />
    <path d="M14 21a6 6 0 0 0-12 0" strokeWidth={1.5} strokeLinecap="round" />
    <circle cx="16.5" cy="7.5" r="2.5" strokeWidth={1.5} />
    <path d="M22 21a5 5 0 0 0-7.5-4.5" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

const CodeIcon: Icon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <path d="M9 18L3 12l6-6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 6l6 6-6 6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BeerIcon: Icon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
    <rect x="5" y="8" width="9" height="11" rx="2" strokeWidth={1.5} />
    <path d="M14 10h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2" strokeWidth={1.5} />
    <path d="M5 8h9a3 3 0 0 0 0-6H9a3 3 0 0 0-4 3" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

// --- Types ---
interface Profile {
  id: string;
  label: string;
  icon: Icon;
  question?: string;
  answers?: string[]; // lowercase answers for simple case-insensitive matching
  path: string;
}

// --- Data ---
const profiles: Profile[] = [
  {
    id: "friends",
    label: "Friends/Family",
    icon: UsersIcon,
    question: "Who is my favourite celebrity?",
    answers: ["lionel messi", "messi", "leo messi"],
    path: "/me",
  },
  {
    id: "dev",
    label: "Employer Developpeur",
    icon: CodeIcon,
    path: "/developer",
  },
  {
    id: "barman",
    label: "Employer Barman",
    icon: BeerIcon,
    path: "/Bar",
  },
];

export default function Home() {
  const [selected, setSelected] = useState<Profile | null>(null);
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  const handleSelect = (profile: Profile) => {
    if (profile.question) {
      setSelected(profile);
    } else {
      router.push(profile.path);
    }
  };

  const handleSubmit = () => {
    if (!selected) return;
    const userAnswer = answer.trim().toLowerCase();
    const correct = selected.answers?.some((a) => a.trim().toLowerCase() === userAnswer);
    if (correct) {
      router.push(selected.path);
    } else {
      alert("Incorrect answer, try again!");
    }
  };

  // Always render a 2x2 grid like Netflix. If fewer than 4 profiles, pad with invisible placeholders
  const cells: (Profile | null)[] = Array.from({ length: 4 }, (_, i) => profiles[i] ?? null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-8 bg-black">
      {!selected && (
        <>
          <h1 className="text-3xl font-bold text-white">Who’s watching?</h1>
          <div className="grid grid-cols-2 gap-8 w-[min(90vw,28rem)]">
            {cells.map((p, idx) =>
              p ? (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelect(p)}
                  className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label={p.label}
                >
                  <div className="aspect-square w-28 sm:w-36 rounded-lg overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 group-hover:border-white/30 group-focus-visible:border-white/40">
                    <p.icon className="w-12 sm:w-14 h-12 sm:h-14 text-white/90" />
                  </div>
                  <span className="mt-3 text-white/80 text-sm tracking-wide group-hover:text-white group-focus-visible:text-white">
                    {p.label}
                  </span>
                </button>
              ) : (
                <div key={`placeholder-${idx}`} className="flex flex-col items-center">
                  <div className="aspect-square w-28 sm:w-36 opacity-0 pointer-events-none" />
                  <span className="mt-3 text-transparent text-sm">placeholder</span>
                </div>
              )
            )}
          </div>
        </>
      )}

      {selected?.question && (
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold text-white max-w-xs">{selected.question}</h2>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Type your answer"
            className="p-2 rounded text-black"
          />
          <div className="flex gap-3">
            <button
              onClick={() => setSelected(null)}
              className="bg-white/20 text-white px-4 py-2 rounded border border-white/40"
            >
              Back
            </button>
            <button onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
