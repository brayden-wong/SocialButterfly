import { Module, forwardRef } from "@nestjs/common";
import { ClerkModule, PrismaModule } from "src/modules";
import { MessageGateway } from "./message.gateway";
import { MessageService } from "./message.service";

@Module({
  imports: [ClerkModule, PrismaModule],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
