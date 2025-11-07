import { Request, Response, NextFunction } from 'express';

export const validateInquiry = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  const errors: string[] = [];

  if (!title || title.trim().length < 2) {
    errors.push('제목은 2자 이상이어야 합니다');
  }

  if (title && title.length > 100) {
    errors.push('제목은 100자 이하여야 합니다');
  }

  if (!content || content.trim().length < 10) {
    errors.push('내용은 10자 이상이어야 합니다');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: '유효성 검사 실패', errors });
  }

  next();
};
