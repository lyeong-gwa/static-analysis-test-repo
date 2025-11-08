export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: Date;
}

export interface Inquiry {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}
