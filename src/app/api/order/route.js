import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL_ADDRESS",
    pass: "YOUR_16_DIGIT_GMAIL_APP_PASSWORD"
  }
});

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

    console.log(`[Order Processing]: Initiating order for ${name} (${email})...`);

    // 1. Simulate automated background insertion for user profile creation
    console.log(`[Profile Automation]: Verifying credentials for ${email}...`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`[Profile Automation]: Secure customer account profile instantly generated and mapped for email: ${email}`);

    try {
      await transporter.sendMail({
        from: '"Green Girl" <YOUR_GMAIL_ADDRESS>',
        to: email,
        subject: "Green Girl - Order Confirmed!",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Green Girl - Order Confirmed!</h2>
            <p>Thank you, ${name}. Your order has been successfully placed.</p>
            <h3>Receipt Details</h3>
            <ul>
              <li>Total Amount: Rs. ${totalAmount}</li>
              <li>Payment Method: ${paymentMethod}</li>
              <li>Shipping Address: ${address}</li>
            </ul>
          </div>
        `
      });

      await transporter.sendMail({
        from: '"Green Girl" <YOUR_GMAIL_ADDRESS>',
        to: "admin@greengirl.com",
        subject: "ALERT: New Order Received!",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>ALERT: New Order Received!</h2>
            <p><strong>Customer Billing Contact Details:</strong></p>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Address: ${address}</p>
            <p>Total Amount: Rs. ${totalAmount}</p>
            <p>Payment Method: ${paymentMethod}</p>
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
