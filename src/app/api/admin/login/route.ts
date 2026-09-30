import { NextResponse } from "next/server";

export async function POST(request: Request) {
try {
const body = await request.json();


const email = body.email;
const password = body.password;

if (!email || !password) {
  return NextResponse.json(
    {
      success: false,
      message: "Email and password are required",
    },
    { status: 400 }
  );
}

if (
  email !== process.env.ADMIN_EMAIL ||
  password !== process.env.ADMIN_PASSWORD
) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid email or password",
    },
    { status: 401 }
  );
}

const response = NextResponse.json({
  success: true,
  message: "Admin login successful",
});

response.cookies.set("admin_session", "authenticated", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 8,
});

return response;


} catch (error) {
console.error("Admin login error:", error);


return NextResponse.json(
  {
    success: false,
    message: "Something went wrong",
  },
  { status: 500 }
);


}
}
