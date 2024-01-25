import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaBase = globalPrisma.prisma || new PrismaClient();

export const prisma = prismaBase.$extends(withAccelerate()).$extends({
  query: {
    cart: {
      async update({ args, query }) {
        args.data = { ...args.data, updatedAt: new Date() };
        return query(args);
      },
    },
  },
});

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prismaBase;
