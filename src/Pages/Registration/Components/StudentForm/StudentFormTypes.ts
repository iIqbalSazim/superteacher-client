import { Education } from "@/Types/SharedTypes";

export interface StudentFormValues {
  email: string;
  password: string;
  confirm_password: string;
  address: string;
  education: Education;
  gender: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}
