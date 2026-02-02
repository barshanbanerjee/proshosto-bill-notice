import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EmailPayload } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const payload: EmailPayload = await request.json();

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const subject =
      payload.type === 'notice'
        ? `Notice Generated - ${(payload.data as any).noticeNumber}`
        : `Donation Receipt Generated - ${String((payload.data as any).receiptNumber).padStart(6, '0')}`;

    const htmlContent =
      payload.type === 'notice'
        ? `
      <h2>Notice Generated</h2>
      <p><strong>Notice Number:</strong> ${(payload.data as any).noticeNumber}</p>
      <p><strong>Date:</strong> ${(payload.data as any).date}</p>
      <p><strong>Generated At:</strong> ${new Date((payload.data as any).createdAt).toLocaleString()}</p>
      <hr>
      <h3>Content:</h3>
      ${(payload.data as any).content}
    `
        : `
      <h2>Donation Receipt Generated</h2>
      <p><strong>Receipt Number:</strong> ${String((payload.data as any).receiptNumber).padStart(6, '0')}</p>
      <p><strong>Donor Name:</strong> ${(payload.data as any).name}</p>
      <p><strong>Amount:</strong> ₹${(payload.data as any).amount.toLocaleString('en-IN')}</p>
      <p><strong>Received By:</strong> ${(payload.data as any).receivedBy}</p>
      <p><strong>Date:</strong> ${(payload.data as any).date}</p>
      <p><strong>Generated At:</strong> ${new Date((payload.data as any).createdAt).toLocaleString()}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL, // Email to receive notifications
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
