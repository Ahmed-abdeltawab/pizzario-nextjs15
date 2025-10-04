import { Environments } from "@/constants/enums";
import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === Environments.DEV
        ? ["query", "error", "warn"] // log all queries in development
        : ["error"], // log only errors in production
  });

if (process.env.NODE_ENV !== Environments.PROD) globalForPrisma.prisma = prisma;

export default prisma;
