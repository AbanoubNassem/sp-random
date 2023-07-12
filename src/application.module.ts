import { Module } from "@nestjs/common";
import { RenderModule } from "nest-next";
import Next from "next";
import { AppController } from "./app.controller";
import { ChatGateway } from "./chat/chat.gateway";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Message } from "./chat/message.entity";
import { ChatModule } from "./chat/chat.module";
import { GameModule } from "./game/game.module";
import { Round } from "./game/round.entity";
import { RoundToUser } from "./game/round_user.entity";

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== "production",
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "game.db",
      entities: [User, Message, Round, RoundToUser],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [ChatGateway],
})
export class AppModule {}
