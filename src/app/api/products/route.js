import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const revalidate = 10;

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("[Products GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
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
