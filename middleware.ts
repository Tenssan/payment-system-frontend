import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

// Middleware function
export async function middleware(request: NextRequest) {
  console.log("Middleware executed");

  // Retrieve token from request cookies
  const token = request.cookies.get("token")?.value;
  console.log("Token:", token);

  if (!token) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(
      "https://management-system-frontend-woad.vercel.app/login"
    );
  }

  try {
    // Make a request to get the user role
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/user/role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );

    const role = response.data;
    console.log("User role:", role);

    const path = request.nextUrl.pathname;
    console.log("Requested path:", path);

    // Handle role-based redirection
    if (
      role === undefined &&
      (path.startsWith("/pages/user") || path.startsWith("/pages/admin"))
    ) {
      console.log("Role not found, redirecting to login");
      return NextResponse.redirect(
        "https://management-system-frontend-woad.vercel.app/login"
      );
    }

    if (path.startsWith("/pages/user") && role === "admin") {
      console.log("Admin trying to access user page, redirecting to login");
      return NextResponse.redirect(
        "https://management-system-frontend-woad.vercel.app/login"
      );
    }

    if (path.startsWith("/pages/admin") && role === "user") {
      console.log("User trying to access admin page, redirecting to login");
      return NextResponse.redirect(
        "https://management-system-frontend-woad.vercel.app/login"
      );
    }

    console.log("Role and path matched, proceeding to next");
    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.redirect(
      "https://management-system-frontend-woad.vercel.app/login"
    );
  }
}

// Matcher to apply the middleware only to specific paths
export const config = {
  matcher: ["/pages/user/:path*", "/pages/admin/:path*"],
};
