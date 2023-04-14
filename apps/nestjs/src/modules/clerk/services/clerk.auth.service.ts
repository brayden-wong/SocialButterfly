import clerk, { setClerkApiKey } from "@clerk/clerk-sdk-node";

import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { IsAuthenticated } from "./types/clerk.auth.types";

@Injectable()
export class ClerkAuthService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    setClerkApiKey(this.config.get("CLERK_API_KEY"));
  }

  async isAuthenticated({ token, sessionId }: IsAuthenticated) {
    const session = await clerk.sessions.verifySession(sessionId, token);

    if (!session)
      return {
        isAuthenticated: false,
      };

    return {
      isAuthenticated: true,
      userId: session.userId,
    };
  }
}
