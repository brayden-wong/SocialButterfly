import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import clerk, { setClerkApiKey } from "@clerk/clerk-sdk-node";

@Injectable()
export class ClerkUsersService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    setClerkApiKey(this.config.get("CLERK_API_KEY"));
  }
}
