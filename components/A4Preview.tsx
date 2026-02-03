'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { NGO_DATA } from '@/lib/data';

interface A4PreviewProps {
  type: 'notice' | 'bill';
  data: {
    noticeNumber?: string;
    date?: string;
    content?: string;
    receiptNumber?: string;
    name?: string;
    amount?: number;
    receivedBy?: string;
  };
  selectedFont?: 'bengali' | 'english';
  onOverflow?: (isOverflowing: boolean) => void;
}

export default function A4Preview({ type, data, selectedFont = 'bengali', onOverflow }: A4PreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const contentFontClass = selectedFont === 'bengali'
    ? 'font-bengali'
    : 'font-poppins';

  // Check for content overflow
  useEffect(() => {
    if (type === 'notice' && contentRef.current) {
      const element = contentRef.current;
      const isOverflow = element.scrollHeight > element.clientHeight;
      setIsOverflowing(isOverflow);
      onOverflow?.(isOverflow);
    }
  }, [data.content, type, onOverflow]);

  if (type === 'notice') {
    return (
      <div
        className="w-[210mm] h-[297mm] bg-white relative overflow-hidden"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {/* Overflow Warning Indicator - Shows when content exceeds A4 */}
        {isOverflowing && (
          <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
            <div className="h-8 bg-gradient-to-t from-red-500/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-[10px] font-semibold text-center py-1">
              ⚠️ Content exceeds A4 page — Please reduce text
            </div>
          </div>
        )}

        {/* Elegant Border Frame */}
        <div className="absolute inset-3 border-2 border-gray-800 pointer-events-none z-10"></div>
        <div className="absolute inset-4 border border-gray-400 pointer-events-none z-10"></div>

        {/* Main Content Container with Flexbox for sticky footer */}
        <div className="h-full flex flex-col p-[20mm]">
          {/* Corporate Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-gray-800 flex-shrink-0">
            {/* Logo */}
            <div className="w-16 h-16 mx-auto mb-3 relative">
              <Image
                src="/logo.webp"
                alt={NGO_DATA.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Organization Name */}
            <h1
              className="text-2xl font-bold text-gray-900 tracking-wide uppercase mb-1"
              style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em' }}
            >
              {NGO_DATA.name}
            </h1>

            {/* Divider */}
            <div className="w-20 h-0.5 bg-gray-800 mx-auto mb-2"></div>

            {/* Contact Info */}
            <p className="text-[10px] text-gray-600 leading-relaxed font-poppins">
              {NGO_DATA.address}
            </p>
            <p className="text-[10px] text-gray-600 mt-0.5 font-poppins">
              Phone: {NGO_DATA.contact} | Email: {NGO_DATA.email}
            </p>
          </div>

          {/* Notice Title */}
          <div className="text-center mb-4 flex-shrink-0">
            <h2
              className="text-lg font-bold text-gray-900 tracking-widest uppercase border-b-2 border-gray-800 inline-block pb-1 px-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              NOTICE
            </h2>
          </div>

          {/* Notice Meta - Always Poppins */}
          <div className="flex justify-between mb-4 text-sm pb-2 font-poppins flex-shrink-0">
            <div className="font-semibold text-gray-800">
              <span className="text-gray-600">Ref No:</span> {data.noticeNumber || 'XXXXXX'}
            </div>
            <div className="text-gray-800">
              <span className="text-gray-600">Date:</span> {data.date || 'XX.XX.XXXX'}
            </div>
          </div>

          {/* Content Area - Flexible, takes remaining space */}
          <div ref={contentRef} className="flex-1 min-h-0 overflow-hidden relative">
            <div
              className={`notice-content text-sm leading-relaxed text-justify break-all ${contentFontClass}`}
              dangerouslySetInnerHTML={{
                __html: data.content || '<p class="text-gray-400 italic">Notice content will appear here...</p>',
              }}
            />
          </div>

          {/* Signature Section - Fixed at bottom */}
          <div className="mt-auto pt-6 flex-shrink-0">
            <div className="flex justify-between items-end">
              {/* President Signature */}
              <div className="text-center w-2/5">
                <div className="h-20 mb-1 relative flex items-end justify-center">
                  <Image
                    src="/signatures/president.webp"
                    alt="President Signature"
                    width={200}
                    height={100}
                    className="object-contain"
                    style={{ maxHeight: '100px' }}
                  />
                </div>
                <div className="border-t-2 border-gray-800 pt-1">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wide font-poppins">President</div>
                  <div className="text-[10px] text-gray-600 font-poppins">{NGO_DATA.name}</div>
                </div>
              </div>

              {/* Secretary Signature */}
              <div className="text-center w-2/5">
                <div className="h-20 mb-1 relative flex items-end justify-center">
                  <Image
                    src="/signatures/secretary.webp"
                    alt="Secretary Signature"
                    width={200}
                    height={100}
                    className="object-contain"
                    style={{ maxHeight: '100px' }}
                  />
                </div>
                <div className="border-t-2 border-gray-800 pt-1">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wide font-poppins">Secretary</div>
                  <div className="text-[10px] text-gray-600 font-poppins">{NGO_DATA.name}</div>
                </div>
              </div>
            </div>

            {/* Footer - Always at bottom */}
            <div className="mt-4 pt-2 border-t border-gray-300 text-center">
              <p className="text-[10px] text-gray-500 font-poppins">
                {NGO_DATA.name} • {NGO_DATA.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bill Preview
  return (
    <div
      className="w-[210mm] h-[297mm] bg-white relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Elegant Border Frame */}
      <div className="absolute inset-3 border-2 border-gray-800 pointer-events-none z-10"></div>
      <div className="absolute inset-4 border border-gray-400 pointer-events-none z-10"></div>

      {/* Main Content Container with Flexbox for sticky footer */}
      <div className="h-full flex flex-col p-[20mm]">
        {/* Corporate Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-800 flex-shrink-0">
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-3 relative">
            <Image
              src="/logo.webp"
              alt={NGO_DATA.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Organization Name */}
          <h1
            className="text-2xl font-bold text-gray-900 tracking-wide uppercase mb-1"
            style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.1em' }}
          >
            {NGO_DATA.name}
          </h1>

          <div className="w-20 h-0.5 bg-gray-800 mx-auto mb-2"></div>

          {/* Receipt Title */}
          <h2 className="text-lg font-bold text-gray-900 tracking-widest uppercase mt-2 font-poppins">
            DONATION RECEIPT
          </h2>

          {/* Contact Info */}
          <p className="text-[10px] text-gray-600 leading-relaxed mt-2 font-poppins">
            {NGO_DATA.address}
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5 font-poppins">
            Phone: {NGO_DATA.contact} | Email: {NGO_DATA.email}
          </p>
        </div>

        {/* Receipt Number */}
        <div className="text-right text-sm font-semibold mb-4 text-gray-800 font-poppins flex-shrink-0">
          <span className="text-gray-600">Receipt No:</span>{' '}
          {data.receiptNumber || 'XXXXXXXX'}
        </div>

        {/* Receipt Body - Flexible */}
        <div className="flex-1 min-h-0">
          <div className="border-2 border-gray-800 p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="font-semibold text-gray-700 w-2/5 font-poppins text-sm">
                  Received From:
                </div>
                <div className={`text-gray-900 w-3/5 text-right font-medium text-sm break-all ${contentFontClass}`}>
                  {data.name || '—'}
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="font-semibold text-gray-700 w-2/5 font-poppins text-sm">Date:</div>
                <div className="text-gray-900 w-3/5 text-right font-poppins text-sm">
                  {data.date || '—'}
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="font-semibold text-gray-700 w-2/5 font-poppins text-sm">
                  Received By:
                </div>
                <div className={`text-gray-900 w-3/5 text-right text-sm break-all ${contentFontClass}`}>
                  {data.receivedBy || '—'}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-gray-800">
                <div className="font-bold text-gray-900 text-sm w-2/5 uppercase font-poppins">
                  Amount Received:
                </div>
                <div className="text-gray-900 font-bold text-lg w-3/5 text-right font-poppins">
                  ₹{' '}
                  {data.amount ? data.amount.toLocaleString('en-IN') : '0'}
                </div>
              </div>
            </div>
          </div>

          {/* Thank You */}
          <div className={`text-center text-sm font-medium text-gray-700 ${contentFontClass}`}>
            Thank you for your generous contribution!
          </div>
        </div>

        {/* Signature Section - Fixed at bottom */}
        <div className="mt-auto pt-6 flex-shrink-0">
          <div className="flex justify-between items-end">
            {/* President Signature */}
            <div className="text-center w-2/5">
              <div className="h-20 mb-1 relative flex items-end justify-center">
                <Image
                  src="/signatures/president.webp"
                  alt="President Signature"
                  width={200}
                  height={100}
                  className="object-contain"
                  style={{ maxHeight: '100px' }}
                />
              </div>
              <div className="border-t-2 border-gray-800 pt-1">
                <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wide font-poppins">President</div>
                <div className="text-[10px] text-gray-600 font-poppins">{NGO_DATA.name}</div>
              </div>
            </div>

            {/* Secretary Signature */}
            <div className="text-center w-2/5">
              <div className="h-20 mb-1 relative flex items-end justify-center">
                <Image
                  src="/signatures/secretary.webp"
                  alt="Secretary Signature"
                  width={200}
                  height={100}
                  className="object-contain"
                  style={{ maxHeight: '100px' }}
                />
              </div>
              <div className="border-t-2 border-gray-800 pt-1">
                <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wide font-poppins">Secretary</div>
                <div className="text-[10px] text-gray-600 font-poppins">{NGO_DATA.name}</div>
              </div>
            </div>
          </div>

          {/* Footer - Always at bottom */}
          <div className="mt-4 pt-2 border-t border-gray-300 text-center">
            <p className="text-[10px] text-gray-500 font-poppins">
              {NGO_DATA.name} • {NGO_DATA.address} • {NGO_DATA.contact}
            </p>
            <p className="text-[10px] text-gray-500 font-poppins italic">
              This is an official receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
