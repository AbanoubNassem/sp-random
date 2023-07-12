import axios, { AxiosInstance } from "axios";
import getAuthorizationHeader from "./headers";

class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: getAuthorizationHeader(),
    });
  }

  login = (name: string) => {
    return this.instance
      .post(
        "/auth/login",
        {
          username: name,
          password: " ",
        },
        { headers: getAuthorizationHeader() },
      )
      .then((res) => {
        return {
          ...res.data.user,
          accessToken: res.data.access_token,
        };
      });
  };

  getMe = () => {
    return this.instance
      .get(`/auth/me`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };
}

export const authService = new AuthService(
  process?.env?.APP_URL ?? "http://localhost:3000",
);
