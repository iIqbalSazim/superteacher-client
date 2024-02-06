import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/Config/Axios/AxiosConfig";

export const getStreamPosts = async (classroom_id) => {
  return await getRequest(`classrooms/${classroom_id}/messages`);
};

export const createPost = async (classroom_id, post) => {
  return await postRequest(`classrooms/${classroom_id}/messages`, post);
};

export const updateClassroomApi = async (id, updatedClassroom) => {
  return await putRequest(`classrooms/${id}`, updatedClassroom);
};

export const deleteClassroom = async (id) => {
  return await deleteRequest(`classrooms/${id}`);
};
