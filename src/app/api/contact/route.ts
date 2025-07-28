import { NextResponse } from 'next/server';
import { saveContact } from '@/lib/database';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    await saveContact(name, email, message);
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      try {
        await sendContactEmail({ name, email, message });
      } catch (err) {
        console.error('Email error:', err);
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
