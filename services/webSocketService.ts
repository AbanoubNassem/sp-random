import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

class WebSocketService {
  protected readonly instance: Socket;

  public constructor(url: string) {
    this.instance = io(url, {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${JSON.parse(Cookies.get("currentUser") ?? "{}")
          ?.accessToken}`,
      },
    });
  }

  public connect = () => {
    this.instance.connect();
    return this;
  };

  public disconnect = () => {
    this.instance.disconnect();
    return this;
  };

  public emit = (event: string, ...args: any[]): this => {
    this.instance.emit(event, args);
    return this;
  };

  public on = (event: string, listener: (...args: any[]) => void): this => {
    this.instance.on(event, listener);
    return this;
  };
}

export const webSocketService = new WebSocketService(
  process?.env?.APP_URL ?? "http://localhost:3000",
);
