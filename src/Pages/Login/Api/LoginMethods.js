import { postRequest } from "@/Config/Axios/AxiosConfig";

export const loginUser = async (user) => {
  return await postRequest("login", user);
};

export const logoutUser = async (token) => {
  return await postRequest("logout", token);
};
