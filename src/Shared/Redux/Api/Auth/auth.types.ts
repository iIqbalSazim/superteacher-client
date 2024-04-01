import { User } from "@/Types/SharedTypes";

export type TLoginRequestFields = {
  email: string;
  password: string;
};

export type TAuthResponse = {
  user: User;
};

export type TTokenRequestFields = {
  grant_type: string;
  email: string;
  password: string;
};

export type TTokenResponse = {
  access_token: string;
};

export type TCreateUserParams = {
  email: string;
  password: string;
  gender: string;
  first_name: string;
  last_name: string;
  address?: string;
  phone_number?: string;
  education?: {
    level?: string;
    english_bangla_medium?: string;
    class_level?: string;
    degree_level?: string;
    semester_year?: string;
  };
  role: string;
  code?: string;
};

export type TLogoutPayload = {
  token: string;
};
