import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

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
    const { name, price, category, description } = body;

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
        description
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
