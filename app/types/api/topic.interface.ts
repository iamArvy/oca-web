import type { BaseItem } from "./api-response.interface";
import type { PostWebsiteData } from "./post.interface";

export interface Topic extends BaseItem {
  name: string;
  slug: string;
  parent: Topic | null;
  children: Topic[];
  isFeatured: boolean;
  keywords: string[] | null;
}

export interface TopicPosts extends BaseItem {
  name: string;
  slug: string;
  posts: PostWebsiteData[]
}