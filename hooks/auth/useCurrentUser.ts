import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authService } from "../../services/auth.service";

export const useCurrentUser = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const currentUser = Cookies.get("currentUser") as any;
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const refetchUser = async () => {
        const currentUser = Cookies.get("currentUser");
        if(!currentUser) return;

        const userInfo = await authService.getMe();


        if (userInfo && currentUser) {
            const newUser = {
                ...JSON.parse(currentUser),
                ...userInfo,
            };
            Cookies.set("currentUser", JSON.stringify(newUser));
            setUser(newUser);
        }
    };

    return { user, refetchUser };
};