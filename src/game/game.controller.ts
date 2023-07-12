import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RoundsService } from "./round.service";
import map from "lodash/map";
import { RoundToUser } from "./round_user.entity";
import { UsersService } from "../users/users.service";

@UseGuards(JwtAuthGuard)
@Controller("game")
export class GameController {
  logger = new Logger();

  constructor(
    private roundsService: RoundsService,
    private usersService: UsersService,
  ) {}

  @Post("/bet")
  async bet(@Body() body: any, @Request() req: any) {
    let user = req.user;
    let win = false;
    let bets: Array<RoundToUser> = [];

    if (user.points > body.points) {
      const pointsBeforeBet = user.points;
      const round = await this.roundsService.getCurrentRound();
      bets = await this.roundsService.cpuBets(round);
      bets.push(
        await this.roundsService.bet(
          round,
          req.user,
          body.points,
          body.multiplier,
        ),
      );

      if (pointsBeforeBet > user.points) {
        win = true;
      }
    }

    return {
      win,
      bets,
      points: user.points,
      topUsers: await this.usersService.getTopUsers(),
      multipliers: map(
        await this.roundsService.getRoundsByUser(user),
        (round) => {
          return round.round.multiplier;
        },
      ),
    };
  }
}
