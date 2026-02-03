'use client';

import { useState } from 'react';
import { generateAndNotify } from '@/lib/pdf';
import { incrementReceiptCounter, saveNotice, saveBill } from '@/lib/storage';
import { Notice, Bill } from '@/lib/types';

interface DownloadButtonProps {
  type: 'notice' | 'bill';
  data: Notice | Bill;
  disabled?: boolean;
}

export default function DownloadButton({
  type,
  data,
  disabled = false,
}: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      // Add timestamp
      const dataWithTimestamp = {
        ...data,
        id: `${type}_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      // If bill, increment counter and save
      if (type === 'bill') {
        incrementReceiptCounter();
        saveBill(dataWithTimestamp);
      } else {
        saveNotice(dataWithTimestamp);
      }

      // Generate PDF and send email notification
      await generateAndNotify(type, dataWithTimestamp);

      alert(
        `${type === 'notice' ? 'Notice' : 'Receipt'} generated successfully! Email notification sent.`
      );
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Error generating document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = disabled || isGenerating;

  // Validation check
  const isDataValid = () => {
    if (type === 'notice') {
      const notice = data as Notice;
      return notice.noticeNumber && notice.date && notice.content;
    } else {
      const bill = data as Bill;
      return bill.name && bill.amount > 0 && bill.receivedBy && bill.date;
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDisabled || !isDataValid()}
      className={`px-8 py-3 rounded-lg font-semibold text-white text-lg transition-all ${
        isDisabled || !isDataValid()
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-teal-500 hover:bg-teal-600 shadow-lg hover:shadow-xl'
      }`}
    >
      {isGenerating ? 'Generating...' : 'Download'}
    </button>
  );
}
