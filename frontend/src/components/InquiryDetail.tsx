import React, { useEffect } from 'react';
import { useInquiryDetail } from '../hooks/useInquiry';

interface InquiryDetailProps {
  id: number;
  currentUserId?: number;
  onEdit: (id: number) => void;
  onBack: () => void;
  onDeleted: () => void;
}

export default function InquiryDetail({ id, currentUserId, onEdit, onBack, onDeleted }: InquiryDetailProps) {
  const { inquiry, isLoading, error, fetchInquiry, deleteInquiry } = useInquiryDetail();

  useEffect(() => {
    fetchInquiry(id);
  }, [id, fetchInquiry]);

  const handleDelete = async () => {
    const success = await deleteInquiry(id);
    if (success) onDeleted();
  };

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!inquiry) return null;

  const isAuthor = currentUserId === inquiry.author.id;

  return (
    <div className="inquiry-detail">
      <button onClick={onBack} className="btn-back">← 목록으로</button>
      <article>
        <h1>{inquiry.title}</h1>
        <div className="meta">
          <span className="author">{inquiry.author.name}</span>
          <span className="date">{new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}</span>
          {inquiry.updatedAt !== inquiry.createdAt && <span className="edited">(수정됨)</span>}
        </div>
        <div className="content">{inquiry.content}</div>
      </article>
      {isAuthor && (
        <div className="actions">
          <button onClick={() => onEdit(id)} className="btn-secondary">수정</button>
          <button onClick={handleDelete} className="btn-danger">삭제</button>
        </div>
      )}
    </div>
  );
}
