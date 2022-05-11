import { THEME } from "@/utils";
import { atom } from "recoil";
export type AudioStateType = {
    volume: number;
    isMute: false;
};
const audioState = atom<AudioStateType>({
    key: "audioState",
    default: { volume: 0.3, isMute: false },
});

export default audioState;
