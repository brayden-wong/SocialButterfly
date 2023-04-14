import { HttpStatus, Inject, Injectable, forwardRef } from "@nestjs/common";

import { ClerkUsersService } from "../clerk";
import { PrismaService } from "src/modules/prisma";

import { CreateMessageDto, MessageDto } from "./dto";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class MessageService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    @Inject(ClerkUsersService)
    private readonly clerkUsersService: ClerkUsersService,
  ) {}

  async createMessage({ authorId, message, roomId, socket }: CreateMessageDto) {
    const newMessage = await this.prisma.message.create({
      data: {
        authorId,
        message,
        roomId,
      },
      select: {
        message: true,
        authorId: true,
      },
    });

    if (!newMessage)
      throw new WsException({
        status: "error",
        message: "could not send message",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });

    socket.to(roomId).emit("messages", {
      roomId,
      newMessage,
    });
  }
}
