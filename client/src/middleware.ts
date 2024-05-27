import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  const token = request.cookies.get("refresh_token")?.value || "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/validate`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  const validate: boolean = (await res.json())?.message === "success";
  const { pathname } = request.nextUrl;
  if ((pathname == "/sign-in" || pathname == "/sign-up") && validate)
    return NextResponse.redirect(new URL("/", request.url));
  else if (pathname == "/" && !validate)
    return NextResponse.redirect(new URL("/sign-in", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up", "/"],
};
