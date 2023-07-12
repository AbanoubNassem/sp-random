import axios, { AxiosInstance } from "axios";
import getAuthorizationHeader from "./headers";

class BetService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: getAuthorizationHeader(),
    });
  }

  bet = async (points: number, multiplier: number) => {
    const res = await this.instance.post("/game/bet", {
      points,
      multiplier,
    });
    return res.data;
  };
}

export const betService = new BetService(
  process?.env?.APP_URL ?? "http://localhost:3000",
);
