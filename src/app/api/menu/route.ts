import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const diet = searchParams.get("diet") || "";
    const spice = searchParams.get("spice") || "";

    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPrice = Number(
      searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER
    );

    const sort = searchParams.get("sort") || "recommended";

    const page = Math.max(
      Number(searchParams.get("page") || 1),
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || 12), 1),
      50
    );

    const skip = (page - 1) * limit;

    const where = {
      available: true,

      ...(search
        ? {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          }
        : {}),

      ...(category
        ? {
            category: {
              slug: category,
            },
          }
        : {}),

      ...(diet
        ? {
            dietType: diet,
          }
        : {}),

      ...(spice
        ? {
            spiceLevel: spice,
          }
        : {}),

      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    let orderBy = {};

    switch (sort) {
      case "price-low":
        orderBy = {
          price: "asc" as const,
        };
        break;

      case "price-high":
        orderBy = {
          price: "desc" as const,
        };
        break;

      case "rating":
        orderBy = {
          rating: "desc" as const,
        };
        break;

      case "popularity":
        orderBy = {
          popularity: "desc" as const,
        };
        break;

      case "newest":
        orderBy = {
          createdAt: "desc" as const,
        };
        break;

      default:
        orderBy = {
          popularity: "desc" as const,
        };
    }

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          available: true,
          cuisine: true,
          dietType: true,
          spiceLevel: true,
          rating: true,
          ratingCount: true,
          popularity: true,

          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },

          restaurant: {
            select: {
              id: true,
              name: true,
              slug: true,
              rating: true,
              deliveryTime: true,
              deliveryFee: true,
              isOpen: true,
            },
          },
        },
      }),

      prisma.menuItem.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Menu API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu items",
      },
      {
        status: 500,
      }
    );
  }
}