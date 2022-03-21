import musicState from "@/store/music";
import { useRecoilState } from "recoil";

export const useInitMusic = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const initFn = () => {
        const playlist = localStorage.getItem("playlist");
        playlist && setMusic({ ...music, playList: JSON.parse(playlist) });
        // setMusic;
    };
    return initFn;
};
