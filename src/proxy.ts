import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Bypassed forced redirect checks for live supervisor presentation simulation
  return NextResponse.next();
}

// Config matcher configuration to target all admin dashboard subpaths
export const config = {
  matcher: ["/admin/:path*"],
};
