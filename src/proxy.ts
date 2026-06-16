import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Allow all website client paths to load unrestricted.
  // ONLY routes matched by config.matcher (which is /admin/:path*) run here.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
