import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Render("home")
  @Get()
  async index(@Request() req: any) {
    return {
      topUsers: await this.usersService.getTopUsers(),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("auth/me")
  getProfile(@Request() req: any) {
    return req.user;
  }
}
