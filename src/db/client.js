import { PrismaClient } from '@prisma/client';

// Best practice: Create a single, shared instance of the Prisma Client.
const prisma = new PrismaClient();

export default prisma;
