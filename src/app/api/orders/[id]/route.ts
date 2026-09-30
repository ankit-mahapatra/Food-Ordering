import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";

const allowedStatuses = [
"PENDING",
"ACCEPTED",
"PREPARING",
"COMPLETED",
];

export async function PATCH(
request: Request,
context: { params: Promise<{ id: string }> }
) {
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

const { id } = await context.params;

const body = await request.json();

const { status } = body;

if (!allowedStatuses.includes(status)) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid order status",
    },
    { status: 400 }
  );
}

const order = await prisma.order.update({
  where: {
    id,
  },
  data: {
    status,
  },
});

return NextResponse.json({
  success: true,
  message: "Order status updated successfully",
  order,
});

} catch (error) {
console.error("Update order status error:", error);


return NextResponse.json(
  {
    success: false,
    message: "Failed to update order status",
  },
  { status: 500 }
);


}
}
