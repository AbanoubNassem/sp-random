import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Round } from "./round.entity";
import { RoundToUser } from "./round_user.entity";
import { RoundsService } from "./round.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Round, RoundToUser]), UsersModule],
  controllers: [GameController],
  providers: [RoundsService],
  exports: [RoundsService],
})
export class GameModule {}
