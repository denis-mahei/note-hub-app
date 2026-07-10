import "server-only";
import axios from "axios";
import { env } from "@/lib/env";

export const serverApi = axios.create({
  baseURL: env.API_BASE_URL,
});
