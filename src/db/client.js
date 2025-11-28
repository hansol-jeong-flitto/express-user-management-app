import * as Prisma from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import config from '../config/config.js';

const pool = new Pool({ connectionString: config.databaseUrl });
const adapter = new PrismaPg(pool);

const prisma = new Prisma.PrismaClient({ adapter });

export default prisma;
