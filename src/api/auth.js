// api/auth.js
import axios from "axios";
import { BACKEND_BASE_URL } from "./config";
import axiosInstance from "./axiosInstance";

const instance = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true,
});

export async function login(payload) {
  const res = await instance.post("/auth/login", payload);

  // backend returns ResponseMessage<T> with data
  return res.data.data;
}
export async function logoutApi() {
  return (await axiosInstance.post("/auth/logout", {}, { withCredentials: true })).data;
}
