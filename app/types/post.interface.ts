import type { Category } from "./category.interface";

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  subcategory: Category;
  author: Author;
  date: string;
  readTime: string;
  image: string;
  views: number;
  trending?: boolean;
  hotTopic?: boolean;
  status: PostStatus;
  tags: string[];
  externalUrl?: string;
  videoThumbnail?: string;
}

export type Posts = Post[]