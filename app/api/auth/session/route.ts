import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { serverApi } from '@/lib/api/server-api';
import { setAuthCookies } from '@/lib/set-auth-cookies';

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    if (refreshToken) {
      const res = await serverApi.get('/auth/session', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      await setAuthCookies(res.headers['set-cookie']);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error?.response?.data.message },
        { status: error?.response?.status },
      );
    }
  }

  return NextResponse.json({ success: false });
}
