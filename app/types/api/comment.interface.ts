import type { BaseItem } from "./api-response.interface";

export interface CommentAuthor {
  id: string;
  name: string;
  avatar: string | null
}
export interface CommentWebsiteData extends BaseItem {
  content: string;
  author: CommentAuthor;
}

