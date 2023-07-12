import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoundToUser } from "./round_user.entity";

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  multiplier: number;

  @OneToMany(() => RoundToUser, (roundToUser) => roundToUser.user)
  public users: RoundToUser[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
