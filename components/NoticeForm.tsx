'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-[450px] bg-gray-100 animate-pulse rounded-lg"></div>
});

interface NoticeFormProps {
  onDataChange: (data: {
    date: string;
    noticeNumber: string;
    content: string;
  }) => void;
}

export default function NoticeForm({ onDataChange }: NoticeFormProps) {
  const [date, setDate] = useState('');
  const [noticeNumber, setNoticeNumber] = useState('');
  const [content, setContent] = useState('');
  const [mounted, setMounted] = useState(false);

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  // Fixed formats - removed 'bullet' as it's part of 'list'
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'align',
    'link',
  ];

  // Update parent component whenever data changes
  useEffect(() => {
    onDataChange({ date, noticeNumber, content });
  }, [date, noticeNumber, content, onDataChange]);

  // Auto-fill today's date on mount
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-GB').replace(/\//g, '.');
    setDate(formatted);
    setMounted(true);
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Date Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Date Here
        </label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD.MM.YYYY"
          className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tracking-widest text-center text-sm md:text-base"
        />
      </div>

      {/* Notice Number Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Notice No.
        </label>
        <input
          type="text"
          value={noticeNumber}
          onChange={(e) => setNoticeNumber(e.target.value.slice(0, 8))}
          placeholder="Enter 8 chars"
          className={`w-full px-3 md:px-4 py-2 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 font-mono tracking-widest text-center text-sm md:text-base ${noticeNumber.length === 8
            ? 'border-teal-500 focus:ring-teal-500'
            : 'border-red-300 focus:ring-red-300 bg-red-50'
            }`}
        />
        {noticeNumber.length > 0 && noticeNumber.length < 8 && (
          <p className="mt-1 text-xs text-red-500 text-center">
            Must be exactly 8 characters ({8 - noticeNumber.length} remaining)
          </p>
        )}
      </div>

      {/* Rich Text Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notice Content
        </label>
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          {mounted && (
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your notice content here... (Supports both English and Bengali)"
              className="bg-white"
              style={{ height: '300px', marginBottom: '50px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
