import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
try {
const totalOrders = await prisma.order.count();


const pendingOrders = await prisma.order.count({
  where: {
    status: "PENDING",
  },
});

const acceptedOrders = await prisma.order.count({
  where: {
    status: "ACCEPTED",
  },
});

const preparingOrders = await prisma.order.count({
  where: {
    status: "PREPARING",
  },
});

const completedOrders = await prisma.order.count({
  where: {
    status: "COMPLETED",
  },
});

const revenueResult = await prisma.order.aggregate({
  _sum: {
    total: true,
  },
  where: {
    status: "COMPLETED",
  },
});

const totalRevenue = revenueResult._sum.total || 0;

return NextResponse.json({
  success: true,
  stats: {
    totalOrders,
    pendingOrders,
    acceptedOrders,
    preparingOrders,
    completedOrders,
    totalRevenue,
  },
});

} catch (error) {
console.error("Admin dashboard error:", error);

return NextResponse.json(
  {
    success: false,
    message: "Failed to fetch dashboard data",
  },
  { status: 500 }
);


}
}
