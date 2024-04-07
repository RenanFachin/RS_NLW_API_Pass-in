import { PrismaClient } from "@prisma/client";

// conexão com o db
export const prisma = new PrismaClient({
  log: ['query']
})
