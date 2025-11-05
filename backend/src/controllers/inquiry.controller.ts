import { Request, Response } from 'express';
import { InquiryService } from '../services/inquiry.service';

interface AuthRequest extends Request {
  userId?: number;
}

export class InquiryController {
  private inquiryService = new InquiryService();

  getAll = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.inquiryService.getAll(page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: '문의글 목록 조회 실패' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const inquiry = await this.inquiryService.getById(id);
      if (!inquiry) {
        return res.status(404).json({ message: '문의글을 찾을 수 없습니다' });
      }
      res.json(inquiry);
    } catch (error: any) {
      res.status(500).json({ message: '문의글 조회 실패' });
    }
  };

  create = async (req: AuthRequest, res: Response) => {
    try {
      const { title, content } = req.body;
      const inquiry = await this.inquiryService.create(title, content, req.userId!);
      res.status(201).json(inquiry);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { title, content } = req.body;
      const inquiry = await this.inquiryService.update(id, title, content, req.userId!);
      res.json(inquiry);
    } catch (error: any) {
      if (error.message === '권한이 없습니다') {
        return res.status(403).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this.inquiryService.delete(id, req.userId!);
      res.json({ message: '문의글이 삭제되었습니다' });
    } catch (error: any) {
      if (error.message === '권한이 없습니다') {
        return res.status(403).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  };
}
