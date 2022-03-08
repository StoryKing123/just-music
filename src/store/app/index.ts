import { THEME } from "@/utils";
import { atom } from "recoil";
export type AppStateType = {
    theme: THEME;
    voice?: any;
};
const appState = atom<AppStateType>({
    key: "appState",
    default: { theme: THEME.DARK },
});

export default appState;
