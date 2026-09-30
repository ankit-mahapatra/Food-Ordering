import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";

export async function GET() {
try {
const authenticated = await isAdminAuthenticated();


if (!authenticated) {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    { status: 401 }
  );
}

const orders = await prisma.order.findMany({
  include: {
    items: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

return NextResponse.json({
  success: true,
  orders,
});


} catch (error) {
console.error("Get admin orders error:", error);

return NextResponse.json(
  {
    success: false,
    message: "Failed to fetch orders",
  },
  { status: 500 }
);


}
}
