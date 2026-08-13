import { NextResponse } from 'next/server';
import { getContactCountForClient, saveContact } from '@/lib/database';
import { isContactEmailConfigured, sendContactEmail } from '@/lib/email';

const HOURLY_LIMIT = 3;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientId(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = req.headers.get('x-real-ip');
  const cfConnecting = req.headers.get('cf-connecting-ip');
  const ip = forwarded || realIp || cfConnecting || 'unknown-ip';
  const userAgent = req.headers.get('user-agent') || 'unknown-ua';
  return `${ip}|${userAgent}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const clientId = getClientId(req);

    const recentCount = await getContactCountForClient(clientId, 1);
    if (recentCount >= HOURLY_LIMIT) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. You can send up to 3 messages per hour.' },
        { status: 429 }
      );
    }

    await saveContact(name, email, message, clientId);
    if (isContactEmailConfigured()) {
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
