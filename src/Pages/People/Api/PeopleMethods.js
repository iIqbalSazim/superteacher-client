import {
  putRequest,
  getRequest,
  postRequest,
} from "@/Config/Axios/AxiosConfig";

export const getStudents = async (classroom_id, filter) => {
  return await getRequest(
    `classrooms/${classroom_id}/students?filter=${filter}`
  );
};

export const enrollStudent = async (classroom_id, classroom_student) => {
  return await postRequest(
    `classrooms/${classroom_id}/students/enroll`,
    classroom_student
  );
};

export const removeStudentFromClassroom = async (
  classroom_id,
  classroom_student
) => {
  return await putRequest(
    `classrooms/${classroom_id}/students/remove`,
    classroom_student
  );
};
