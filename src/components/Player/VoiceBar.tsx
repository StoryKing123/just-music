import appState from "@/store/app";
import audioState from "@/store/audio";
import { getAudio } from "@/utils/audio";
import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

type VoiceBarProps = {
    onHandleMouseDown: () => void;
    onHandleMouseUp: () => void;
};
const VoiceBar: FC<VoiceBarProps> = (props) => {
    const [audio, setAudio] = useRecoilState(audioState);

    console.log("set audio volumne:" + audio.volume);
    const audioElement = getAudio();

    useEffect(() => {
        audioElement.volume = audio.volume;
    }, [audio.volume]);

    const setVolume = (volume: number) => {
        volume < 1 && volume > 0 && setAudio({ ...audio, volume: volume });
    };

    const mouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        let volume = (rect.bottom - e.clientY) / rect.height;
        setVolume(volume);
        props.onHandleMouseDown();
        const mouseMove = (event: MouseEvent) => {
            let volume = (rect.bottom - event.clientY) / rect.height;
            setVolume(volume);
        };

        const mouseUp = () => {
            console.log("up");
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
            props.onHandleMouseUp();
        };
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
    };

    return (
        <div className="w-10 h-40 absolute -top-40 py-4 left-1/2 -translate-x-1/2  items-center  bg-base-player drop-shadow-sm rounded-md flex flex-col">
            <div
                onMouseDown={mouseDown}
                className="py-2  rounded-md relative flex-1 w-1    box-border bg-voice-bar-whole "
            >
                <div
                    className="bg-voice-bar-current  rounded-md absolute bottom-0 w-full"
                    style={{ height: `${audio.volume * 100}%` }}
                >
                    <div className="absolute w-3 h-3 bg-voice-bar-current rounded-full left-1/2 -translate-y-1/2 -translate-x-1/2  top-0  z-20"></div>
                </div>
            </div>
        </div>
    );
};

export default VoiceBar;
