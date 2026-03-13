import type { BaseItem } from "./api-response.interface";
import type { User } from "./user.interface";

export interface Comment extends BaseItem {
  content: string;
  author: User;
}

export type Comments = Comment[];
