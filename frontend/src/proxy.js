import { NextResponse } from "next/server";

export function proxy(req) {
  const token = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value
  const { pathname } = req.nextUrl;

  
  if ((token || refreshToken) && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/battleground", req.url));
  }

  
  if (!(token || refreshToken) && pathname.startsWith("/battleground")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/battleground/:path*"],
};