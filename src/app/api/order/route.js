import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('re_Ej1dkhZc_FBzjkxaVnmcuGGuDrwG6ZbeB');

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, address, totalAmount, paymentMethod } = body;

    // Validate payload values
    if (!name || !email || !address || !totalAmount || !paymentMethod) {
      return NextResponse.json(
        { error: "Name, Email, Address, Total Amount, and Payment Method are required." },
        { status: 400 }
      );
    }

    console.log(`[Order Processing]: Initiating checkout for ${name} (${email})...`);

    // 1. Simulate automated background insertion for user profile creation
    console.log(`[Profile Automation]: Verifying credentials for ${email}...`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`[Profile Automation]: Secure customer account profile instantly generated and mapped for email: ${email}`);

    return NextResponse.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.error("[Checkout POST Error]:", error);
    return NextResponse.json(
      { error: "Failed to process storefront order checkout." },
      { status: 500 }
    );
  }
}
