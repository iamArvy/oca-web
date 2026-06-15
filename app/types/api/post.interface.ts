import type { BaseItem } from "./api-response.interface";
import type { Topic } from "./topic.interface";
import type { Collection } from "./collection.interface";

export enum PostType {
  ARTICLE = "article",
  VIDEO = "video",
  AUDIO = "audio",
  EMBED = "embed",
}

export const PostTypeOptions = Object.values(PostType);

export interface IAuthor {
  name: string;
  url: string;
}

export interface PostFeed {
  id: string;
  image: string | null;
  name: string;
  slug: string;
}

export interface PostAuthor {
  id: string;
  name: string;
  avatar: string | null
}

export interface PostAdminData extends BaseItem {
  title: string;
  excerpt: string | null;
  content: string;
  topic: Topic;
  slug: string;
  type: PostType;
  tags: string[];
  image: string | null;
  author: PostAuthor | null;
  feed: PostFeed | null;
  views: number;
  readTime: number;
  externalSourceUrl: string | null;
}

export interface PostWebsiteData extends BaseItem {
  title: string;
  excerpt: string | null;
  content: string;
  topic: Topic;
  slug: string;
  type: PostType;
  tags: string[];
  image: string | null;
  author: PostAuthor | null;
  feed: PostFeed | null;
  views: number;
  readTime: number;
  externalSourceUrl: string | null;
}

export interface PostWebsiteListData extends BaseItem {
  title: string;
  topic: Topic;
  slug: string;
  type: PostType;
  image: string | null;
  author: PostAuthor | null;
  feed: PostFeed | null;
  views: number;
}

export enum SortPostOptions {
  VIEWS = 'views',
}