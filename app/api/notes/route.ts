import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApi } from '@/lib/api/server-api';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookie = await cookies();

  const token = cookie.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const { data } = await serverApi.post('/notes', body, {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });
    revalidatePath('/notes');
    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error?.response?.data.message },
        { status: error?.response?.status },
      );
    }
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 },
    );
  }
}
