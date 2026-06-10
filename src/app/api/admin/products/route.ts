import { NextResponse } from "next/server";

// Mock catalog state for REST requests
let mockCatalog = [
  { id: "1", name: "The Sage Retreat Box", price: 68.0, stock: 24, category: "Curated Boxes" },
  { id: "2", name: "Spotted Pilea Peperomioides", price: 24.0, stock: 42, category: "Botanicals" },
  { id: "3", name: "Speckled Oat Ceramic Mug", price: 32.0, stock: 9, category: "Ceramics" },
];

export async function GET() {
  // Returns complete database list
  return NextResponse.json({
    success: true,
    data: mockCatalog,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock, category } = body;

    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json({
        success: false,
        message: "Missing required product fields (name, price, stock).",
      }, { status: 400 });
    }

    const newProduct = {
      id: `${mockCatalog.length + 1}`,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category: category || "Uncategorized",
    };

    mockCatalog.push(newProduct);

    return NextResponse.json({
      success: true,
      message: "Product node added successfully to repository.",
      data: newProduct,
    }, { status: 201 });
  } catch (error) {
    console.error("[Admin API Products Error]:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to process administrative insert.",
    }, { status: 500 });
  }
}
