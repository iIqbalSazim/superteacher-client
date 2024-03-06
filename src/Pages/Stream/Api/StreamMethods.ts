import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/Config/Axios/AxiosConfig";

import { ClassroomFormValues } from "@/Types/SharedTypes";

import { PostType } from "../Components/Post/PostTypes";

interface CreatePostType extends Omit<PostType, "id" | "created_at" | "user"> {
  user_id?: number;
}

export const getStreamPosts = async (classroomId: number) => {
  return await getRequest(`classrooms/${classroomId}/messages`);
};

export const createPost = async (
  classroom_id: number,
  post: CreatePostType
) => {
  return await postRequest(`classrooms/${classroom_id}/messages`, post);
};

export const updateClassroomApi = async (
  id: number,
  updatedClassroom: ClassroomFormValues
) => {
  return await putRequest(`classrooms/${id}`, updatedClassroom);
};

export const deleteClassroom = async (id: number) => {
  return await deleteRequest(`classrooms/${id}`);
};
