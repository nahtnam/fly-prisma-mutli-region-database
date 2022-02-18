import { PrismaClient } from '@prisma/client';

export const writablePrisma = new PrismaClient({ log: ['query'] });
export const prisma = new PrismaClient({ log: ['warn', 'error', 'info'] });

prisma.$use(async (params, next) => {
  const { action, model, args } = params;

  if (action === 'create' && model) {
    const fun = (writablePrisma as any)[model][action];
    return await fun(args);
  }

  return await next(params);
});
