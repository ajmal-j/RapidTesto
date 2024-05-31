import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const authCookie =
    cookies().get("__Secure-authjs.session-token") ??
    cookies().get("authjs.session-token");

  if (!authCookie || !authCookie.value) {
    return NextResponse.redirect(new URL(`/api/auth/signin`, request.url));
  }
};

export const config = {
  matcher: ["/settings", "/completed"],
};
