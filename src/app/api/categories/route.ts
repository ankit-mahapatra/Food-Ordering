import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        sortOrder: true,
      },
    });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Categories API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}