import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany();

    return NextResponse.json({
      success: true,
      count: restaurants.length,
      message: "Database connected successfully",
      restaurants,
    });
  } catch (error) {
    console.error("Database error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}