import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

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
