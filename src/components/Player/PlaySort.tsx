import playSortSvg from "@/assets/icons/play-sort.svg";
import playCycleSvg from "@/assets/icons/play-cycle.svg";
import playLoopSvg from "@/assets/icons/play-loop.svg";
import playRandomSvg from "@/assets/icons/play-random.svg";
import { PLAY_MODE } from "@/const";
import music from "@/store/music";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
const PlaySort = () => {
    const [musicState, setMusicState] = useRecoilState(music);
    const playModeSvg: Record<PLAY_MODE, string> = {
        [PLAY_MODE.SEQUENCE]: playSortSvg,
        [PLAY_MODE.LIST_CYCLE]: playLoopSvg,
        [PLAY_MODE.SONG_CYCLE]: playCycleSvg,
        [PLAY_MODE.RANDOM]: playRandomSvg,
    };
    const changeSort = () => {
        toast.info("开发中");
        const index =
            musicState.mode >= Object.keys(PLAY_MODE).length / 2 - 1
                ? 0
                : musicState.mode + 1;
        setMusicState({
            ...musicState,
            mode: index,
        });
    };
    return (
        <>
            <img
                onClick={changeSort}
                className="w-4 cursor-default"
                src={playModeSvg[musicState.mode]}
                alt=""
            />
        </>
    );
};
export default PlaySort;
