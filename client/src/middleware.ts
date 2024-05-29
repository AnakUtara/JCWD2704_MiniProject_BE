import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
//TODO: Find out why prettier multiple OR and AND conditional wrap parenthesis in a weird way
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  throw new Error("error");

  const response = NextResponse.next();
  const refresh_token = request.cookies.get("refresh_token")?.value || "";
  const res: { message: string; is_verified: boolean; accessToken: string } =
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refresh_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (res: Response) => {
        const data = await res.json();
        if (refresh_token)
          response.cookies.set("access_token", data.accessToken);
        return data;
      })
      .catch((error) => false);
  const isVerified = res.is_verified;
  const validate: boolean = res?.message === "success";
  const { pathname } = request.nextUrl;
  const guestOnlyPaths: boolean =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname.startsWith("/forgot-password");
  if (guestOnlyPaths && validate) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    pathname == "/verification" ||
    (pathname.startsWith("/verification") && isVerified)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/forgot_password/:path*",
    "/verification/:path*",
    "/profile/:path*",
    "/sign-in",
    "/sign-up",
    "/",
  ],
};
