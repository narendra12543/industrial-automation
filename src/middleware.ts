import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  const isDashboardRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isDashboardRoute && !req.auth) {
    return Response.redirect(
      new URL("/login", req.url)
    );
  }

  if (isAdminRoute && !req.auth) {
    return Response.redirect(
      new URL("/login", req.url)
    );
  }

  return null;
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};