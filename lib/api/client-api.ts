import axios from 'axios';
import { Note, NoteResponse, User } from '@/types/definitions';
import { AuthFormValues } from '@/lib/schemas/auth';
import { NoteValues } from '@/lib/schemas/note';

export const clientApi = axios.create({
  baseURL: '/api',
});

export const getMe = async (): Promise<User> => {
  const { data } = await clientApi.get<User>('/users/me');
  return data;
};

export const signIn = async (
  formValues: AuthFormValues,
): Promise<User> => {
  const { data } = await clientApi.post<User>(
    '/auth/login',
    formValues,
  );
  return data;
};

export const signUp = async (
  formValues: AuthFormValues,
): Promise<User> => {
  const { data } = await clientApi.post<User>(
    '/auth/register',
    formValues,
  );
  return data;
};

export const signOut = async (): Promise<void> => {
  await clientApi.post('/auth/logout');
};

export const createNote = async (
  payload: NoteValues,
): Promise<Note> => {
  const { data } = await clientApi.post<Note>('/notes', payload);
  return data;
};
