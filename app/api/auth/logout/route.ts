import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/server-api";
import { NextResponse } from "next/server";

export async function POST() {
  const store = await cookies();

  const accessToken = store.get("accessToken")?.value;
  const refreshToken = store.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json(
      { message: "Already logged out" },
      { status: 200 },
    );
  }

  try {
    await serverApi.post("/auth/logout", null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
  store.delete("accessToken");
  store.delete("refreshToken");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
