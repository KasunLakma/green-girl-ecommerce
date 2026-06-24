import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("[Admin Orders GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, stockAvailable } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (stockAvailable !== undefined) updateData.stockAvailable = !!stockAvailable;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[Admin Orders PATCH Error]:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
