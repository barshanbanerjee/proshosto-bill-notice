/**
 * LocalStorage utility for managing counters and data
 * 
 * MIGRATION PATH TO DATABASE:
 * 1. Replace these functions with API calls to /api/storage endpoints
 * 2. Keep function signatures identical
 * 3. Add async/await to all function calls
 * 4. Example: getReceiptCounter() -> await fetch('/api/storage/receipt-counter')
 */

const KEYS = {
  RECEIPT_COUNTER: 'ngo_receipt_counter',
  NOTICES: 'ngo_notices',
  BILLS: 'ngo_bills',
};

// Receipt counter management
export const getReceiptCounter = (): number => {
  if (typeof window === 'undefined') return 1;
  const counter = localStorage.getItem(KEYS.RECEIPT_COUNTER);
  return counter ? parseInt(counter, 10) : 1;
};

export const incrementReceiptCounter = (): number => {
  const current = getReceiptCounter();
  const next = current + 1;
  localStorage.setItem(KEYS.RECEIPT_COUNTER, next.toString());
  return current;
};

// Notice storage (for future reference/editing)
export const saveNotice = (notice: any) => {
  const notices = getNotices();
  notices.push(notice);
  localStorage.setItem(KEYS.NOTICES, JSON.stringify(notices));
};

export const getNotices = (): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(KEYS.NOTICES);
  return data ? JSON.parse(data) : [];
};

// Bill storage
export const saveBill = (bill: any) => {
  const bills = getBills();
  bills.push(bill);
  localStorage.setItem(KEYS.BILLS, JSON.stringify(bills));
};

export const getBills = (): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(KEYS.BILLS);
  return data ? JSON.parse(data) : [];
};

/**
 * DATABASE MIGRATION EXAMPLE:
 * 
 * // Before (localStorage):
 * const counter = getReceiptCounter();
 * 
 * // After (Database API):
 * const counter = await getReceiptCounter();
 * 
 * // API Route Implementation (/app/api/storage/receipt-counter/route.ts):
 * export async function GET() {
 *   const counter = await db.counters.findUnique({ where: { type: 'receipt' } });
 *   return Response.json({ counter: counter?.value || 1 });
 * }
 * 
 * export async function POST() {
 *   const counter = await db.counters.update({
 *     where: { type: 'receipt' },
 *     data: { value: { increment: 1 } }
 *   });
 *   return Response.json({ counter: counter.value });
 * }
 */
