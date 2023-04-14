import { router } from "../trpc";
import { authRouter } from "./auth";
import { chatRouter } from "./chat";

export const appRouter = router({
  chat: chatRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
