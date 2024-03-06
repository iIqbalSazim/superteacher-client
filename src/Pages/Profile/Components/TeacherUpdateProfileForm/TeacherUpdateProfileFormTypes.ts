import { TeacherFormValues } from "@/Pages/Registration/Components/TeacherForm/TeacherFormTypes";
import { TeacherProfileType } from "@/Types/SharedTypes";

export interface TeacherProfileProps {
  profile: TeacherProfileType;
}

export interface TeacherProfileFormValues
  extends Omit<TeacherFormValues, "code" | "password" | "confirm_password"> {
  gender: string;
}
