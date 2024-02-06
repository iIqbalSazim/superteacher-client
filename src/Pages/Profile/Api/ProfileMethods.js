import { postRequest } from "@/Config/Axios/AxiosConfig";

export const updateUserProfile = async (id, userProfile) => {
  return await postRequest(`profiles/${id}`, userProfile);
};
