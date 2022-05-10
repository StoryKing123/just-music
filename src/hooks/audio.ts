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
    const playSong = async (song: API.Song) => {
        
        const src = await getSongUrl(song.id,song.name,song.ar[0].name);
        let index = -1;
        playAudio(src);
        //get current index
        if (music.playList) {
            index = music.playList.findIndex((item) => item.id === song.id);
        }
        setMusic({
            ...music,
            currentSong: song,
            currentIndex: index >= 0 ? index : music.currentIndex,
            isPlaying: true,
        });
    };
    const setPlayOrPause = (isPlay: boolean) => {
        isPlay ? playAudio() : pauseAudio();
        setMusic({ ...music, isPlaying: isPlay });
    };
    return [playSong, setPlayOrPause, setDuration];
};
