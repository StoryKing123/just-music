// import { PLAY_MODE, Song } from "@/declare";
import { PLAY_MODE } from "@/const";
import { atom } from "recoil";
export type MusicStateType = {
    currentSong?: API.Song;
    playList?: API.Song[];
    mode?: PLAY_MODE;
    isPlaying: boolean;
};
const musicState = atom<MusicStateType>({
    key: "music",
    default: {
        isPlaying: false,
        mode: PLAY_MODE.SEQUENCE,
    },
});

export default musicState;
