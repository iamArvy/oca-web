import type { BaseItem } from "./api-response.interface";
import type { Posts } from "./post.interface";

export interface Topic extends BaseItem {
  name: string;
  slug: string;
  parent?: Topic | null;
  children?: Topic[] | [];
  isFeatured: boolean;
}

export type Topics = Topic[];

export interface TopicPosts extends Topic {
  posts: Posts
}

export type TopicPostsArray = TopicPosts[];
