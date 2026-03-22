import type {  PostType } from "~/enums";
import type { BaseItem } from "./api-response.interface";
import type { Topic } from "./topic.interface";

export interface IAuthor {
  name: string;
  url: string;
}

export interface Post extends BaseItem {
  title: string;
  excerpt?: string | null;
  content: string;
  topic: Topic;
  slug: string;
  type: PostType;
  tags: string[];
  image?: string;
  author: IAuthor;
  views: number;
  readTime: number;
  externalSourceUrl?: string | null
}

export type Posts = Post[];
