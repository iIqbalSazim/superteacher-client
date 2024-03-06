import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
  postRequestForCloudinary,
} from "@/Config/Axios/AxiosConfig";

import { ExamType, Submission, UploadedResource } from "../ClassworkTypes";

export const getClassroomResources = async (classroom_id: number) => {
  return await getRequest(`classrooms/${classroom_id}/resources`);
};

export const createNewResource = async (
  classroom_id: number,
  resource: { resource: Partial<UploadedResource> }
) => {
  return await postRequest(`classrooms/${classroom_id}/resources`, resource);
};

export const updateResource = async (
  classroom_id: number,
  resource_id: number,
  resource: { resource: Partial<UploadedResource> }
) => {
  return await putRequest(
    `classrooms/${classroom_id}/resources/${resource_id}`,
    resource
  );
};

export const deleteResource = async (
  classroom_id: number,
  resource_id: number
) => {
  return await deleteRequest(
    `classrooms/${classroom_id}/resources/${resource_id}`
  );
};

export const getExams = async (classroom_id: number) => {
  return await getRequest(`classrooms/${classroom_id}/exams`);
};

export const createNewExam = async (
  classroom_id: number,
  exam: { exam: Partial<ExamType> }
) => {
  return await postRequest(`classrooms/${classroom_id}/exams`, exam);
};

export const updateExam = async (
  classroom_id: number,
  exam_id: number,
  exam: { exam: Partial<ExamType> }
) => {
  return await putRequest(`classrooms/${classroom_id}/exams/${exam_id}`, exam);
};

export const deleteExam = async (classroom_id: number, exam_id: number) => {
  return await deleteRequest(`classrooms/${classroom_id}/exams/${exam_id}`);
};

export const getSubmissions = async (
  classroom_id: number,
  assignment_id: number
) => {
  return await getRequest(
    `classrooms/${classroom_id}/assignments/${assignment_id}/submissions`
  );
};

export const createNewSubmission = async (
  classroom_id: number,
  assignment_id: number,
  submission: { submission: Partial<Submission> }
) => {
  return await postRequest(
    `classrooms/${classroom_id}/assignments/${assignment_id}/submissions`,
    submission
  );
};

export const deleteSubmission = async (
  classroom_id: number,
  assignment_id: number,
  submission_id: number
) => {
  return await deleteRequest(
    `classrooms/${classroom_id}/assignments/${assignment_id}/submissions/${submission_id}`
  );
};

export const generateUploadSignature = async () => {
  return await postRequest(`upload/signature`);
};

export const uploadFilePreSignedUrl = async (
  cloudName: string,
  formData: FormData
) => {
  return await postRequestForCloudinary(cloudName, formData);
};
