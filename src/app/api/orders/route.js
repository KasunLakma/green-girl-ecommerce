import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  try {
    const userIdCookie = request.cookies.get("userId")?.value || "";
    
    const session = {
      user: {
        id: userIdCookie
      }
    };

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[User Orders GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}
