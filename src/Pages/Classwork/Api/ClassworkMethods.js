import {
  getRequest,
  postRequestWithCustomHeaders,
  postRequest,
} from "@/Config/Axios/AxiosConfig";

export const getClassroomResources = async (classroom_id) => {
  return await getRequest(`resources?classroom_id=${classroom_id}`);
};

export const createNewResource = async (resource) => {
  return await postRequest("resources", resource);
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
