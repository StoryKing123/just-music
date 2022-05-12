import { FC, useRef, useState } from "react";
import voiceMeidaSVG from "@/assets/icons/voice-media.svg";
import VoiceBar from "./VoiceBar";

type VoiceProps = {};
const Voice: FC<VoiceProps> = (props) => {
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
            <img className="w-4" src={voiceMeidaSVG} alt="" />
        </div>
    );
};

export default Voice;
