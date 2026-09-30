import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
try {
const menuItems = await prisma.menuItem.findMany({
include: {
restaurant: true,
category: true,
},
orderBy: {
name: "asc",
},
});


return NextResponse.json({
  success: true,
  menuItems,
});


} catch (error) {
console.error("Get menu items error:", error);

return NextResponse.json(
  {
    success: false,
    message: "Failed to fetch menu items",
  },
  { status: 500 }
);


}
}

export async function POST(request: Request) {
try {
const body = await request.json();

const {
  name,
  price,
  available,
  restaurantId,
  categoryId,
} = body;

if (
  !name ||
  price === undefined ||
  !restaurantId ||
  !categoryId
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Name, price, restaurantId and categoryId are required",
    },
    { status: 400 }
  );
}

const menuItem = await prisma.menuItem.create({
  data: {
    name,
    price: Number(price),
    available:
      available === undefined
        ? true
        : Boolean(available),
    restaurant: {
      connect: {
        id: restaurantId,
      },
    },
    category: {
      connect: {
        id: categoryId,
      },
    },
  },
  include: {
    restaurant: true,
    category: true,
  },
});

return NextResponse.json(
  {
    success: true,
    message: "Menu item created successfully",
    menuItem,
  },
  { status: 201 }
);


} catch (error) {
console.error("Create menu item error:", error);


return NextResponse.json(
  {
    success: false,
    message:
      error instanceof Error
        ? error.message
        : "Failed to create menu item",
  },
  { status: 500 }
);


}
}
