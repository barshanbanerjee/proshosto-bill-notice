'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import NoticeForm from '@/components/NoticeForm';
import A4Preview from '@/components/A4Preview';
import DownloadButton from '@/components/DownloadButton';
import { Notice } from '@/lib/types';

export default function NoticePage() {
  const [noticeData, setNoticeData] = useState<Notice>({
    id: '',
    date: '',
    noticeNumber: '',
    content: '',
    createdAt: '',
  });
  const [selectedFont, setSelectedFont] = useState<'bengali' | 'english'>('bengali');
  const [zoom, setZoom] = useState(50);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleDataChange = useCallback(
    (data: { date: string; noticeNumber: string; content: string }) => {
      setNoticeData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    []
  );

  // Auto-calculate zoom to fit preview in container
  useEffect(() => {
    const calculateZoom = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth - 32; // padding
        const a4Width = 793; // 210mm in pixels approx
        const autoZoom = Math.min(100, Math.floor((containerWidth / a4Width) * 100));
        setZoom(Math.max(20, autoZoom));
      }
    };

    calculateZoom();
    window.addEventListener('resize', calculateZoom);
    return () => window.removeEventListener('resize', calculateZoom);
  }, []);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 100));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 20));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Layout - Simple Flexbox */}
      <div className="flex flex-col xl:flex-row">
        {/* Left Panel - Form */}
        <div className="w-full xl:w-1/2 p-4 sm:p-6 bg-white xl:border-r border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Notice Generator
          </h1>
          <p className="text-gray-600 mb-4 text-sm">
            Create official notices with bilingual support
          </p>

          {/* Font Selection */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Font
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFont('bengali')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${selectedFont === 'bengali'
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-300 bg-white text-gray-700'
                  }`}
              >
                <span className="font-medium">বাংলা</span>
              </button>
              <button
                onClick={() => setSelectedFont('english')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm ${selectedFont === 'english'
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-300 bg-white text-gray-700'
                  }`}
              >
                <span className="font-medium">English</span>
              </button>
            </div>
          </div>

          <NoticeForm onDataChange={handleDataChange} />

          <div className="mt-6 flex justify-center">
            <DownloadButton type="notice" data={noticeData} />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div
          ref={previewContainerRef}
          className="w-full xl:w-1/2 bg-gray-100 p-4 sm:p-6 border-t xl:border-t-0 border-gray-200"
        >
          {/* Preview Header with Zoom Controls */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Preview</h2>
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-2 py-1">
              <button
                onClick={zoomOut}
                disabled={zoom <= 20}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold text-gray-700"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="min-w-[50px] text-center text-sm font-medium text-gray-700">
                {zoom}%
              </span>
              <button
                onClick={zoomIn}
                disabled={zoom >= 100}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold text-gray-700"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>
          </div>

          {/* Preview Container - Scales to fit */}
          <div className="flex justify-center">
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <A4Preview
                type="notice"
                data={noticeData}
                selectedFont={selectedFont}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
