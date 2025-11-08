import apiClient from './client';
import { Inquiry } from '../types';

interface PaginatedResponse {
  data: Inquiry[];
  total: number;
  page: number;
  totalPages: number;
}

interface CreateInquiryRequest {
  title: string;
  content: string;
}

export const inquiryApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse> => {
    const response = await apiClient.get('/api/inquiries', {
      params: { page, limit },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Inquiry> => {
    const response = await apiClient.get(`/api/inquiries/${id}`);
    return response.data;
  },

  create: async (data: CreateInquiryRequest): Promise<Inquiry> => {
    const response = await apiClient.post('/api/inquiries', data);
    return response.data;
  },

  update: async (id: number, data: CreateInquiryRequest): Promise<Inquiry> => {
    const response = await apiClient.put(`/api/inquiries/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/inquiries/${id}`);
  },
};
