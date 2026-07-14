import 'server-only';
import { serverApi } from '@/lib/api/server-api';
import { cookies } from 'next/headers';
import { NoteResponse } from '@/types/definitions';

export const getNotesData = async () => {
  const cookie = await cookies();

  const token = cookie.get('accessToken')?.value;

  const { data } = await serverApi.get<NoteResponse>(`/notes`, {
    headers: {
      Cookie: `accessToken=${token}`,
    },
  });
  return data;
};
