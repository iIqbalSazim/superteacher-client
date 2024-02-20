import { postRequest, putRequest } from "@/Config/Axios/AxiosConfig";

export const updateUserProfile = async (id, userProfile) => {
  return await postRequest(`profiles/${id}`, userProfile);
};

export const resetPassword = async (passwords) => {
  return await putRequest("passwords/reset", passwords);
};
