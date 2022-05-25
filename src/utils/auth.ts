import { UserStateType } from "@/store/user";

export const checkLogin = () => {
    const userStr = localStorage.getItem("user");
    console.log(userStr);

    if (!userStr) {
        return false;
    }

    const user = JSON.parse(userStr);
    console.log(user);

    if (user === null || !user.account) {

        return false;
    }
    return user as UserStateType['user'];
};
