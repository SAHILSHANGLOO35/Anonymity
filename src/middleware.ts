import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (token) {
        // Prevent signed-in users from accessing auth pages
        if (
            url.pathname.startsWith("/signin") ||
            url.pathname.startsWith("/signup") ||
            url.pathname.startsWith("/verify") ||
            url.pathname === "/"
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next(); // Allow navigation if authenticated
    }

    // If no token, only redirect if trying to access protected pages
    if (url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next(); // Allow navigation to auth pages
}

export const config = {
    matcher: ["/signin", "/signup", "/", "/dashboard/:path*", "/verify/:path*"],
};
