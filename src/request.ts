import axios, { type AxiosResponse } from "axios";
const instance = axios.create({
  baseURL: "",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) return data;

    return Promise.reject(new Error("请求失败!"));
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const request = instance;

export type Response<T> = Promise<{
  code: number;
  message: string;
  result: T;
}>;
