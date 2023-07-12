import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AuthService } from "./auth.service";

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken = client.handshake.headers.authorization?.split(" ")[1];
      const user = await this.authService.getUserByJWT(authToken ?? "");

      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err: any) {
      throw new WsException(err.message);
    }
  }
}
