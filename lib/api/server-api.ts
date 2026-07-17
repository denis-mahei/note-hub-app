import 'server-only';
import axios from 'axios';
import { env } from '@/lib/env';
import { cookies } from 'next/headers';
import { Note, NoteResponse } from '@/types/definitions';

export const serverApi = axios.create({
  baseURL: env.API_BASE_URL,
});

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
