import pool from '../config/database';
import { Inquiry } from '../types';

interface PaginatedResult {
  data: Inquiry[];
  total: number;
  page: number;
  totalPages: number;
}

export class InquiryService {
  async getAll(page: number, limit: number): Promise<PaginatedResult> {
    const offset = (page - 1) * limit;

    const countResult = await pool.query('SELECT COUNT(*) FROM inquiries');
    const total = parseInt(countResult.rows[0].count);

    const result = await pool.query(
      `SELECT i.*, u.name as author_name, u.email as author_email
       FROM inquiries i
       JOIN users u ON i.author_id = u.id
       ORDER BY i.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return {
      data: result.rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: number): Promise<Inquiry | null> {
    const result = await pool.query(
      `SELECT i.*, u.name as author_name, u.email as author_email
       FROM inquiries i
       JOIN users u ON i.author_id = u.id
       WHERE i.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async create(title: string, content: string, authorId: number): Promise<Inquiry> {
    const result = await pool.query(
      'INSERT INTO inquiries (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, authorId]
    );
    return result.rows[0];
  }

  async update(id: number, title: string, content: string, userId: number): Promise<Inquiry> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('문의글을 찾을 수 없습니다');
    }
    if (existing.author_id !== userId) {
      throw new Error('권한이 없습니다');
    }

    const result = await pool.query(
      'UPDATE inquiries SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    return result.rows[0];
  }

  async delete(id: number, userId: number): Promise<void> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('문의글을 찾을 수 없습니다');
    }
    if (existing.author_id !== userId) {
      throw new Error('권한이 없습니다');
    }

    await pool.query('DELETE FROM inquiries WHERE id = $1', [id]);
  }
}
