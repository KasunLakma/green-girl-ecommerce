import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryEmail = searchParams.get("email") || "";
    
    const emailCookie = request.cookies.get("userEmail")?.value || "";
    const userIdCookie = request.cookies.get("userId")?.value || "";
    
    let sessionEmail = queryEmail || emailCookie || "";

    // If session email is missing, lookup using the userId cookie
    if (!sessionEmail && userIdCookie) {
      const dbUser = await prisma.user.findUnique({
        where: { id: userIdCookie }
      });
      if (dbUser) {
        sessionEmail = dbUser.email;
      }
    }

    // Dynamic sandbox fallback if no credentials are active
    if (!sessionEmail) {
      sessionEmail = "customer@greengirl.luxury";
    }

    console.log(`[Users Orders GET]: Fetching orders dynamically for email: ${sessionEmail}`);

    const orders = await prisma.order.findMany({
      where: {
        email: sessionEmail
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(orders || []);
  } catch (error) {
    console.error("[Users Orders GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    );
  }
}
