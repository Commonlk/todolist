import axios, { AxiosResponse } from "axios";
import { User, UserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aXRpbnNpbHZhMHhkQGdtYWlsLmNvbSIsIm5hbWUiOiJWaWN0b3IiLCJpYXQiOjE2NDczNjI0NTksImV4cCI6MTY0NzM2Nzg1OX0.SYJURQqj0DVaCDWnV057Ky4CMUa9uzoGykn_Ei98SV8"}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/user"),
  signin: (user: UserFormValues) => requests.post<User>("/auth/signin", user),
  signup: (user: UserFormValues) => requests.post<User>("/auth/signup", user),
};

const agent = { Account };

export default agent;
