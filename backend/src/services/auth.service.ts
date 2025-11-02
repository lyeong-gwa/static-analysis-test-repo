import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

export class AuthService {
  async signup(email: string, password: string, name: string): Promise<Omit<User, 'password'>> {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      throw new Error('이미 사용 중인 이메일입니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
      [email, hashedPassword, name]
    );

    return result.rows[0];
  }

  async login(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      throw new Error('존재하지 않는 계정입니다');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('비밀번호가 일치하지 않습니다');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}
