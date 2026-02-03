export interface Notice {
  id: string;
  date: string;
  noticeNumber: string;
  content: string;
  createdAt: string;
}

export interface Bill {
  id: string;
  receiptNumber: string;
  name: string;
  amount: number;
  receivedBy: string;
  date: string;
  createdAt: string;
}

export interface EmailPayload {
  type: 'notice' | 'bill';
  data: Notice | Bill;
  generatedBy?: string;
}
