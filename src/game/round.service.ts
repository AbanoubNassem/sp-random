import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Round } from "./round.entity";
import { RoundToUser } from "./round_user.entity";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";

@Injectable()
export class RoundsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Round)
    private roundsRepo: Repository<Round>,
    @InjectRepository(RoundToUser)
    private roundToUserRepo: Repository<RoundToUser>,
  ) {}

  async getCurrentRound() {
    // const fiveMinutesAgo = new Date();
    // fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    // let round = await this.roundsRepo.findOne({
    //   where: {
    //     created_at: MoreThanOrEqual(fiveMinutesAgo),
    //   },
    //   relations: ["users", "users.user"],
    // });
    //
    // if (!round) {
    const multiplier = +(Math.random() * (10 - 0.25) + 0.25).toFixed(2);
    let round = this.roundsRepo.create({ multiplier });
    round = await this.roundsRepo.save(round);
    // }

    return round;
  }

  async bet(
    currentRound: Round,
    user: User,
    points: number,
    multiplier: number,
  ) {
    // const dbUser = await this.usersService.findOrCreateOne(user.name);

    if (currentRound.multiplier <= multiplier) {
      //win
      user.points += points * multiplier;
    } else {
      //lose
      user.points -= points;
    }

    const roundRecord = this.roundToUserRepo.create({
      user: user,
      round: currentRound,
      points,
      multiplier,
    });

    await this.usersService.update(user);
    return await this.roundToUserRepo.save(roundRecord);
  }

  public async cpuBets(currentRound: Round) {
    const cpus = await this.usersService.getCPUs();
    const bets = [];

    for (const cpu of cpus) {
      const multiplier = +(Math.random() * (10 - 0.25) + 0.25).toFixed(2);
      const points = Math.min(
        Math.floor(Math.random() * (cpu.points - 25) + 25),
        cpu.points,
      );

      bets.push(await this.bet(currentRound, cpu, points, multiplier));
    }

    return bets;
  }

  public async getRoundsByUser(user: User) {
    return this.roundToUserRepo.find({
      where: {
        userId: user.id,
      },
      order: {
        created_at: "DESC",
      },
      take: 10,
      relations: {
        round: true,
      },
    });
  }
}
