import musicState from "@/store/music";
import { getAudio } from "@/utils/audio";
import { FC, useEffect, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";

type ProgressType = {
    currentTime?: number;
};
const Progress: FC<ProgressType> = (props) => {
    const [music] = useRecoilState(musicState);
    let width = 0;
    if (props.currentTime && music.currentSong) {
        width = (props.currentTime / music.currentSong.dt) * 100;
    }
    return (
        <div className="absolute top-0 w-full h-0.5 bg-progress-whole">
            <div
                style={{ width: `${width}%` }}
                className="  bg-progress-current h-full"
            ></div>
        </div>
    );
};
export default Progress;
