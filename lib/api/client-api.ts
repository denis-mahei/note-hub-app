import axios from "axios";
import { User } from "@/types/definitions";
import { AuthFormValues } from "@/lib/schemas/auth";

export const clientApi = axios.create({
  baseURL: "/api",
});

export const getMe = async (): Promise<User> => {
  const { data } = await clientApi.get<User>("/users/me");
  return data;
};

export const login = async (formValues: AuthFormValues): Promise<User> => {
  const { data } = await clientApi.post<User>("/auth/login", formValues);
  return data;
};
