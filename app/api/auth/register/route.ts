import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/lib/api/serverApi";
import { setAuthCookies } from "@/lib/setAuthCookies";

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
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
