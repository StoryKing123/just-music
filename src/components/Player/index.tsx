import { FC, useState } from "react";
import nextSVG from "@/assets/icons/next-dark.svg";
import pauseSVG from "@/assets/icons/pause.svg";
import playSVG from "@/assets/icons/play-dark.svg";
import previousSVG from "@/assets/icons/previous-dark.svg";
import playlistSVG from "@/assets/icons/playlist.svg";
import voiceMeidaSVG from "@/assets/icons/voice-media.svg";
import Progress from "@/components/Progress";
import PlayerPlayList from "../PlayerPlayList";

const Player: FC = (props) => {
    const [isShowPlayList, setShowPlayList] = useState(true);
    const handlePlayListClick = () => {
        setShowPlayList(!isShowPlayList);
    };
    return (
        <div className=" fixed h-16 bottom-0 w-screen bg-base-player ">
            <Progress></Progress>
            <PlayerPlayList isShow={isShowPlayList}></PlayerPlayList>

            <div className="px-16 flex items-center h-full">
                <div className="flex items-center gap-4">
                    <img
                        src="https://i.ytimg.com/vi/GoQ85cs5fk0/sddefault.jpg?sqp=-oaymwEWCJADEOEBIAQqCghqEJQEGHgg6AJIWg&rs=AMzJL3nDgLbSI4yAyd6Sc2H5GuFwba5elw"
                        alt=""
                        className="w-10 h-10 rounded-sm"
                    />
                    <div className="text-left">
                        <div>
                            以后 <span>- 陈柏宇</span>{" "}
                        </div>
                        <div>01:02 / 03:37</div>
                    </div>
                </div>
                <div className="flex gap-2 m-auto">
                    <img className="w-6" src={previousSVG} alt="" />
                    <img className="w-10" src={playSVG} alt="" />
                    <img className="w-6" src={nextSVG} alt="" />
                </div>
                <div className="flex gap-4  ml-auto relative ">
                    <img className="w-4" onClick={handlePlayListClick} src={playlistSVG} alt="" />
                    <img className="w-4" src={voiceMeidaSVG} alt="" />
                </div>
            </div>
        </div>
    );
};
export default Player;
