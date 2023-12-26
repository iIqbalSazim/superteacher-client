import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3000/api/v1";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.timeout = 5000;

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

export async function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export async function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}
