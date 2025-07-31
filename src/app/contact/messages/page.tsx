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
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gmail Messages</h1>
      {error && <p>{error}</p>}
      <ul className="space-y-2">
        {messages.map((m) => (
          <li key={m.id} className="border p-2 rounded">
            <p className="font-semibold">{m.subject}</p>
            <p>{m.snippet}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
