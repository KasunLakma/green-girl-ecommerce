import { NextResponse } from "next/server";

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

    // 2. Simulate asynchronous dispatching of dual email notifications simultaneously
    const dispatchEmails = async () => {
      // Notification A: To Customer
      console.log(`[Notification Engine]: Dispatching Invoice Confirmation to Customer (${email})...`);
      // Notification B: To Admin
      console.log("[Notification Engine]: Dispatching high-priority COD alert to Master Admin Panel...");
      
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      console.log(`[Notification Engine]: Email confirmation successfully sent to customer: ${email}`);
      console.log("[Notification Engine]: Admin alert logged and pushed to operations team successfully.");
    };

    // Trigger emails in background (non-blocking)
    dispatchEmails();

    // 3. Return clean JSON success response
    return NextResponse.json(
      { 
        status: 200,
        message: "Order finalized, profile auto-created, notifications dispatched successfully",
        orderReference: "ORD-" + Math.floor(1000 + Math.random() * 9000),
        userEmail: email
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("[Checkout POST Error]:", error);
    return NextResponse.json(
      { error: "Failed to process storefront order checkout." },
      { status: 500 }
    );
  }
}
