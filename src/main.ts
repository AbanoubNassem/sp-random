import { NestFactory } from "@nestjs/core";
import { AppModule } from "./application.module";
import { UsersService } from "./users/users.service";

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  const users = server.get(UsersService);
  await users.cpusSeed();
  await server.listen(3000);
}

bootstrap();
