import { User } from "@/Types/SharedTypes";

export interface PostType {
  id: number;
  classroom_id: number;
  text: string;
  created_at: string;
  user: User;
}

export interface PostParams {
  post: PostType;
}
