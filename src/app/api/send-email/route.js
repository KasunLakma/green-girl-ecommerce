import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('re_NzE3ZDRiY185M0FFNEM0YTlBMjhDM0VFMjU4QzE2NUI=');

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      orderId, 
      customerName, 
      customerEmail, 
      customerPhone, 
      customerAddress, 
      items = [], 
      totalAmount, 
      paymentMethod 
    } = body;



    // Invoice 1 (To Customer): HTML template confirming receipt
    const customerHtml = `
      <div style="background-color: #050705; color: #ffffff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6E856A, #B2C4AC); line-height: 40px; font-weight: bold; color: #0D110D; font-size: 18px; text-align: center;">GG</div>
          <h1 style="color: #ffffff; font-size: 20px; letter-spacing: 2px; margin-top: 15px; text-transform: uppercase;">Green Girl Boutique</h1>
          <p style="color: #B2C4AC; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-top: 5px;">Order Receipt</p>
        </div>
        
        <div style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 25px; border-radius: 15px; margin-bottom: 25px;">
          <p style="margin-top: 0; color: #a3a3a3; font-size: 12px;">Dear <strong style="color: #ffffff;">${customerName}</strong>,</p>
          <p style="color: #B2C4AC; font-size: 13px; line-height: 1.6;">Thank you for your premium purchase. Your boutique package order is registered. We are reviewing and preparing it with our signature dark-sage custom wrapping.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 12px; color: #ffffff;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;">
                <th style="padding-bottom: 10px; color: #B2C4AC; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                <th style="padding-bottom: 10px; text-align: center; color: #B2C4AC; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                <th style="padding-bottom: 10px; text-align: right; color: #B2C4AC; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 12px 0;">
                    <div style="font-weight: bold; color: #ffffff;">${item.name}</div>
                    <div style="font-size: 10px; color: #B2C4AC; text-transform: uppercase;">${item.category || "Boutique"}</div>
                    ${item.variant ? `<div style="font-size: 10px; color: #737373; margin-top: 2px;">Variant: ${item.variant}</div>` : ""}
                    ${item.color ? `<div style="font-size: 10px; color: #737373; margin-top: 2px;">Color: ${item.color}</div>` : ""}
                    ${item.size ? `<div style="font-size: 10px; color: #737373; margin-top: 2px;">Size: ${item.size}</div>` : ""}
                  </td>
                  <td style="padding: 12px 0; text-align: center; color: #d4d4d4;">${item.qty || 1}</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #ffffff;">Rs. ${(typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0).toLocaleString()}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 20px; padding-top: 15px; font-size: 13px;">
            <div style="margin-bottom: 8px; overflow: hidden;">
              <span style="color: #888888; float: left;">Delivery Method</span>
              <span style="color: #ffffff; float: right;">Premium Delivery (Rs. 350)</span>
            </div>
            <div style="margin-bottom: 8px; overflow: hidden;">
              <span style="color: #888888; float: left;">Payment Gateway</span>
              <span style="color: #B2C4AC; float: right; text-transform: uppercase; font-weight: bold;">${paymentMethod || "COD"}</span>
            </div>
            <div style="font-weight: bold; font-size: 15px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 12px; margin-top: 12px; overflow: hidden;">
              <span style="color: #ffffff; float: left;">Grand Total Paid</span>
              <span style="color: #B2C4AC; float: right;">Rs. ${totalAmount ? totalAmount.toLocaleString() : "0"}</span>
            </div>
          </div>
        </div>
        
        <div style="background-color: rgba(178,196,172,0.05); border: 1px solid rgba(178,196,172,0.1); border-radius: 12px; padding: 15px; margin-bottom: 25px; text-align: center;">
          <span style="font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #B2C4AC;">Shipping Status: Pending Approval</span>
          <p style="font-size: 10px; color: #888888; margin: 5px 0 0 0;">Track shipping milestones dynamically on your customer account dashboard.</p>
        </div>

        <div style="text-align: center; margin-top: 35px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 25px;">
          <a href="${process.env.NEXT_PUBLIC_WEBSITE_URL || "https://abc.com"}/profile" style="display: inline-block; background-color: #B2C4AC; color: #0D110D; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s;">View Dashboard</a>
          <p style="font-size: 9px; color: #555555; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px;">© 2026 GREEN GIRL BOUTIQUE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    `;

    // Invoice 2 (To Admin): Alert HTML template for store owner
    const adminHtml = `
      <div style="background-color: #0d110d; color: #ffffff; font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 25px;">
          <span style="background-color: #ffeaea; color: #ff4d4d; font-size: 9px; font-weight: bold; padding: 4px 10px; border-radius: 10px; text-transform: uppercase; letter-spacing: 1.5px;">CRITICAL SYSTEM ALERT</span>
          <h1 style="font-size: 20px; color: #ffffff; text-transform: uppercase; margin-top: 15px; margin-bottom: 5px;">New Customer Order Logged</h1>
          <p style="color: #888888; font-size: 11px; margin: 0;">Order Ref: <strong style="color: #B2C4AC;">${orderId}</strong> • Timestamp: ${new Date().toLocaleString()}</p>
        </div>

        <div style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin-bottom: 25px; font-size: 12px; line-height: 1.6;">
          <h3 style="color: #B2C4AC; text-transform: uppercase; margin-top: 0; font-size: 11px; letter-spacing: 1.5px; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 8px; font-weight: bold;">Customer Information</h3>
          <table style="width: 100%; font-size: 12px; color: #ffffff; border-collapse: collapse;">
            <tr><td style="color: #888888; padding: 4px 0;">Name:</td><td style="font-weight: bold; text-align: right;">${customerName}</td></tr>
            <tr><td style="color: #888888; padding: 4px 0;">Email:</td><td style="font-weight: bold; text-align: right;">${customerEmail}</td></tr>
            <tr><td style="color: #888888; padding: 4px 0;">Phone:</td><td style="font-weight: bold; text-align: right;">${customerPhone}</td></tr>
            <tr><td style="color: #888888; padding: 4px 0; vertical-align: top;">Address:</td><td style="font-weight: bold; text-align: right;">${customerAddress}</td></tr>
          </table>
        </div>

        <div style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin-bottom: 25px; font-size: 12px; line-height: 1.6;">
          <h3 style="color: #B2C4AC; text-transform: uppercase; margin-top: 0; font-size: 11px; letter-spacing: 1.5px; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 8px; font-weight: bold;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 11px; color: #ffffff;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left;">
                <th style="padding-bottom: 8px; color: #888888; text-transform: uppercase; font-weight: bold;">Item Name</th>
                <th style="padding-bottom: 8px; text-align: center; color: #888888; text-transform: uppercase; font-weight: bold;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right; color: #888888; text-transform: uppercase; font-weight: bold;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                  <td style="padding: 8px 0; font-weight: bold;">
                    ${item.name}
                    ${item.variant ? `<div style="font-size: 10px; color: #737373; margin-top: 2px;">Variant: ${item.variant}</div>` : ""}
                    ${item.color ? `<div style="font-size: 10px; color: #737373; margin-top: 2px;">Color: ${item.color}</div>` : ""}
                    ${item.size ? `<div style="font-size: 10px; color: #737373; margin-top: 2px;">Size: ${item.size}</div>` : ""}
                  </td>
                  <td style="padding: 8px 0; text-align: center;">${item.qty || 1}</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">Rs. ${(typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0).toLocaleString()}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; margin-top: 12px; overflow: hidden; font-weight: bold; font-size: 13px;">
            <span style="color: #888888; float: left;">Total Invoice Value</span>
            <span style="color: #B2C4AC; float: right;">Rs. ${totalAmount ? totalAmount.toLocaleString() : "0"}</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_WEBSITE_URL || "https://abc.com"}/admin/orders" style="display: inline-block; background-color: #B2C4AC; color: #0D110D; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">View Orders Dashboard</a>
        </div>
      </div>
    `;

    // First, call await resend.emails.send({...}) targeting the email address entered by the customer in the checkout form payload. Set the subject to "Green Girl - Order Confirmed!" and write a clean HTML message body summarizing the receipt details.
    await resend.emails.send({
      from: 'Green Girl <onboarding@resend.dev>',
      to: customerEmail,
      subject: "Green Girl - Order Confirmed!",
      html: customerHtml,
    });

    // Second, immediately call await resend.emails.send({...}) targeting the administrator's operational email "admin@greengirl.com". Set the subject to "ALERT: New Order Received!" and pass the customer billing contact details string natively inside the body.
    await resend.emails.send({
      from: 'Green Girl <onboarding@resend.dev>',
      to: "admin@greengirl.com",
      subject: "ALERT: New Order Received!",
      html: adminHtml,
    });

    return NextResponse.json({ success: true, message: "Emails dispatched successfully." });
  } catch (error) {
    console.error("Email dispatch failed:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email notifications." },
      { status: 500 }
    );
  }
}
