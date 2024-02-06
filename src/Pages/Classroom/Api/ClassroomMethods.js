import { getRequest } from "@/Config/Axios/AxiosConfig";

export const fetchClassroom = async (classroom_id) => {
  return await getRequest(`classrooms/${classroom_id}`);
};
