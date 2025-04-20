import { NextResponse } from "next/server";
import acccountManager from "/src/utils/Managers/AccountManager.js";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie = request.cookies.get("user");
  console.log(cookie);

  if (!acccountManager.isAuthenticated(cookie)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/student"],
};
