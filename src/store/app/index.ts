import { THEME } from "@/utils";
import { atom } from "recoil";
export type AppStateType = {
    theme: THEME;
};
const appState = atom<AppStateType>({
    key: "appState",
    default: { theme: THEME.DARK },
});

export default appState;
