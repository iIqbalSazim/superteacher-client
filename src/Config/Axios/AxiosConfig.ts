import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 404) {
        return Promise.reject({ message: "404 Not Found" });
      }

      if (response.status === 500) {
        return Promise.reject({ message: "Something went wrong" });
      }

      return Promise.reject(response);
    }

    if (error.message === "Network Error") {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }

    if (error.message === "timeout of 5000ms exceeded") {
      return Promise.reject({
        message: "Request timed out. Please try again.",
      });
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "The request was aborted. Please try again.",
      });
    }

    return Promise.reject({ message: "Something went wrong!" });
  }
);

export async function getRequest(URL: string): Promise<AxiosResponse> {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export async function postRequest(
  URL: string,
  payload?: object
): Promise<AxiosResponse> {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export async function putRequest(
  URL: string,
  payload: object
): Promise<AxiosResponse> {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export async function deleteRequest(
  URL: string,
  payload?: object
): Promise<AxiosResponse> {
  return axiosClient
    .delete(`/${URL}`, { data: payload })
    .then((response) => response);
}

export async function postRequestForCloudinary(
  cloudName: string,
  payload: FormData
): Promise<AxiosResponse> {
  return axios
    .post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => response);
}
