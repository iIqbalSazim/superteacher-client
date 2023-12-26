import { postRequest } from "../../../Config/Axios/AxiosConfig";

export const createNewUser = async (user) => {
  return await postRequest("users", user);
};
