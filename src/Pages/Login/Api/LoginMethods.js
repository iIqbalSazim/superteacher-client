import { postRequest } from "../../../Config/Axios/AxiosConfig";

export const loginUser = async (user) => {
  return await postRequest("login", user);
};
