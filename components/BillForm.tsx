'use client';

import { useState, useEffect } from 'react';
import { RECEIVED_BY_OPTIONS } from '@/lib/receivedby';
import { getReceiptCounter } from '@/lib/storage';

interface BillFormProps {
  onDataChange: (data: {
    receiptNumber: string;
    name: string;
    amount: number;
    receivedBy: string;
    date: string;
  }) => void;
}

export default function BillForm({ onDataChange }: BillFormProps) {
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [receivedBy, setReceivedBy] = useState(RECEIVED_BY_OPTIONS[0]);
  const [date, setDate] = useState('');

  // Initialize date to today
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-GB').replace(/\//g, '.');
    setDate(formatted);
  }, []);

  // Update parent component whenever data changes
  useEffect(() => {
    onDataChange({ receiptNumber, name, amount, receivedBy, date });
  }, [receiptNumber, name, amount, receivedBy, date, onDataChange]);

  return (
    <div className="space-y-6">
      {/* Receipt Number (Manual Entry) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Receipt Number (8 digits)
        </label>
        <input
          type="text"
          value={receiptNumber}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 8);
            setReceiptNumber(val);
          }}
          placeholder="00000000"
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 font-mono tracking-widest text-center ${receiptNumber.length === 8
            ? 'border-teal-500 focus:ring-teal-500'
            : 'border-red-300 focus:ring-red-300 bg-red-50'
            }`}
        />
        {receiptNumber.length > 0 && receiptNumber.length < 8 && (
          <p className="mt-1 text-xs text-red-500 text-center">
            Must be exactly 8 digits ({8 - receiptNumber.length} remaining)
          </p>
        )}
      </div>

      {/* Donor Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Donor Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter donor name"
          className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (₹)
        </label>
        <input
          type="number"
          value={amount || ''}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          placeholder="Enter amount"
          className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Received By Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Received By
        </label>
        <select
          value={receivedBy}
          onChange={(e) => setReceivedBy(e.target.value)}
          className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          {RECEIVED_BY_OPTIONS.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD.MM.YYYY"
          className="w-full px-4 py-3 border-2 border-teal-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tracking-widest text-center"
        />
      </div>
    </div>
  );
}
