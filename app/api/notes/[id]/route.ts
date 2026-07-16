import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverApi } from '@/lib/api/server-api';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const cookie = await cookies();

  const token = cookie.get('accessToken')?.value;
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }
  try {
    const { data } = await serverApi.get(`/notes/${id}`, {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookie = await cookies();

  const token = cookie.get('accessToken')?.value;
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }
  try {
    await serverApi.delete(`/notes/${id}`, {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });
    revalidatePath('/notes');
    return NextResponse.json({ message: 'Note deleted' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ message: 'Something went wrong!' });
    }
  }
}
