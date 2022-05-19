import { PLAY_MODE } from "@/const";
import { getSongUrl } from "@/services/song";
import appState from "@/store/app";
import musicState, { MusicStateType } from "@/store/music";
import { getAudio, setAudioSrc } from "@/utils/audio";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useInitMusic = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const initFn = () => {
        // const playlist = localStorage.getItem("playlist");
        // playlist &&
        //     playlist !== "undefined" &&
        //     setMusic({ ...music, playList: JSON.parse(playlist) });
        const updateSrc = (currentSong: API.Song) => {
            const { id, name, ar } = currentSong;
            getSongUrl(id, name, ar[0].name).then((res) => {
                setAudioSrc(res);
            });
        };
        const musicStorage = localStorage.getItem("music");
        if (musicStorage && musicStorage !== "undefined") {
            const musicState = JSON.parse(musicStorage) as MusicStateType;
            musicState.currentSong && updateSrc(musicState.currentSong);
            setMusic(musicState);
        }
    };
    return initFn;
};

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
