import { putRequest } from "@/Config/Axios/AxiosConfig";

export const updateUserProfile = async (id, userProfile) => {
  return await putRequest(`profiles/${id}`, userProfile);
};

export const resetPassword = async (passwords) => {
  return await putRequest("passwords/reset", passwords);
};
