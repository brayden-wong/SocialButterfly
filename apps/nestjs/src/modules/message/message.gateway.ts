import { UseGuards } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

import { GetUserId } from "src/decorators";
import { WsGuard } from "src/guards";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto";

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage("send message")
  @UseGuards(WsGuard)
  async createMessage(
    @ConnectedSocket()
    socket: Socket,
    @MessageBody()
    message: MessageDto,
    @GetUserId()
    userId: string,
  ) {
    return await this.messageService.createMessage({
      socket,
      ...message,
      authorId: userId,
    });
  }
}
