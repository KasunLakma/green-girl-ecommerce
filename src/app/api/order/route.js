import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "../../../lib/prisma";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL_ADDRESS",
    pass: "YOUR_16_DIGIT_GMAIL_APP_PASSWORD"
  }
});

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("[Order GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders from database." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, address, totalAmount, paymentMethod } = body;

    try {
      await transporter.sendMail({
        from: '"Green Girl" <YOUR_GMAIL_ADDRESS>',
        to: email,
        subject: "Green Girl - Order Confirmed!",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Green Girl - Order Confirmed!</h2>
            <p>Thank you, ${name || "Customer"}. Your order has been successfully placed.</p>
            <h3>Receipt Details</h3>
            <ul>
              <li>Total Amount: Rs. ${totalAmount || 0}</li>
              <li>Payment Method: ${paymentMethod || "COD"}</li>
              <li>Shipping Address: ${address || "N/A"}</li>
            </ul>
          </div>
        `
      });
    } catch (emailError) {
      console.error("[Email Delivery Error]:", emailError);
    }

    return NextResponse.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.error("[Order POST Error]:", error);
    return NextResponse.json(
      { error: "Failed to process storefront order." },
      { status: 500 }
    );
  }
}
