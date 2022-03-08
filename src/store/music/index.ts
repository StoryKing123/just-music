import { PLAY_MODE } from "@/declare";
import { atom } from "recoil";
export type MusicStateType = {
    currentSong?: any;
    playList?: any;
    mode?: PLAY_MODE;
    isPlaying?: boolean;
};
const musicState = atom<MusicStateType>({ key: "music", default: {} });

export default musicState;
