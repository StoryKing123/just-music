import { FC, useState } from "react";
import voiceMeidaSVG from "@/assets/icons/voice-media.svg";
import VoiceBar from "./VoiceBar";

type VoiceProps = {};
const Voice: FC<VoiceProps> = (props) => {
    const [showBar, setShowBar] = useState(false);
    const showVoiceBar = () => {
        setShowBar(true);
    };
    return (
        <div
            className="relative z-10"
            onMouseEnter={showVoiceBar}
            // onMouseLeave={() => setShowBar(false)}
        >
            {showBar ? <VoiceBar /> : null}
            <img className="w-4" src={voiceMeidaSVG} alt="" />
        </div>
    );
};

export default Voice;
