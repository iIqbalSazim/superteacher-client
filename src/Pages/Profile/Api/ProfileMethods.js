import { postRequest } from "@/Config/Axios/AxiosConfig";

export const updateTeacherProfile = async (id, teacherProfile) => {
  return await postRequest(`profile/teacher/${id}`, teacherProfile);
};

export const updateStudentProfile = async (id, studentProfile) => {
  return await postRequest(`profile/student/${id}`, studentProfile);
};
