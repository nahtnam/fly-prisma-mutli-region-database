import { Prisma, PrismaClient } from '@prisma/client';

// It is best to define the `readOperations` because if something new is added to prisma, the safest thing to do would be to send it to the write instance
const readOperations: Array<Prisma.PrismaAction> = [
  'aggregate',
  'count',
  'findFirst',
  'findMany',
  'findUnique',
  'queryRaw',
];

export const writablePrisma = new PrismaClient({ log: ['query'] });
export const prisma = new PrismaClient({
  log: ['query'],
  datasources: { db: { url: process.env.DATABASE_URL_READ || process.env.DATABASE_URL } },
});

prisma.$use(async (params, next) => {
  const { action, model, args } = params;

  if (model && !readOperations.includes(action)) {
    const writableNext = (writablePrisma as any)[model][action];
    return await writableNext(args);
  }

  return await next(params);
});
