import nodemailer from 'nodemailer';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: process.env.SMTP_EMAIL,
    replyTo: email,
    subject: `New contact from ${name}`,
    text: message,
    html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
  });
}
