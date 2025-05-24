import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.CONTACT_OWNER_EMAIL || 'hello@startupdeck.ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await resend.emails.send({
      from: 'StartupDeck Contact <noreply@startupdeck.ai>',
      to: OWNER_EMAIL,
      subject: `[Contact] ${subject}`,
      reply_to: email,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
    });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
} 