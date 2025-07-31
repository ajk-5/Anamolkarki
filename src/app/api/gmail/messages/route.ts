import { NextResponse } from 'next/server';
import { getGmailMessages } from '@/lib/gmail';

export async function GET() {
  try {
    const messages = await getGmailMessages();
    return NextResponse.json({ messages });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch Gmail messages' }, { status: 500 });
  }
}
