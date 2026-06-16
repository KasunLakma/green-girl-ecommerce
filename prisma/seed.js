const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// Simple environment configuration loader for standalone node runtime
const envLocalPath = path.resolve(__dirname, "../.env.local");
const envPath = path.resolve(__dirname, "../.env");

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  let envContent = "";
  if (fs.existsSync(envLocalPath)) {
    envContent = fs.readFileSync(envLocalPath, "utf-8");
  } else if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, "utf-8");
  }
  const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
  if (match) {
    databaseUrl = match[1];
  }
}

if (!databaseUrl) {
  console.error("DATABASE_URL is not defined in any .env files.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding product inventory rows into the PostgreSQL database...");

  // Truncate existing records to prevent unique constraints violations
  await prisma.product.deleteMany({});

  const products = [
    {
      name: "Stitch Cute Plush Toy",
      price: 2400.0,
      category: "Merch",
      description: "A super soft, premium quality Stitch plush toy. Crafted with extra plush materials and fine detailed stitching, making it the perfect luxury gift for Disney collectors and children alike.",
      colors: "Blue,Pink",
      sizes: "Small,Medium,Large",
      imageAlt: "Premium soft-stuffed Stitch cute plush toy"
    },
    {
      name: "Customized Ceramic Mug + Gift Box",
      price: 1950.0,
      category: "Merch",
      description: "Matte-finished customized ceramic mug packaged in an elegant, signature dark gift box. Perfect for coffee lovers, workspace decor, or a high-quality personalized gift.",
      colors: "Matte Black,Matte Sage,Matte White",
      sizes: "Standard",
      imageAlt: "Matte-finished customized ceramic mug"
    },
    {
      name: "Handmade Rose Bouquet Hamper",
      price: 4500.0,
      category: "Specials",
      description: "A premium floral arrangement featuring handmade, selected red and pink roses beautifully displayed inside a dark boutique gift box, accompanied by custom gift treats.",
      colors: "Crimson Red,Blush Pink",
      sizes: "Medium",
      imageAlt: "Handmade selection red and pink roses bouquet"
    },
    {
      name: "Premium Executive Gel Pen (Atlas Blueprint)",
      price: 1250.0,
      category: "Merch",
      description: "A premium executive gel pen with an ergonomic design and fluid ink flow. Perfectly weighted for a signature writing experience.",
      colors: "Blue,Red,Black",
      sizes: "0.5mm,0.7mm",
      imageAlt: "Executive gel pen with blueprint metal body"
    }
  ];

  for (const product of products) {
    const created = await prisma.product.create({
      data: product
    });
    console.log(`Successfully created product: ${created.name} (${created.id})`);
  }

  console.log("Database seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Database seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
