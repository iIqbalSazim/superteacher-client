import { postRequest } from "@/Config/Axios/AxiosConfig";

import { CreateUserParams } from "./RegistrationMethodsTypes";

export const createNewUser = async (user: CreateUserParams) => {
  return await postRequest("users", user);
};
