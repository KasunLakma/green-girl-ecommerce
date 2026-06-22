import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// Global in-memory status map to track statuses without altering schema
const orderStatuses = new Map();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });

    const enrichedOrders = orders.map((order) => ({
      ...order,
      status: orderStatuses.get(order.id) || "Pending"
    }));

    return NextResponse.json(enrichedOrders);
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
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    orderStatuses.set(id, status);
    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error("[Admin Orders PATCH Error]:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
