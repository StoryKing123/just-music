import musicState from "@/store/music";
import { getAudio, setAudioCurrentTime } from "@/utils/audio";
import { FC, MouseEvent, useEffect, useLayoutEffect } from "react";
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
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        // console.log("123");
        // console.log(e);
        // console.log(e.currentTarget.offsetWidth);
        console.log(e.clientX / e.currentTarget.offsetWidth);
        setAudioCurrentTime(e.clientX / e.currentTarget.offsetWidth);
    };
    return (
        <div className="absolute top-0 w-full h-0.5 bg-progress-whole">
            <div
                className="bg-red h-2  absolute z-10 w-full -translate-y-1/2"
                onClick={handleClick}
            ></div>
            <div
                style={{ width: `${width}%` }}
                className="  bg-progress-current h-full"
            ></div>
        </div>
    );
};
export default Progress;
