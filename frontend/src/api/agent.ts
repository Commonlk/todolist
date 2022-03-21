import axios, { AxiosResponse } from "axios";
import { Todo, TodoFormValues } from "../models/todo";
import { User, UserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem("token");
  config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  pat: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Account = {
  current: () => requests.get<User>("/user"),
  signin: (user: UserFormValues) => requests.post<User>("/auth/signin", user),
  signup: (user: UserFormValues) => requests.post<User>("/auth/signup", user),
};

const Todos = {
  todo: (id: string) => requests.get<Todo>(`/todos/${id}`),
  todoList: () => requests.get<Todo[]>("/todos"),
  create: (todo: TodoFormValues) => requests.post<Todo>("/todos", todo),
  edit: (id: string, todo: TodoFormValues) =>
    requests.pat<Todo>(`/todos/${id}`, todo),
  delete: (id: string) => requests.del(`/todos/${id}`),
};

const agent = { Account, Todos };

export default agent;
