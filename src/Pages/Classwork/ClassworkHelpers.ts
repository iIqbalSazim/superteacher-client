import {
  generateUploadSignature,
  uploadFilePreSignedUrl,
} from "./Api/ClassworkMethods";
import { ExamType, UploadedResource } from "./ClassworkTypes";

export function formatDate(value: string | number | Date) {
  const date = new Date(value);
  return date.toDateString().slice(4, 15);
}

export function removeTimeFromDate(value: string | Date | number) {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function sortUploadedResourcesByDate(array: UploadedResource[]) {
  return array.sort(
    (a, b) =>
      new Date(a.due_date as string | number).getTime() -
      new Date(b.due_date as string | number).getTime()
  );
}
export function sortExamsByDate(array: ExamType[]) {
  return array.sort(
    (a, b) =>
      new Date(a.date as string | number).getTime() -
      new Date(b.date as string | number).getTime()
  );
}

export function filterByResourceType(
  resources: UploadedResource[],
  resourceType: "assignment" | "material"
) {
  return resources.filter(
    (resource) => resource.resource_type === resourceType
  );
}

export function generateMaterials(resources: UploadedResource[]) {
  const materials = filterByResourceType(resources, "material");

  return materials;
}

export function generateAssignments(resources: UploadedResource[]) {
  const assignments = filterByResourceType(resources, "assignment");

  return sortUploadedResourcesByDate(assignments);
}

export function filterScheduledExams(exams: ExamType[]) {
  const currentDate = removeTimeFromDate(Date.now());
  return exams.filter((exam) => {
    const examDate = removeTimeFromDate(exam.date);
    return examDate >= currentDate;
  });
}

export function filterFinishedExams(exams: ExamType[]) {
  const currentDate = removeTimeFromDate(Date.now());
  return exams.filter((exam) => {
    const examDate = removeTimeFromDate(exam.date);
    return examDate < currentDate;
  });
}

export async function handleFileUpload(file: File) {
  const res = await generateUploadSignature();
  const { signature, timestamp } = res.data.sign_data;
  const apiKey = res.data.sign_data.api_key;
  const cloudName = res.data.sign_data.cloud_name;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const fileUploadResponse = await uploadFilePreSignedUrl(cloudName, formData);

  return fileUploadResponse.data.secure_url;
}
