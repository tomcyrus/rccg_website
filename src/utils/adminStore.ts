import { api } from './api';

export const addLivePrayerRequest = (data: { name: string; email: string; phone?: string; category: string; requestText: string; isConfidential: boolean }) =>
  api('/public/prayers', { method: 'POST', body: JSON.stringify(data) });

export const addLiveVisitorInquiry = (data: { fullName: string; email: string; phone?: string; inquiryType: string; message: string }) =>
  api('/public/inquiries', { method: 'POST', body: JSON.stringify(data) });
