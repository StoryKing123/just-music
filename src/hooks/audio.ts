// import { Song } from "@/declare";
import { getSongUrl } from "@/services/song";
import appState from "@/store/app";
import musicState from "@/store/music";
import { pauseAudio, playAudio, toggleAudio } from "@/utils/audio";
import { useRecoilState } from "recoil";

export const useAudio = (): [
    (song: API.Song) => void,
    (isPlay: boolean) => void,
    any
] => {
    const [app, setApp] = useRecoilState(appState);
    const [music, setMusic] = useRecoilState(musicState);
    const setDuration = () => {};
    // const playSong = () => {};
    const playSong = async (song: API.Song) => {
        const src = await getSongUrl(song.id);
        playAudio(src);
        setMusic({ ...music, currentSong: song, isPlaying: true });
    };
    // const playSong = (song: API.Song, src: string) => {
    //     playAudio(src);
    //     setMusic({ ...music, currentSong: song, isPlaying: true });
    // };
    const setPlayOrPause = (isPlay: boolean) => {
        isPlay ? playAudio() : pauseAudio();
        setMusic({ ...music, isPlaying: isPlay });
    };
    return [playSong, setPlayOrPause, setDuration];
};
