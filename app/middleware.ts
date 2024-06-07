import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  console.log("Middleware executed");
  const token = request.cookies.get("token")?.value;
  console.log("Token:", token);

  if (!token) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(
      "https://management-system-frontend-woad.vercel.app/login"
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/user/role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const role = response.data.role;
    console.log("User role:", role);

    if (
      request.nextUrl.pathname.startsWith("/pages/user") &&
      role === "admin"
    ) {
      console.log("Admin trying to access user page, redirecting to login");
      return NextResponse.redirect(
        "https://management-system-frontend-woad.vercel.app/login"
      );
    }

    if (
      request.nextUrl.pathname.startsWith("/pages/admin") &&
      role === "user"
    ) {
      console.log("User trying to access admin page, redirecting to login");
      return NextResponse.redirect(
        "https://management-system-frontend-woad.vercel.app/login"
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.redirect(
      "https://management-system-frontend-woad.vercel.app/login"
    );
  }
}
