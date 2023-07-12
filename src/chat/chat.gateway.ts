import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { MessageService } from "./message.service";
import { WsJwtGuard } from "../auth/ws-jwt.guard";
import { Request, UseGuards } from "@nestjs/common";

@UseGuards(WsJwtGuard)
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  // @ts-ignore
  server: Server;

  constructor(private messageService: MessageService) {}

  @SubscribeMessage("messages")
  async messages(@MessageBody() data: any) {
    return {
      event: "messages",
      data: await this.messageService.getLatestMessages(),
    };
  }

  @SubscribeMessage("newMessage")
  async newMessage(@MessageBody() data: any, @Request() req: any) {
    await this.messageService.addMsg(req.user, data[0]);

    this.server.emit("messages", await this.messageService.getLatestMessages());
  }
}
