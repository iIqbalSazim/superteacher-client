import { getRequest, postRequest } from "@/Config/Axios/AxiosConfig";
import { ClassroomFormValues } from "@/Types/SharedTypes";

export const fetchClassrooms = async () => {
  return await getRequest("classrooms");
};

export const createClassroom = async (classroom: {
  classroom: ClassroomFormValues;
}) => {
  return await postRequest("classrooms", classroom);
};
