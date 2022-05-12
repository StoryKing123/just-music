// import { Login } from "@/declare";
import { THEME } from "@/utils";
import { atom } from "recoil";
export type UserStateType = {
    user?: API.Login;
    ip?: string;
};
const userState = atom<UserStateType>({
    key: "userState",
    default: {},
});

export default userState;
