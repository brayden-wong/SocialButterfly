import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ClerkAuthService } from "src/modules/clerk";

@Injectable()
export class WsGuard extends AuthGuard("jwt") {
  constructor(
    @Inject(ClerkAuthService)
    private readonly clerkService: ClerkAuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const headers = client.handshake.headers;

    if (!headers.authorization) return false;

    const { authorization, sessionId } = headers;

    const { isAuthenticated, userId } = await this.clerkService.isAuthenticated(
      {
        token: authorization,
        sessionId,
      },
    );

    if (!isAuthenticated) return false;

    if (!!isAuthenticated) {
      client["user"] = {
        userId,
      };
      return true;
    }

    return false;
  }
}
