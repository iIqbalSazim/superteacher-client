import { postRequest } from "@/Config/Axios/AxiosConfig";

import { LogoutPayload } from "./LoginMethodsTypes";

export const logoutUser = async (token: LogoutPayload) => {
  return await postRequest("oauth/revoke", token);
};
