import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server-api";
import { setAuthCookies } from "@/lib/set-auth-cookies";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const res = await serverApi.post("/auth/register", {
      email,
      password,
    });

    const setCookie = res.headers["set-cookie"];

    await setAuthCookies(setCookie);

    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (axios.isAxiosError(error)) {
        return NextResponse.json(
          { message: error?.response?.data.message },
          { status: error?.response?.status },
        );
      }
    }
  }
}
