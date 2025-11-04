import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { User, LoginRequest, SignupRequest } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.getProfile()
        .then(user => setState({ user, isLoading: false, error: null }))
        .catch(() => {
          localStorage.removeItem('token');
          setState({ user: null, isLoading: false, error: null });
        });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await authApi.login(data);
      localStorage.setItem('token', response.token);
      setState({ user: response.user, isLoading: false, error: null });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.response?.data?.message || '로그인에 실패했습니다',
      }));
    }
  }, []);

  const signup = useCallback(async (data: SignupRequest) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authApi.signup(data);
      setState(prev => ({ ...prev, isLoading: false }));
      return true;
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.response?.data?.message || '회원가입에 실패했습니다',
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({ user: null, isLoading: false, error: null });
  }, []);

  return { ...state, login, signup, logout };
}
