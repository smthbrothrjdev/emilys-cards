import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const wordcardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wordcard.findMany();
  }),
});
