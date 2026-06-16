import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Complete local development authentication bypass
  return NextResponse.next();
}

// Config matcher configuration to target all admin dashboard subpaths
export const config = {
  // Disable matching so it doesn't intercept admin routes during demo building
  matcher: [],
};
