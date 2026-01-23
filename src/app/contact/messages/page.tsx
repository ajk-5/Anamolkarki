"use client";
import { useEffect, useState } from 'react';

interface Msg {
  id: string;
  subject: string;
  snippet: string;
}

export default function GmailMessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/gmail/messages')
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages as Msg[]);
        } else {
          setError('Failed to load messages');
        }
      })
      .catch(() => setError('Failed to load messages'));
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-14">
      <h1 className="text-2xl font-semibold text-slate-100 font-display mb-4">
        Gmail Messages
      </h1>
      {error && <p className="text-sm text-rose-200">{error}</p>}
      <ul className="space-y-3">
        {messages.map((m) => (
          <li key={m.id} className="card-surface p-4">
            <p className="text-sm font-semibold text-slate-100">{m.subject}</p>
            <p className="text-sm text-slate-300">{m.snippet}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
