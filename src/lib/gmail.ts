import { google } from 'googleapis';

export interface GmailMessage {
  id: string;
  subject: string;
  snippet: string;
}

export async function getGmailMessages() {
  const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URI, GMAIL_REFRESH_TOKEN } = process.env;
  if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REDIRECT_URI || !GMAIL_REFRESH_TOKEN) {
    throw new Error('Missing Gmail API credentials');
  }

  const oauth2Client = new google.auth.OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const { data } = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
  const messages = await Promise.all(
    (data.messages || []).map(async (m) => {
      const msg = await gmail.users.messages.get({ userId: 'me', id: m.id!, format: 'metadata' });
      const headers = msg.data.payload?.headers || [];
      const subject = headers.find((h) => h.name === 'Subject')?.value || '';
      const snippet = msg.data.snippet || '';
      return { id: m.id!, subject, snippet } as GmailMessage;
    })
  );
  return messages;
}
