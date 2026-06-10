import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* subpaths except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("admin_token")?.value;

    if (!adminToken) {
      console.log(`[Security Proxy] Access Denied for path ${pathname}. Redirecting to login.`);
      
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log(`[Security Proxy] Access Granted for path ${pathname}. Token verified.`);
  }

  return NextResponse.next();
}

// Config matcher configuration to target all admin dashboard subpaths
export const config = {
  matcher: ["/admin/:path*"],
};
