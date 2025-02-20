import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest, response: NextResponse) {
  const { pathname, search, searchParams } = request.nextUrl;

  const customDomain = `${process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "https://mdev.dev.aws.whatuni.com" : process.env.NEXT_PUBLIC_ENVIRONMENT === "stg" ? "https://mtest.test.aws.whatuni.com" : process.env.NEXT_PUBLIC_ENVIRONMENT === "prd" ? "https://www.whatuni.com" : "http://localhost:3000"}`;

  if (
    pathname === "/home" ||
    pathname === "/home/" ||
    pathname === "/degree-courses/search"
  ) {
    console.log(request, "request headers logging from the middleware");
    const response = NextResponse.next(); // Initialize response properly
    //if (searchParams && pathname === "/degree-courses/search") {
    //}
    response.cookies.set("pathnamecookies", pathname);
    response.cookies.set("searchParamscookies", searchParams.toString());

    return response;
    // return NextResponse.next();
  }

  if (search && pathname.endsWith("/")) {
    const newUrl = pathname.slice(0, -1) + search;
    return NextResponse.redirect(new URL(newUrl, customDomain));
  }
  if (!search && !pathname.endsWith("/")) {
    return NextResponse.redirect(new URL(`${pathname}/`, customDomain));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images|icons).*)"],
};
