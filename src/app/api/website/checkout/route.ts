import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerEmail } = body;

    console.log(`[Checkout API] Processing checkout intent for ${customerEmail || "anonymous customer"}`);
    console.log(`[Checkout API] Items to pack:`, items);

    // Mock order creation and checkout processing
    const orderId = `gg_web_${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      orderId,
      message: "Checkout intent created successfully. Proceeding to checkout session.",
      checkoutUrl: `https://checkout.greengirl.com/pay/${orderId}`,
    }, { status: 201 });
  } catch (error) {
    console.error("[Checkout API Error]:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error while parsing customer checkout intent.",
    }, { status: 500 });
  }
}
