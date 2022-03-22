import musicState from "@/store/music";
import { getAudio } from "@/utils/audio";
import { useRecoilState } from "recoil";

export const useInitMusic = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const initFn = () => {
        const playlist = localStorage.getItem("playlist");
        playlist && setMusic({ ...music, playList: JSON.parse(playlist) });

        // const audio = getAudio()
        
        // setMusic;
    };
    return initFn;
};
