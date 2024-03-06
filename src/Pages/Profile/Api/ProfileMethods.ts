import { putRequest } from "@/Config/Axios/AxiosConfig";

import { StudentProfileFormValues } from "../Components/StudentUpdateProfileForm/StudentUpdateProfileFormTypes";
import { TeacherProfileFormValues } from "../Components/TeacherUpdateProfileForm/TeacherUpdateProfileFormTypes";

export const updateUserProfile = async (
  id: number,
  userProfile: StudentProfileFormValues | TeacherProfileFormValues
) => {
  return await putRequest(`profiles/${id}`, userProfile);
};

export const resetPassword = async (passwords: {
  old_password: string;
  new_password: string;
}) => {
  return await putRequest("passwords/reset", passwords);
};
