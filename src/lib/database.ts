import { sql } from '@vercel/postgres';

export async function init() {
  await sql`CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`;
}

export async function saveContact(name: string, email: string, message: string) {
  await init();
  await sql`INSERT INTO contacts (name, email, message) VALUES (${name}, ${email}, ${message});`;
}

export async function getContacts() {
  await init();
  const { rows } = await sql`SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC;`;
  return rows as { id: number; name: string; email: string; message: string; created_at: Date }[];
}
