import 'server-only';
import axios from 'axios';
import { env } from '@/lib/env';
import { cookies } from 'next/headers';
import { Note, NoteResponse } from '@/types/definitions';

export const serverApi = axios.create({
  baseURL: env.API_BASE_URL,
});

export const refreshApi = axios.create({
  baseURL: env.API_BASE_URL,
});

let isRefreshing = false;

serverApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      (err.response?.status === 401 ||
        err.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return serverApi(originalRequest);
      }

      isRefreshing = true;
      try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;
        const res = await refreshApi.get('/auth/session', {
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });
        const setCookieHeader = res.headers['set-cookie'];
        const newAccessToken = setCookieHeader
          ?.find((c) => c.startsWith('accessToken='))
          ?.split(';')[0]
          ?.split('=')[1];

        originalRequest.headers.Cookie = `accessToken=${newAccessToken}`;
        return serverApi(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);

export const getNotesData = async ({
  page = 1,
  perPage = 8,
  tag,
  search,
}: {
  page?: number;
  perPage?: number;
  tag?: string;
  search?: string;
}) => {
  const cookie = await cookies();

  const token = cookie.get('accessToken')?.value;

  const { data } = await serverApi.get<NoteResponse>(`/notes`, {
    headers: {
      Cookie: `accessToken=${token}`,
    },
    params: {
      page,
      perPage,
      ...(tag && { tag }),
      ...(search && { search }),
    },
  });
  return data;
};

export const getNoteById = async (id: string) => {
  const cookie = await cookies();

  const token = cookie.get('accessToken')?.value;

  const { data } = await serverApi.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: `accessToken=${token}`,
    },
  });
  return data;
};
