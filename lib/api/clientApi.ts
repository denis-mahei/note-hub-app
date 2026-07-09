import axios from "axios";
import { User } from "@/types/definitions";

export const clientApi = axios.create({
  baseURL: "/api",
});

export const getMe = async (): Promise<User> => {
  const { data } = await clientApi.get<User>("/users/me");
  return data;
};
