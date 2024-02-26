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

export const generateResetToken = async (payload) => {
  return await postRequest("passwords/forgot/token", payload);
};

export const validateResetToken = async (payload) => {
  return await postRequest("passwords/forgot/validate", payload);
};

export const resetForgotPassword = async (payload) => {
  return await putRequest("passwords/forgot/reset", payload);
};
