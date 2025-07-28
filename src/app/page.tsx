"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Profile {
  id: string;
  label: string;
  icon: string;
  question?: string;
  answers?: string[];
  path: string;
}

const profiles: Profile[] = [
  {
    id: "friends",
    label: "Friends/Family",
    icon: "/images/user.svg",
    question: "Who is my favorite player of all time?",
    answers: ["lionel messi", "messi", "leo messi"],
    path: "/developer",
  },
  {
    id: "know",
    label: "Want To Know Me Better",
    icon: "/images/user.svg",
    question: "What is my Instagram handle?",
    answers: ["anamol__karki"],
    path: "/developer",
  },
  {
    id: "barman",
    label: "Employer Barman",
    icon: "/images/user.svg",
    path: "/Bar",
  },
  {
    id: "dev",
    label: "Employer Developpeur",
    icon: "/images/user.svg",
    path: "/developer",
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
    const correct = selected.answers?.some(
      (a) => a.toLowerCase() === userAnswer
    );
    if (correct) {
      router.push(selected.path);
    } else {
      alert("Incorrect answer, try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-6">
      {!selected && (
        <>
          <h1 className="text-3xl font-bold text-white">Who is watching?</h1>
          <div className="flex gap-6 flex-wrap justify-center">
            {profiles.map((p) => (
              <div
                key={p.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelect(p)}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-white/20">
                  <Image src={p.icon} alt={p.label} width={80} height={80} />
                </div>
                <span className="mt-2 text-white text-sm">{p.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {selected && selected.question && (
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-semibold text-white max-w-xs">
            {selected.question}
          </h2>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-2 rounded text-black"
          />
          <button
            onClick={handleSubmit}
            className="bg-teal-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
