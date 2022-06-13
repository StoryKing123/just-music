import { THEME } from "@/utils";
import { atom } from "recoil";
export type AppStateType = {
    theme: THEME;
    voice: number;
    isMute: false;
    showDetail: boolean;
};
const appState = atom<AppStateType>({
    key: "appState",
    default: { theme: THEME.DARK, voice: 30, isMute: false, showDetail: false },
});

export default appState;
