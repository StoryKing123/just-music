import { PLAY_MODE, Song } from "@/declare";
import { atom } from "recoil";
export type MusicStateType = {
    currentSong?: Song;
    playList?: Song[];
    mode?: PLAY_MODE;
    isPlaying: boolean;
};
const musicState = atom<MusicStateType>({
    key: "music",
    default: {
        isPlaying: false,
    },
});

export default musicState;
