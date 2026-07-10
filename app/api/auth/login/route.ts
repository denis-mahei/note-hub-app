import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/server-api";
import { setAuthCookies } from "@/lib/set-auth-cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await serverApi.post("/auth/login", body);

    const setCookie = res.headers["set-cookie"];

    await setAuthCookies(setCookie);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
