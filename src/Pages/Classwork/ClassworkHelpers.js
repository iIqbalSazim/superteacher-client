import {
  generateUploadSignature,
  uploadFilePreSignedUrl,
} from "./Api/ClassworkMethods";

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString().slice(4, 15);
}

export function removeTimeFromDate(dateString) {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function sortByDate(array, dateKey) {
  return array.sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
}

export function filterByResourceType(resources, resourceType) {
  return resources.filter(
    (resource) => resource.resource_type === resourceType
  );
}

export function generateMaterials(resources) {
  const materials = filterByResourceType(resources, "material");

  return materials;
}

export function generateAssignments(resources) {
  const assignments = filterByResourceType(resources, "assignment");

  return sortByDate(assignments, "due_date");
}

export function filterScheduledExams(exams) {
  const currentDate = removeTimeFromDate(Date.now());
  return exams.filter((exam) => {
    const examDate = removeTimeFromDate(exam.date);
    return examDate >= currentDate;
  });
}

export function filterFinishedExams(exams) {
  const currentDate = removeTimeFromDate(Date.now());
  return exams.filter((exam) => {
    const examDate = removeTimeFromDate(exam.date);
    return examDate < currentDate;
  });
}

export async function handleFileUpload(file) {
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
