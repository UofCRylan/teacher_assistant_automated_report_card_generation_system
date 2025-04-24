import { NextResponse } from "next/server";
import accountManager from "@/src/utils/Managers/AccountManager.js";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let cookie = request.cookies.get("user");
  // const url = new URL(request.url);
  // console.log(cookie);

  if (!accountManager.isAuthenticated(cookie)) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    // const result = await accountManager.getUserInfo();
    // console.log("This user is: ", result);
  }
}

export const config = {
  matcher: ["/student"],
};
