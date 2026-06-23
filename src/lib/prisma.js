import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

let prisma;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Optimize max connections for serverless container reuse
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
  globalForPrisma.prisma = prisma;
}

export { prisma };

