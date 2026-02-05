export interface IPostCategory {
  id: string;
  name: string;
  slug: string;
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export interface IPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: IPostCategory;
  subcategory: IPostCategory;
  author: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
  trending?: boolean;
  hotTopic?: boolean;
  status: PostStatus;
  tags: string[];
  source?: {
    name: string;
    url: string;
  }
}

export type TPosts = IPost[]