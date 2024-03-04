import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
  postRequestForCloudinary,
} from "@/Config/Axios/AxiosConfig";

export const getClassroomResources = async (classroom_id) => {
  return await getRequest(`classrooms/${classroom_id}/resources`);
};

export const createNewResource = async (classroom_id, resource) => {
  return await postRequest(`classrooms/${classroom_id}/resources`, resource);
};

export const updateResource = async (classroom_id, resource_id, resource) => {
  return await putRequest(
    `classrooms/${classroom_id}/resources/${resource_id}`,
    resource
  );
};

export const deleteResource = async (classroom_id, resource_id) => {
  return await deleteRequest(
    `classrooms/${classroom_id}/resources/${resource_id}`
  );
};

export const getExams = async (classroom_id) => {
  return await getRequest(`classrooms/${classroom_id}/exams`);
};

export const createNewExam = async (classroom_id, exam) => {
  return await postRequest(`classrooms/${classroom_id}/exams`, exam);
};

export const updateExam = async (classroom_id, exam_id, exam) => {
  return await putRequest(`classrooms/${classroom_id}/exams/${exam_id}`, exam);
};

export const deleteExam = async (classroom_id, exam_id) => {
  return await deleteRequest(`classrooms/${classroom_id}/exams/${exam_id}`);
};

export const getSubmissions = async (classroom_id, assignment_id) => {
  return await getRequest(
    `classrooms/${classroom_id}/assignments/${assignment_id}/submissions`
  );
};

export const createNewSubmission = async (
  classroom_id,
  assignment_id,
  submission
) => {
  return await postRequest(
    `classrooms/${classroom_id}/assignments/${assignment_id}/submissions`,
    submission
  );
};

export const deleteSubmission = async (
  classroom_id,
  assignment_id,
  submission_id
) => {
  return await deleteRequest(
    `classrooms/${classroom_id}/assignments/${assignment_id}/submissions/${submission_id}`
  );
};

export const generateUploadSignature = async () => {
  return await postRequest(`upload/signature`);
};

export const uploadFilePreSignedUrl = async (cloudName, formData) => {
  return await postRequestForCloudinary(cloudName, formData);
};
