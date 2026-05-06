import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

// Ensure .env is loaded from the server root
dotenv.config({ path: path.join(process.cwd(), '.env') });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
