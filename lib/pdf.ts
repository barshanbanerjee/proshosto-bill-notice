import { generateNoticeHTML, generateBillHTML } from './templates';
import { Notice, Bill, EmailPayload } from './types';

/**
 * Dynamically import html2pdf only on client side
 */
const getHtml2Pdf = async () => {
  if (typeof window === 'undefined') {
    throw new Error('html2pdf can only be used in browser');
  }
  const html2pdf = (await import('html2pdf.js')).default;
  return html2pdf;
};

/**
 * Generate and download PDF from HTML template
 */
export const generatePDF = async (
  html: string,
  filename: string
): Promise<void> => {
  const html2pdf = await getHtml2Pdf();

  const options = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
  };

  await html2pdf().set(options).from(html).save();
};

/**
 * Generate Notice PDF
 */
export const generateNoticePDF = async (notice: Notice): Promise<void> => {
  const html = generateNoticeHTML(notice);
  const filename = `Notice_${notice.noticeNumber}_${notice.date}.pdf`;
  await generatePDF(html, filename);
};

/**
 * Generate Bill PDF
 */
export const generateBillPDF = async (bill: Bill): Promise<void> => {
  const html = generateBillHTML(bill);
  const filename = `Receipt_${String(bill.receiptNumber).padStart(6, '0')}_${bill.date}.pdf`;
  await generatePDF(html, filename);
};

/**
 * Send email notification for tracking
 * CRITICAL: This sends an alert email every time a notice/bill is generated
 */
export const sendEmailNotification = async (
  payload: EmailPayload
): Promise<void> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to send email notification');
    }

    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Email notification error:', error);
    // Don't block PDF generation if email fails
    // But log it for monitoring
  }
};

/**
 * Combined function: Generate PDF + Send Email
 */
export const generateAndNotify = async (
  type: 'notice' | 'bill',
  data: Notice | Bill
): Promise<void> => {
  // Generate PDF
  if (type === 'notice') {
    await generateNoticePDF(data as Notice);
  } else {
    await generateBillPDF(data as Bill);
  }

  // Send email notification (non-blocking)
  await sendEmailNotification({ type, data });
};
