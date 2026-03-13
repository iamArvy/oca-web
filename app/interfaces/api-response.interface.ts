import type { User } from "./user.interface";

export interface ApiResponse<D> {
  status_code: number;
  message: string | null;
  data?: D;
}

export interface PaginationMeta {
  total: number;
  limit?: number;
  page?: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
}

export interface ApiListResponse<D> extends ApiResponse<D> {
  meta: PaginationMeta;
}

export interface BaseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Token {
  token: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  token: Token
}