import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Round } from "./round.entity";

@Entity()
export class RoundToUser {
  @PrimaryGeneratedColumn()
  public roundToUserId: number;

  @Column()
  public userId: number;

  @Column()
  public roundId: number;

  @Column()
  public points: number;

  @Column()
  public multiplier: number;

  @ManyToOne(() => User, (user) => user.rounds)
  public user: User;

  @ManyToOne(() => Round, (round) => round.users)
  public round: Round;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
