import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/Config/Axios/AxiosConfig";

export const getStreamPosts = async (classroom_id) => {
  return await getRequest(`stream?classroom_id=${classroom_id}`);
};

export const createPost = async (post) => {
  return await postRequest("stream/message", post);
};

export const updateClassroomApi = async (id, updatedClassroom) => {
  return await putRequest(`classrooms/${id}`, updatedClassroom);
};

export const deleteClassroom = async (id) => {
  return await deleteRequest(`classrooms/${id}`);
};
