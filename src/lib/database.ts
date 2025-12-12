import { sql } from '@vercel/postgres';

export async function init() {
  await sql`CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    client_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`;
  await sql`ALTER TABLE contacts ADD COLUMN IF NOT EXISTS client_id TEXT;`;
}

export async function saveContact(
  name: string,
  email: string,
  message: string,
  clientId: string
) {
  await init();
  await sql`INSERT INTO contacts (name, email, message, client_id) VALUES (${name}, ${email}, ${message}, ${clientId});`;
}

export async function getContacts() {
  await init();
  const { rows } = await sql`SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC;`;
  return rows as { id: number; name: string; email: string; message: string; created_at: Date }[];
}

export async function getContactCountForClient(clientId: string, lookbackHours = 24) {
  await init();
  const { rows } =
    await sql`SELECT COUNT(*)::int as count FROM contacts WHERE client_id = ${clientId} AND created_at >= NOW() - (${lookbackHours} || ' hours')::interval;`;
  return Number(rows[0]?.count ?? 0);
}
