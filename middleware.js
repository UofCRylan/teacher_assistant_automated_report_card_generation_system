import { NextResponse } from "next/server";
import accountManager from "@/src/utils/Managers/AccountManager.js";

export async function middleware(request) {
  let userToken = request.cookies.get("user");

  // Handle check not logged in trying to access authorized path
  if (userToken === undefined && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  if (userToken !== undefined) {
    const result = await accountManager.getTokenInfo(userToken.value);

    // Handle check logged in trying to access login path
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${result.data.type}`, request.url)
      );
    }

    // Check to make sure user is on current route path
    const roles = ["student", "teacher", "admin"];

    for (const role of roles) {
      if (
        request.nextUrl.pathname.startsWith(`/${role}`) &&
        result.data.type !== role
      ) {
        return NextResponse.redirect(
          new URL(`/${result.data.type}`, request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|gif|css|js|ico|webp)).*)", // ai generated regex to match all paths excluding those for static files (.png, etc)
  ],
};
