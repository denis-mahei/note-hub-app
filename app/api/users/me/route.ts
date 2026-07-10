import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/server-api";

export async function GET() {
  const cookie = await cookies();

  const token = cookie.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await serverApi.get("/users/me", {
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { message: "Oops... Something went wrong." },
      {
        status: 500,
      },
    );
  }
}
