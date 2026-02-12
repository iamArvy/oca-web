import type { Category } from "./category.interface";

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum PostType {
  ARTICLE = 'article',
  VIDEO = 'video',
  AUDIO= 'audio',
  EMBEDDED = 'embedded'
}

export interface Author {
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
  type: PostType;
  category: Category;
  subcategory: Category;
  author: Author;
  date: string;
  image: string;
  trending?: boolean;
  hotTopic?: boolean;
  tags: string[];
  externalUrl?: string;
}

export type Posts = Post[]