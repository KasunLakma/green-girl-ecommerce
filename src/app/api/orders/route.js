import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  try {
    const userIdCookie = request.cookies.get("userId")?.value || "";
    
    // Construct session object matching strict user order query filter
    const session = {
      user: {
        id: userIdCookie
      }
    };

    const userOrders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(userOrders);
  } catch (error) {
    console.error("[User Orders GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}
