import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function SignupForm() {
  const { signup, error, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (formData.password !== formData.passwordConfirm) {
      setLocalError('비밀번호가 일치하지 않습니다');
      return;
    }

    if (formData.password.length < 8) {
      setLocalError('비밀번호는 8자 이상이어야 합니다');
      return;
    }

    const success = await signup({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });

    if (success) {
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="이름을 입력하세요" required />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">이메일</label>
          <input id="signup-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="이메일을 입력하세요" required />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">비밀번호</label>
          <input id="signup-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="8자 이상 입력하세요" required />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input id="passwordConfirm" name="passwordConfirm" type="password" value={formData.passwordConfirm} onChange={handleChange} placeholder="비밀번호를 다시 입력하세요" required />
        </div>
        {(localError || error) && <p className="error-message">{localError || error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? '가입 중...' : '회원가입'}
        </button>
      </form>
    </div>
  );
}
