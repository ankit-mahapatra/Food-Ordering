import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
    console.error("Get orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      items,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !address ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order details",
        },
        { status: 400 }
      );
    }

    const menuItemIds = items.map(
      (item: { id: string }) => item.id
    );

    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds,
        },
        available: true,
      },
    });

    if (menuItems.length !== items.length) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more menu items are unavailable.",
        },
        { status: 400 }
      );
    }

    const orderItems = items.map(
      (item: { id: string; quantity: number }) => {
        const menuItem = menuItems.find(
          (menuItem) => menuItem.id === item.id
        );

        if (!menuItem) {
          throw new Error("Menu item not found");
        }

        const quantity = Number(item.quantity);

        if (!Number.isInteger(quantity) || quantity <= 0) {
          throw new Error("Invalid item quantity");
        }

        return {
          menuItemId: menuItem.id,
          itemName: menuItem.name,
          price: menuItem.price,
          quantity,
          subtotal: menuItem.price * quantity,
        };
      }
    );

    const subtotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    const deliveryFee = subtotal > 499 ? 0 : 40;

    const tax = subtotal * 0.05;

    const total = subtotal + deliveryFee + tax;

    const orderNumber = `ORD-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail,
        customerPhone,
        address,
        subtotal,
        tax,
        deliveryFee,
        total,
        status: "PENDING",

        items: {
          create: orderItems,
        },
      },

      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to place order",
      },
      { status: 500 }
    );
  }
}
