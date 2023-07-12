import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async createUser(name: string): Promise<any> {
    return await this.usersService.findOrCreateOne(name);
  }

  async getUserByJWT(token: string): Promise<any> {
    const decode = this.jwtService.verify(token);
    if (decode) {
      return await this.usersService.findOrCreateOne(decode.username);
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
