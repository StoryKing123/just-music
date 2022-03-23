import { PLAY_MODE } from "@/declare";
import { getSongUrl } from "@/services/song";
import appState from "@/store/app";
import musicState from "@/store/music";
import { getAudio } from "@/utils/audio";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useInitMusic = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const initFn = () => {
        const playlist = localStorage.getItem("playlist");
        playlist && setMusic({ ...music, playList: JSON.parse(playlist) });
    };
    return initFn;
};

// const handleGetSongUrl = async (id: number) => {
//     const res = await getSongUrl(id);
//     return res;
// };

// const getPlayIndex = (currentIndex: number, type: "next" | "previous") => {
//     if (!music.playList) {
//         return;
//     }
//     if (type === "previous") {
//         if (currentIndex <= 0) {
//             return music.playList.length - 1;
//         } else {
//             return currentIndex - 1;
//         }
//     } else {
//         if (currentIndex >= music.playList.length) {
//             return 0;
//         } else {
//             return currentIndex + 1;
//         }
//     }
// };

// let isProcessing = false;
// export const handlePlayPreviousOrNextSong = (type: "next" | "previous") => {
//     if (isProcessing) {
//         return;
//     }
//     if (!music.currentSong) {
//         return;
//     }
//     const isEqual = (item: Song) => item.id === music.currentSong?.id;
//     const currentIndex = music.playList?.findIndex(isEqual);
//     const playIndex = currentIndex && getPlayIndex(currentIndex, type);
//     playIndex && music.playList && handlePlaySong(music.playList[playIndex]);
//     isProcessing = false;
// };

export const useEffectMusicRegister = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const [app, setApp] = useRecoilState(appState);
    const audio = getAudio();
    const handleEnded = () => {
        if (music.mode === PLAY_MODE.SEQUENCE) {
        }
    };

    useEffect(() => {
        audio.addEventListener("ended", handleEnded);
    }, []);
};
