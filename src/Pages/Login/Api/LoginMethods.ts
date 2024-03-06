import { postRequest, putRequest } from "@/Config/Axios/AxiosConfig";

import {
  LoginPayload,
  LogoutPayload,
  ResetPasswordPayload,
  ResetTokenPayload,
  TokenPayload,
  ValidateResetTokenPayload,
} from "./LoginMethodsTypes";

export const loginUser = async (user: LoginPayload) => {
  return await postRequest("login", user);
};

export const generateToken = async (token: TokenPayload) => {
  return await postRequest("oauth/token", token);
};

export const logoutUser = async (token: LogoutPayload) => {
  return await postRequest("oauth/revoke", token);
};

export const generateResetToken = async (payload: ResetTokenPayload) => {
  return await postRequest("passwords/forgot/token", payload);
};

export const validateResetToken = async (
  payload: ValidateResetTokenPayload
) => {
  return await postRequest("passwords/forgot/validate", payload);
};

export const resetForgotPassword = async (payload: ResetPasswordPayload) => {
  return await putRequest("passwords/forgot/reset", payload);
};
