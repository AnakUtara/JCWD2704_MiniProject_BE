import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchAuth } from "./app/_utils/fetch.validate";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const refresh_token = request.cookies.get("refresh_token")?.value || "";
  const { pathname } = request.nextUrl;
  const {
    message,
    is_verified,
  }: { message: string; is_verified: boolean; accessToken: string } =
    await fetchAuth({
      base_url: `${process.env.NEXT_PUBLIC_API_URL}/users/validation/refresh`,
      token: refresh_token,
    })
      .then(async (res: Response) => {
        const data = await res.json();
        if (refresh_token)
          response.cookies.set({
            name: "access_token",
            value: data.accessToken,
            path: "/",
            domain: "riady.pw",
            secure: true,
          });
        return data;
      })
      .catch((error) => false);

  const validate: boolean = message === "success";
  const guestOnlyPaths: boolean =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname.startsWith("/forgot_password");
  const userOnlyPaths: boolean =
    pathname === "/profile" ||
    pathname === "/dashboard" ||
    pathname.startsWith("/transaction");
  const verifiedUserOnlyPaths: boolean =
    pathname === "/event/create" || pathname === "/event/update";
  if (guestOnlyPaths && validate) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    pathname == "/verification" ||
    (pathname.startsWith("/verification") && is_verified)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (userOnlyPaths && !validate) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    (verifiedUserOnlyPaths && !validate) ||
    (verifiedUserOnlyPaths && !is_verified)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/forgot_password/:path*",
    "/event/:path*",
    "/verification/:path*",
    "/profile",
    "/dashboard",
    "/transaction/:path*",
    "/sign-in",
    "/sign-up",
    "/",
  ],
};
