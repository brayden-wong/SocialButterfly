import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserId = createParamDecorator(
  (data: undefined, ctx: ExecutionContext) => {
    const user = ctx.switchToWs().getClient();
    return user.user["userId"];
  },
);
