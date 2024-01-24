import { getRequest, postRequest } from "@/Config/Axios/AxiosConfig";

export const getStudentProfile = async (id) => {
  return await getRequest(`profile/student?id=${id}`);
};

export const getTeacherProfile = async (id) => {
  return await getRequest(`profile/teacher?id=${id}`);
};

export const updateTeacherProfile = async (id, teacherProfile) => {
  return await postRequest(`profile/teacher/${id}`, teacherProfile);
};

export const updateStudentProfile = async (id, studentProfile) => {
  return await postRequest(`profile/student/${id}`, studentProfile);
};
