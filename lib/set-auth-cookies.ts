import { cookies } from "next/headers";

const ACCESS_TOKEN_MAX_AGE = 60 * 15;

const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

const isProd = process.env.NODE_ENV === "production";

export async function setAuthCookies(
  setCookie: string[] | undefined,
): Promise<void> {
  const cookiesStore = await cookies();

  if (!setCookie) return;

  const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];
  const parsedCookies = Object.fromEntries(
    cookieArr.map((cookie) => {
      const pairCookie = cookie.split(";")[0];
      const index = pairCookie.indexOf("=");
      const name = pairCookie.slice(0, index);
      const value = pairCookie.slice(index + 1);
      return [name, value];
    }),
  );
  const options = {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  } as const;

  if (parsedCookies.accessToken) {
    cookiesStore.set("accessToken", parsedCookies.accessToken, {
      ...options,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
  }
  if (parsedCookies.refreshToken) {
    cookiesStore.set("refreshToken", parsedCookies.refreshToken, {
      ...options,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }
}
