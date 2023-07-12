import {authService} from "../../services/auth.service";
import Cookies from "js-cookie";
import Router from 'next/router'

export const useLogin = () => {
    const login = async (username: string) => {
        const user = await authService.login(username);
        if (user) {
            Cookies.set("currentUser", JSON.stringify(user));
            Router.reload()

        }
        return user as any;
    };

    return {login};
};