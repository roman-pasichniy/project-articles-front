import axios from "axios";
import type { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getCurrentUser = async (): Promise<User> => {
  const response = await instance.get<User>("/auth/current");

  return response.data;
};
