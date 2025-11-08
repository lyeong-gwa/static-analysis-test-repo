import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService = new AuthService();

  signup = async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;
      const user = await this.authService.signup(email, password, name);
      res.status(201).json({ message: '회원가입 성공', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };
}
