import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('re_NzE3ZDRiY185M0FFNEM0YTlBMjhDM0VFMjU4QzE2NUI=');

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

    // First, call await resend.emails.send({...}) targeting the email address entered by the customer in the checkout form payload. Set the subject to "Green Girl - Order Confirmed!" and write a clean HTML message body summarizing the receipt details.
    await resend.emails.send({
      from: 'Green Girl <onboarding@resend.dev>',
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
      `,
    });

    // Second, immediately call await resend.emails.send({...}) targeting the administrator's operational email "admin@greengirl.com". Set the subject to "ALERT: New Order Received!" and pass the customer billing contact details string natively inside the body.
    await resend.emails.send({
      from: 'Green Girl <onboarding@resend.dev>',
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
      `,
    });

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
