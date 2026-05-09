import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Required for Neon serverless in Node.js environments
if (typeof WebSocket === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = global;

const createPrismaClient = () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    console.log('Initializing Prisma with connection string:', connectionString ? 'FOUND' : 'MISSING');
    
    if (!connectionString || connectionString.includes('PASTE_YOUR_NEON')) {
      console.warn('DATABASE_URL is missing or invalid. Prisma Client will not be functional.');
      return new PrismaClient();
    }
    
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    
    console.log('Prisma Adapter created successfully');
    
    return new PrismaClient({
      adapter,
      log: ['query', 'error', 'warn'],
    });
  } catch (error) {
    console.error('CRITICAL: Failed to initialize Prisma Client:', error);
    // Return a default client so the module still exports something valid
    return new PrismaClient();
  }
};

let prismaInstance;
try {
  prismaInstance = globalForPrisma.prisma || createPrismaClient();
} catch (e) {
  console.error('Module-level Prisma initialization failed:', e);
  prismaInstance = new PrismaClient();
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
