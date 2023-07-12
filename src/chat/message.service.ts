import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./message.entity";
import { User } from "../users/user.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async addMsg(user: User, msg: string): Promise<Message> {
    const message = this.messagesRepository.create({
      text: msg,
      userId: user.id,
      user: user,
    });
    return await this.messagesRepository.save(message);
  }

  async getLatestMessages(): Promise<Array<Message>> {
    return await this.messagesRepository.find({
      relations: {
        user: true,
      },
      order: {
        created_at: "DESC",
      },
      take: 20,
    });
  }
}
