import { NGO_DATA } from './data';
import { Notice, Bill } from './types';

export const generateNoticeHTML = (notice: Notice): string => {
  // Get base URL for images - works in browser context
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Poppins', 'Noto Serif Bengali', sans-serif;
          background: white;
          position: relative;
        }
        
        .page-container {
          width: 210mm;
          height: 297mm;
          position: relative;
          overflow: hidden;
        }
        
        /* Double Border Frame */
        .border-outer {
          position: absolute;
          top: 12px;
          right: 12px;
          bottom: 12px;
          left: 12px;
          border: 2px solid #1f2937;
          pointer-events: none;
        }
        
        .border-inner {
          position: absolute;
          top: 16px;
          right: 16px;
          bottom: 16px;
          left: 16px;
          border: 1px solid #9ca3af;
          pointer-events: none;
        }
        
        /* Main Content */
        .content-wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 20mm;
        }
        
        /* Header */
        .header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #1f2937;
          flex-shrink: 0;
        }
        
        .logo {
          width: 64px;
          height: 64px;
          margin: 0 auto 12px;
          object-fit: contain;
        }
        
        .ngo-name {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        
        .divider {
          width: 80px;
          height: 2px;
          background: #1f2937;
          margin: 0 auto 8px;
        }
        
        .contact-info {
          font-size: 10px;
          color: #4b5563;
          line-height: 1.5;
        }
        
        /* Notice Title */
        .notice-title-container {
          text-align: center;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        
        .notice-title {
          display: inline-block;
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 4px 16px;
          border-bottom: 2px solid #1f2937;
        }
        
        /* Notice Meta */
        .notice-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 8px;
          font-size: 14px;
          flex-shrink: 0;
        }
        
        .meta-label {
          color: #4b5563;
        }
        
        .meta-value {
          font-weight: 600;
          color: #1f2937;
        }
        
        /* Content Area */
        .notice-content {
          flex: 1;
          font-size: 14px;
          line-height: 1.8;
          text-align: justify;
          overflow: hidden;
          word-break: break-all;
          overflow-wrap: break-word;
        }
        
        .notice-content p {
          margin-bottom: 12px;
        }
        
        .notice-content strong, .notice-content b {
          font-weight: 700;
        }
        
        .notice-content em, .notice-content i {
          font-style: italic;
        }
        
        .notice-content ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin-bottom: 12px;
        }
        
        .notice-content ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin-bottom: 12px;
        }
        
        .notice-content li {
          margin-bottom: 4px;
          line-height: 1.8;
        }
        
        /* Signature Section */
        .signature-section {
          margin-top: auto;
          padding-top: 24px;
          flex-shrink: 0;
        }
        
        .signatures {
          display: flex;
          justify-content: space-between;
        }
        
        .signature-box {
          text-align: center;
          width: 40%;
        }
        
        .signature-image {
          height: 48px;
          margin-bottom: 4px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        
        .signature-image img {
          max-height: 40px;
          object-fit: contain;
        }
        
        .signature-line {
          border-top: 2px solid #1f2937;
          padding-top: 4px;
        }
        
        .signature-title {
          font-size: 10px;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .signature-org {
          font-size: 10px;
          color: #4b5563;
        }
        
        /* Footer */
        .footer {
          margin-top: 16px;
          padding-top: 8px;
          border-top: 1px solid #d1d5db;
          text-align: center;
        }
        
        .footer-text {
          font-size: 10px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="page-container">
        <!-- Double Border Frame -->
        <div class="border-outer"></div>
        <div class="border-inner"></div>
        
        <div class="content-wrapper">
          <!-- Header -->
          <div class="header">
            <img src="${baseUrl}/logo.webp" alt="${NGO_DATA.name}" class="logo" />
            <div class="ngo-name">${NGO_DATA.name}</div>
            <div class="divider"></div>
            <div class="contact-info">
              ${NGO_DATA.address}<br/>
              Phone: ${NGO_DATA.contact} | Email: ${NGO_DATA.email}
            </div>
          </div>
          
          <!-- Notice Title -->
          <div class="notice-title-container">
            <div class="notice-title">NOTICE</div>
          </div>
          
          <!-- Notice Meta -->
          <div class="notice-meta">
            <div><span class="meta-label">Ref No:</span> <span class="meta-value">${notice.noticeNumber}</span></div>
            <div><span class="meta-label">Date:</span> <span class="meta-value">${notice.date}</span></div>
          </div>
          
          <!-- Content -->
          <div class="notice-content">
            ${notice.content}
          </div>
          
          <!-- Signature Section -->
          <div class="signature-section">
            <div class="signatures">
              <div class="signature-box">
                <div class="signature-image">
                  <img src="${baseUrl}/signatures/president.webp" alt="President Signature" />
                </div>
                <div class="signature-line">
                  <div class="signature-title">President</div>
                  <div class="signature-org">${NGO_DATA.name}</div>
                </div>
              </div>
              <div class="signature-box">
                <div class="signature-image">
                  <img src="${baseUrl}/signatures/secretary.webp" alt="Secretary Signature" />
                </div>
                <div class="signature-line">
                  <div class="signature-title">Secretary</div>
                  <div class="signature-org">${NGO_DATA.name}</div>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-text">${NGO_DATA.name} • ${NGO_DATA.address}</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateBillHTML = (bill: Bill): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          background: white;
        }
        
        .page-container {
          width: 210mm;
          height: 297mm;
          position: relative;
          overflow: hidden;
        }
        
        /* Double Border Frame */
        .border-outer {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          border: 2px solid #1f2937;
          pointer-events: none;
        }
        
        .border-inner {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          bottom: 16px;
          border: 1px solid #9ca3af;
          pointer-events: none;
        }
        
        .content-wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 20mm;
        }
        
        /* Header */
        .header {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #1f2937;
          flex-shrink: 0;
        }
        
        .logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin: 0 auto 12px;
          display: block;
        }
        
        .ngo-name {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        
        .divider {
          width: 80px;
          height: 2px;
          background: #1f2937;
          margin: 8px auto;
        }
        
        .receipt-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 8px;
        }
        
        .contact-info {
          font-size: 10px;
          color: #4b5563;
          line-height: 1.5;
          margin-top: 8px;
        }
        
        /* Receipt Number */
        .receipt-number {
          text-align: right;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
          flex-shrink: 0;
        }
        
        .receipt-number span {
          color: #4b5563;
        }
        
        /* Receipt Body */
        .receipt-body {
          flex: 1;
        }
        
        .receipt-table {
          border: 2px solid #1f2937;
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .receipt-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .receipt-label {
          font-weight: 600;
          color: #374151;
          width: 40%;
        }
        
        .receipt-value {
          color: #1f2937;
          width: 55%;
          text-align: right;
          word-break: break-all;
        }
        
        .amount-row {
          margin-top: 8px;
          padding-top: 12px;
          border-top: 2px solid #1f2937;
          border-bottom: none;
        }
        
        .amount-row .receipt-label {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .amount-row .receipt-value {
          font-size: 18px;
          font-weight: 700;
        }
        
        .thank-you {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-align: center;
        }
        
        /* Signature Section */
        .signature-section {
          margin-top: auto;
          padding-top: 24px;
          flex-shrink: 0;
        }
        
        .signatures {
          display: flex;
          justify-content: space-between;
        }
        
        .signature-box {
          text-align: center;
          width: 40%;
        }
        
        .signature-image {
          height: 40px;
          margin-bottom: 4px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        
        .signature-image img {
          max-height: 40px;
          max-width: 80px;
          object-fit: contain;
        }
        
        .signature-line {
          border-top: 2px solid #1f2937;
          padding-top: 4px;
        }
        
        .signature-title {
          font-size: 10px;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .signature-org {
          font-size: 10px;
          color: #4b5563;
        }
        
        /* Footer */
        .footer {
          margin-top: 16px;
          padding-top: 8px;
          border-top: 1px solid #d1d5db;
          text-align: center;
        }
        
        .footer-text {
          font-size: 10px;
          color: #6b7280;
        }
        
        .footer-italic {
          font-size: 10px;
          color: #6b7280;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="page-container">
        <div class="border-outer"></div>
        <div class="border-inner"></div>
        
        <div class="content-wrapper">
          <!-- Header -->
          <div class="header">
            <img src="${baseUrl}/logo.webp" alt="${NGO_DATA.name}" class="logo" />
            <div class="ngo-name">${NGO_DATA.name}</div>
            <div class="divider"></div>
            <div class="receipt-title">DONATION RECEIPT</div>
            <div class="contact-info">
              ${NGO_DATA.address}<br/>
              Phone: ${NGO_DATA.contact} | Email: ${NGO_DATA.email}
            </div>
          </div>
          
          <!-- Receipt Number -->
          <div class="receipt-number">
            <span>Receipt No:</span> ${String(bill.receiptNumber).padStart(6, '0')}
          </div>
          
          <!-- Receipt Body -->
          <div class="receipt-body">
            <div class="receipt-table">
              <div class="receipt-row">
                <div class="receipt-label">Received From:</div>
                <div class="receipt-value">${bill.name || '—'}</div>
              </div>
              
              <div class="receipt-row">
                <div class="receipt-label">Date:</div>
                <div class="receipt-value">${bill.date || '—'}</div>
              </div>
              
              <div class="receipt-row">
                <div class="receipt-label">Received By:</div>
                <div class="receipt-value">${bill.receivedBy || '—'}</div>
              </div>
              
              <div class="receipt-row amount-row">
                <div class="receipt-label">Amount Received:</div>
                <div class="receipt-value">₹ ${bill.amount ? bill.amount.toLocaleString('en-IN') : '0'}</div>
              </div>
            </div>
            
            <div class="thank-you">Thank you for your generous contribution!</div>
          </div>
          
          <!-- Signature Section -->
          <div class="signature-section">
            <div class="signatures">
              <div class="signature-box">
                <div class="signature-image">
                  <img src="${baseUrl}/signatures/president.webp" alt="President Signature" />
                </div>
                <div class="signature-line">
                  <div class="signature-title">President</div>
                  <div class="signature-org">${NGO_DATA.name}</div>
                </div>
              </div>
              <div class="signature-box">
                <div class="signature-image">
                  <img src="${baseUrl}/signatures/secretary.webp" alt="Secretary Signature" />
                </div>
                <div class="signature-line">
                  <div class="signature-title">Secretary</div>
                  <div class="signature-org">${NGO_DATA.name}</div>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-text">${NGO_DATA.name} • ${NGO_DATA.address} • ${NGO_DATA.contact}</div>
              <div class="footer-italic">This is an official receipt.</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
