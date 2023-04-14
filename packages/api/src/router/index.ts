import { router } from "../trpc";
import { authRouter } from "./auth";
import { chatRouter } from "./chat";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  chat: chatRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
