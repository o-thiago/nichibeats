import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient = null!;

if (!prisma) {
    prisma = new PrismaClient()
}
