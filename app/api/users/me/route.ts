import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/server-api";
import axios from "axios";

export async function GET() {
  const cookie = await cookies();

  const token = cookie.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await serverApi.get("/users/me", {
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
  }
}
