import { StudentFormValues } from "@/Pages/Registration/Components/StudentForm/StudentFormTypes";
import { StudentProfileType } from "@/Types/SharedTypes";

export interface StudentProfileProps {
  profile: StudentProfileType;
}

export interface StudentProfileFormValues
  extends Omit<
    StudentFormValues,
    "password" | "confirm_password" | "phone_number"
  > {
  phone_number?: string;
}
