import { useState, useCallback } from 'react';
import { inquiryApi } from '../api/inquiry';
import { Inquiry } from '../types';

interface InquiryListState {
  inquiries: Inquiry[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

export function useInquiryList() {
  const [state, setState] = useState<InquiryListState>({
    inquiries: [],
    total: 0,
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
  });

  const fetchInquiries = useCallback(async (page = 1) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await inquiryApi.getAll(page);
      setState({
        inquiries: result.data,
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: '문의글 목록을 불러오는데 실패했습니다',
      }));
    }
  }, []);

  return { ...state, fetchInquiries };
}

export function useInquiryDetail() {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiry = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await inquiryApi.getById(id);
      setInquiry(data);
    } catch {
      setError('문의글을 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteInquiry = useCallback(async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return false;
    try {
      await inquiryApi.delete(id);
      return true;
    } catch {
      setError('삭제에 실패했습니다');
      return false;
    }
  }, []);

  return { inquiry, isLoading, error, fetchInquiry, deleteInquiry };
}
