import { postRequest } from "../../../Config/Axios/AxiosConfig";

export const createNewUser = async (user) => {
  return await postRequest("users", user);
};

export const validateRegistrationCode = async (code) => {
  return await postRequest("code", code);
};
