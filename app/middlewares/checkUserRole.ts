import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  console.log("Token:", token);

  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(
      "https://management-system-frontend-woad.vercel.app/login"
    );
  }

  cookies().set("token", token);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/user/role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const role = response.data;
    console.log("Role:", role);

    if (role === "admin") {
      console.log("Redirecting to admin landing page");
      return NextResponse.redirect("/admin/landing");
    } else {
      console.log("Redirecting to user landing page");
      return NextResponse.redirect("/user/landing");
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.redirect(
      "https://management-system-frontend-woad.vercel.app/login"
    );
  }
}

export const config = {
  matcher: "/",
};
