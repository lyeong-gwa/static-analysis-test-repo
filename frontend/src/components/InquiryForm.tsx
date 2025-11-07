import React, { useState, useEffect } from 'react';
import { inquiryApi } from '../api/inquiry';

interface InquiryFormProps {
  editId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InquiryForm({ editId, onSuccess, onCancel }: InquiryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editId) {
      inquiryApi.getById(editId).then(inquiry => {
        setTitle(inquiry.title);
        setContent(inquiry.content);
      });
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (title.trim().length < 2) {
      setError('제목은 2자 이상이어야 합니다');
      return;
    }
    if (content.trim().length < 10) {
      setError('내용은 10자 이상이어야 합니다');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editId) {
        await inquiryApi.update(editId, { title, content });
      } else {
        await inquiryApi.create({ title, content });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || '저장에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="inquiry-form">
      <h2>{editId ? '문의글 수정' : '새 문의 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="제목을 입력하세요" maxLength={100} required />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder="문의 내용을 입력하세요 (10자 이상)" rows={10} required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">취소</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? '저장 중...' : (editId ? '수정' : '등록')}
          </button>
        </div>
      </form>
    </div>
  );
}
