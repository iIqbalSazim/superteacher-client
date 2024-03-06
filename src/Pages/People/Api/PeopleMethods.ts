import {
  putRequest,
  getRequest,
  postRequest,
} from "@/Config/Axios/AxiosConfig";

export const getStudents = async (
  classroom_id: number,
  filter: "enrolled" | "unenrolled"
) => {
  return await getRequest(
    `classrooms/${classroom_id}/students?filter=${filter}`
  );
};

export const enrollStudent = async (
  classroom_id: number,
  studentId: { student_id: number }
) => {
  return await postRequest(
    `classrooms/${classroom_id}/students/enroll`,
    studentId
  );
};

export const removeStudentFromClassroom = async (
  classroom_id: number,
  studentId: { student_id: number }
) => {
  return await putRequest(
    `classrooms/${classroom_id}/students/remove`,
    studentId
  );
};
