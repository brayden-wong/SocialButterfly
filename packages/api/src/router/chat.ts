import { PrismaClient } from "@acme/db";
import { protectedProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import type { SignedInAuthObject } from "@clerk/nextjs/api";

const getUser = async ({
  userId,
  prisma,
}: {
  userId: string;
  prisma: PrismaClient;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  return user;
};

const createUser = async ({
  user,
  prisma,
}: {
  user: SignedInAuthObject;
  prisma: PrismaClient;
}) => {
  const clerkData = await clerkClient.users.getUser(user.userId);

  await prisma.user.create({
    data: {
      id: clerkData.id,
      username: clerkData.username!,
      email: clerkData.emailAddresses[0]!.emailAddress,
    },
  });
};

export const chatRouter = router({
  getRooms: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;

    const user = await getUser({ userId, prisma: ctx.prisma });
    if (!user) {
      await createUser({ user: ctx.auth, prisma: ctx.prisma });
    }

    const rooms = await ctx.prisma.room.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        messages: true,
        users: true,
      },
    });

    rooms.map((room) => {
      room.users = room.users.filter((user) => ctx.auth.userId !== user.id);
    });

    const data = rooms.map(async (room) => {
      const { users, ...roomData } = room;
      const user = await clerkClient.users.getUser(room.users[0]!.id);

      const { profileImageUrl, username } = user;

      if (!profileImageUrl || !username) {
        throw new Error("User is missing profile information");
      }

      const userData = { profileImageUrl, username };

      return {
        ...roomData,
        user: userData,
      };
    });

    return Promise.all(data);
  }),
  createRoom: protectedProcedure.mutation(async ({ ctx, input }) => {
    console.log("create room");
  }),
});
