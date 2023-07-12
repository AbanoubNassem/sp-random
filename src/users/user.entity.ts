import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../chat/message.entity";
import { RoundToUser } from "../game/round_user.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  points: number;

  @OneToMany((type) => Message, (message) => message.userId)
  messages: Message[];

  @OneToMany(() => RoundToUser, (roundToUser) => roundToUser.round)
  public rounds: RoundToUser[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
