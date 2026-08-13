import nodemailer from 'nodemailer';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
};

const REQUIRED_SMTP_ENV = ['SMTP_HOST', 'SMTP_EMAIL', 'SMTP_PASSWORD'] as const;

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeLineBreaks(value: string) {
  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function getEmailConfig(): EmailConfig {
  const missing = REQUIRED_SMTP_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing SMTP configuration: ${missing.join(', ')}`);
  }

  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error('Invalid SMTP_PORT configuration');
  }

  return {
    host: process.env.SMTP_HOST!,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    user: process.env.SMTP_EMAIL!,
    password: process.env.SMTP_PASSWORD!,
    from: process.env.SMTP_FROM || process.env.SMTP_EMAIL!,
    to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_EMAIL!,
  };
}

export function isContactEmailConfigured() {
  return REQUIRED_SMTP_ENV.every((key) => Boolean(process.env[key]));
}

function getTransporter(config: EmailConfig) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  return transporter;
}

export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const config = getEmailConfig();
  const safeName = sanitizeHeaderValue(name);
  const safeEmail = email.trim().toLowerCase();
  const normalizedMessage = normalizeLineBreaks(message.trim());
  const htmlMessage = escapeHtml(normalizedMessage).replace(/\n/g, '<br />');

  const info = await getTransporter(config).sendMail({
    from: `"Portfolio Contact" <${config.from}>`,
    to: config.to,
    replyTo: `"${safeName.replace(/"/g, "'")}" <${safeEmail}>`,
    subject: `New portfolio contact from ${safeName}`,
    text: [
      normalizedMessage,
      '',
      `From: ${safeName}`,
      `Email: ${safeEmail}`,
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827">
        <h2 style="margin:0 0 16px">New portfolio contact</h2>
        <p style="white-space:normal">${htmlMessage}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
        <p style="margin:0"><strong>From:</strong> ${escapeHtml(safeName)}</p>
        <p style="margin:4px 0 0"><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
      </div>
    `,
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
}
