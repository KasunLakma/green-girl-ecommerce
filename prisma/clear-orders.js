const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const fs = require("fs");
const path = require("path");

// Load connection URL
const envLocalPath = path.resolve(__dirname, "../.env.local");
let databaseUrl = "";
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
  if (match) {
    databaseUrl = match[1];
  }
}

if (!databaseUrl) {
  console.error("DATABASE_URL not found.");
  process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Clearing all records from the Order table...");
  const count = await prisma.order.deleteMany({});
  console.log(`Cleared ${count.count} orders.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
