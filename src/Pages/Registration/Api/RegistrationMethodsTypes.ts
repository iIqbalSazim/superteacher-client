import { Education } from "@/Types/SharedTypes";

export interface CreateUserParams {
  role: "teacher" | "student";
  code?: string;
  email: string;
  password: string;
  major_subject?: string;
  highest_education_level?: string;
  subjects_to_teach?: string[];
  gender: string;
  education?: Education;
  address?: string;
  phone_number?: string;
  first_name: string;
  last_name: string;
}
