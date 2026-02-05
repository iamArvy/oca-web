export interface Comment {
  id: string;
  postId: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  likes: number;
  likedByUser: boolean;
  replies?: Comment[];
  parentId?: string;
}

export type Comments = Comment[];