import { FC, useRef, useState } from "react";
import voiceMeidaSVG from "@/assets/icons/voice-media.svg";
import voiceZeroSVG from "@/assets/icons/voice-zero.svg";
import VoiceBar from "./VoiceBar";
import { useRecoilState, useRecoilValue } from "recoil";
import audioState from "@/store/audio";

type VoiceProps = {};
const Voice: FC<VoiceProps> = (props) => {
    const audio = useRecoilValue(audioState);
    const [showBar, setShowBar] = useState(false);
    const [drag, setDrag] = useState(false);
    const mouseInElement = useRef(false);
    const showVoiceBar = () => {
        mouseInElement.current = true;
        setShowBar(true);
    };
    const hideVoiceBar = () => {
        setShowBar(false);
    };
    const mouseLeave = () => {
        mouseInElement.current = false;
        drag === false && hideVoiceBar();
    };
    console.log(audio.volume);

    const getVoiceSVG = () => {
        if (audio.volume === 0) {
            return voiceZeroSVG;
        } else {
            return voiceMeidaSVG;
        }
    };
    return (
        <div
            className="relative z-10"
            onMouseEnter={showVoiceBar}
            onMouseLeave={mouseLeave}
        >
            {showBar ? (
                <VoiceBar
                    onHandleMouseDown={() => setDrag(true)}
                    onHandleMouseUp={() => {
                        setDrag(false);
                        mouseInElement.current === false && hideVoiceBar();
                    }}
                />
            ) : null}
            <img className="w-4" src={getVoiceSVG()} alt="" />
        </div>
    );
};

export default Voice;
