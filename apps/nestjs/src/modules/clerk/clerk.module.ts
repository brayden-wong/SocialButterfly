import { Module } from "@nestjs/common";
import { ClerkAuthService, ClerkUsersService } from "./services";

@Module({
  providers: [ClerkAuthService, ClerkUsersService],
  exports: [ClerkAuthService, ClerkUsersService],
})
export class ClerkModule {}
