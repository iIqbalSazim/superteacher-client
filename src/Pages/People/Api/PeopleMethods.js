import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/Config/Axios/AxiosConfig";

export const getClassroomStudents = async (classroom_id) => {
  return await getRequest(`students?classroom_id=${classroom_id}`);
};

export const enrollStudent = async (ids) => {
  return await postRequest("enroll", ids);
};

export const getAllNotEnrolledStudents = async (classroom_id) => {
  return await getRequest(`users/students?classroom_id=${classroom_id}`);
};

export const removeStudentFromClassroom = async (classroom_student) => {
  return await deleteRequest("classrooms/students", classroom_student);
};
