import { Request, Response, NextFunction } from 'express';

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;
  const errors: string[] = [];

  if (!email || !email.includes('@')) {
    errors.push('유효한 이메일을 입력해주세요');
  }

  if (!password || password.length < 8) {
    errors.push('비밀번호는 8자 이상이어야 합니다');
  }

  if (!name || name.trim().length < 2) {
    errors.push('이름은 2자 이상이어야 합니다');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: '유효성 검사 실패', errors });
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 비밀번호를 입력해주세요' });
  }

  next();
};
