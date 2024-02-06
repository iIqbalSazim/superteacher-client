import {
  getRequest,
  postRequestWithCustomHeaders,
  postRequest,
} from "@/Config/Axios/AxiosConfig";

export const getClassroomResources = async (classroom_id) => {
  return await getRequest(`classrooms/${classroom_id}/resources`);
};

export const createNewResource = async (classroom_id, resource) => {
  return await postRequest(`classrooms/${classroom_id}/resources`, resource);
};

export const uploadFile = async (formData) => {
  const customHeaders = {
    "Content-Type": "multipart/form-data",
  };

  return await postRequestWithCustomHeaders(
    "cloudinary/upload",
    formData,
    customHeaders
  );
};
