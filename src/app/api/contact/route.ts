import { NextResponse } from 'next/server';
import { getContactCountForClient, saveContact } from '@/lib/database';
import { sendContactEmail } from '@/lib/email';

function getClientId(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = req.headers.get('x-real-ip');
  const cfConnecting = req.headers.get('cf-connecting-ip');
  const ip = forwarded || realIp || cfConnecting || 'unknown-ip';
  const userAgent = req.headers.get('user-agent') || 'unknown-ua';
  return `${ip}|${userAgent}`;
}

export async function POST(req: Request) {
  const HOURLY_LIMIT = 3;
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
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
