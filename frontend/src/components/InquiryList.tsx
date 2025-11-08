import React, { useEffect } from 'react';
import { useInquiryList } from '../hooks/useInquiry';

interface InquiryListProps {
  onSelect: (id: number) => void;
  onNew: () => void;
}

export default function InquiryList({ onSelect, onNew }: InquiryListProps) {
  const { inquiries, page, totalPages, isLoading, error, fetchInquiries } = useInquiryList();

  useEffect(() => {
    fetchInquiries(1);
  }, [fetchInquiries]);

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="inquiry-list">
      <div className="list-header">
        <h2>문의글 목록</h2>
        <button onClick={onNew} className="btn-primary">새 문의 작성</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(inquiry => (
            <tr key={inquiry.id} onClick={() => onSelect(inquiry.id)} className="clickable">
              <td>{inquiry.id}</td>
              <td>{inquiry.title}</td>
              <td>{inquiry.author.name}</td>
              <td>{new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {inquiries.length === 0 && <p className="empty-message">등록된 문의글이 없습니다.</p>}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => fetchInquiries(page - 1)}>이전</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => fetchInquiries(page + 1)}>다음</button>
      </div>
    </div>
  );
}
