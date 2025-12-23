import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "axios";
import toast from "react-hot-toast";

export const axiosApiInstance = axios.create();

// axiosApiInstance.interceptors.request.use(
//   (config) => {

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//       // console.log("Authorization header set:", config.headers["Authorization"]);
//     } else {
//       console.warn("No token found in cookies.");
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

axiosApiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // No Response (network error)
    if (!error.response) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        toast.error("خطا در تلاش برای ارتباط مجدد با سرور");
        return axiosApiInstance(originalRequest);
      }
      toast.error("خطای سرور. لطفاً بعداً دوباره تلاش کنید.");
      return;
    }

    const { status } = error.response;

    switch (status) {
      case 401:
        if (!originalRequest._retry) {
          console.log("warning", "دسترسی غیرمجاز!!");
        }
        break;
      case 400:
        console.log("warning", "لطفاً بعداً دوباره تلاش کنید.");
        break;
      case 403:
        console.log("warning", "دسترسی ممنوع !!.");
        break;
      case 404:
        console.log("warning", "سرور پیدا نشد");
        break;
      case 406:
        console.log("error", "دسترسی ممنوع !!.");
        break;
      case 500:
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          return axiosApiInstance(originalRequest);
        }
        console.log("warning", "خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.");
        break;
      default:
        if (status > 500 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axiosApiInstance(originalRequest);
        }
        console.log("warning", "خطای سرور. لطفاً بعداً دوباره تلاش کنید.");
        break;
    }

    return Promise.reject(error);
  },
);
export default axiosApiInstance;
