import { protectedProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const chatRouter = router({
  getRooms: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;

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

      let userData = { profileImageUrl, username };

      return {
        ...roomData,
        user: userData,
      };
    });

    return Promise.all(data);
  }),
});
