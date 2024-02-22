import { NextResponse } from "next/server";

export function middleware(request) {
  try {
    let cookie = request.cookies.get("user")?.value;
    const user = JSON.parse(cookie);
    console.log("user: >>", user);

    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (user.role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (error) {
    console.log("error :>>", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path",
};

// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// export async function middleware(req) {
//   const res = NextResponse.next()

//   // Create a Supabase client configured to use cookies
//   const supabase = createMiddlewareClient({ req, res })

//   // Refresh session if expired - required for Server Components
//   await supabase.auth.getUser()

//   return res
// }

// // Ensure the middleware is only called for relevant paths.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// }
