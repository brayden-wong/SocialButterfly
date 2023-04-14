import { Socket } from "socket.io";

export class MessageDto {
  message: string;
  roomId: string;
}

export class CreateMessageDto {
  socket: Socket;
  message: string;
  roomId: string;
  authorId: string;
}
