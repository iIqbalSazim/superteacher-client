import { getRequest, postRequest } from "@/Config/Axios/AxiosConfig";

export const getStreamPosts = async (classroom_id) => {
  return await getRequest(`stream?classroom_id=${classroom_id}`);
};

export const createPost = async (payload) => {
  return await postRequest("stream/message", payload);
};
