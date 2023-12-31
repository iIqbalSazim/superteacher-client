import { getRequest, postRequest } from "@/Config/Axios/AxiosConfig";

export const getClassroomCards = async () => {
  return await getRequest("classrooms");
};

export const createClassroom = async (classrooms) => {
  return await postRequest("classrooms", classrooms);
};
