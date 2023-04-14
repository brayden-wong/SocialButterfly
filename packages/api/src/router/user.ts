import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

// import { z } from "zod";

export const userRouter = router({
  createUser: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await clerkClient.users.getUser(ctx.auth.userId);

    await ctx.prisma.user.create({
      data: {
        id: user.id,
        username: user.username!,
        email: user.emailAddresses[0]!.emailAddress,
      },
    });
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });

    return user;
  }),
});
