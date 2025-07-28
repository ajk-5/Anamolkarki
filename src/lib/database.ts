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
