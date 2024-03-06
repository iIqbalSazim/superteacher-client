import { User } from "@/Types/SharedTypes";

export interface UserForAuthSlice extends Omit<User, "id"> {
  id?: number;
}

export interface AuthState {
  user: UserForAuthSlice | null;
}
