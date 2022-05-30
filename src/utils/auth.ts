import { UserStateType } from "@/store/user";

export const checkLogin = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
        return false;
    }

    const user = JSON.parse(userStr);

    if (user === null || !user.account) {
        return false;
    }
    return user as UserStateType["user"];
};
