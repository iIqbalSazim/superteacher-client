import { getRequest } from "@/Config/Axios/AxiosConfig";

export const fetchClassroom = async (classroomId: number) => {
  return await getRequest(`classrooms/${classroomId}`);
};
