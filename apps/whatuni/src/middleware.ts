import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (search && pathname.endsWith("/")) {
    const newUrl = pathname.slice(0, -1) + search;
    return NextResponse.rewrite(new URL(newUrl, request.url));
  }
  if (!search && !pathname.endsWith("/")) {
    return NextResponse.rewrite(new URL(`${pathname}/`, request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
