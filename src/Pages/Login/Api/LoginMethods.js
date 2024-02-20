import { postRequest, putRequest } from "@/Config/Axios/AxiosConfig";

export const loginUser = async (user) => {
  return await postRequest("login", user);
};

export const generateToken = async (user) => {
  return await postRequest("oauth/token", user);
};

export const logoutUser = async (token) => {
  return await postRequest("oauth/revoke", token);
};

export const forgotPassword = async (payload) => {
  return await putRequest("passwords/forgot", payload);
};
