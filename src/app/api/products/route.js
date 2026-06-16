import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const revalidate = 10;

export async function GET() {
  const staticBackup = [
    {
      id: "1",
      name: "Stitch Cute Plush Toy",
      price: 2400.0,
      category: "Merch",
      colors: "Blue,Pink",
      sizes: "Small,Medium,Large",
      imageAlt: "Premium soft-stuffed Stitch cute plush toy",
      description: "A super soft, premium quality Stitch plush toy."
    },
    {
      id: "2",
      name: "Customized Ceramic Mug + Gift Box",
      price: 1950.0,
      category: "Merch",
      colors: "Matte Black,Matte Sage,Matte White",
      sizes: "Standard",
      imageAlt: "Matte-finished customized ceramic mug",
      description: "Matte-finished customized ceramic mug packaged in an elegant, signature dark gift box."
    },
    {
      id: "3",
      name: "Handmade Rose Bouquet Hamper",
      price: 4500.0,
      category: "Specials",
      colors: "Crimson Red,Blush Pink",
      sizes: "Medium",
      imageAlt: "Handmade selection red and pink roses bouquet",
      description: "A premium floral arrangement featuring handmade, selected red and pink roses."
    }
  ];

  try {
    const queryPromise = prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });

    const timeoutPromise = new Promise((resolve) =>
      setTimeout(() => resolve("timeout"), 1500)
    );

    const result = await Promise.race([queryPromise, timeoutPromise]);

    if (result === "timeout") {
      console.warn("[Products GET]: Database query timed out. Returning static backup.");
      return NextResponse.json(staticBackup, { status: 200 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("[Products GET Error]:", error);
    return NextResponse.json(staticBackup, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, category, description, colors, sizes, imageAlt } = body;

    if (!name || price === undefined || !category) {
      return NextResponse.json(
        { error: "Product Name, Price, and Category are required." },
        { status: 400 }
      );
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return NextResponse.json(
        { error: "Price must be a valid positive number." },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: priceNum,
        category,
        description,
        colors: colors || "",
        sizes: sizes || "",
        imageAlt: imageAlt || ""
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("[Products POST Error]:", error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}
