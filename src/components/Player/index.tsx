import { FC, useEffect, useState } from "react";
import nextSVG from "@/assets/icons/next-dark.svg";
import pauseSVG from "@/assets/icons/pause.svg";
import playSVG from "@/assets/icons/play-dark.svg";
import previousSVG from "@/assets/icons/previous-dark.svg";
import playlistSVG from "@/assets/icons/playlist.svg";
import voiceMeidaSVG from "@/assets/icons/voice-media.svg";
import Progress from "@/components/Progress";
import PlayerPlayList from "../PlayerPlayList";
import musicState from "@/store/music";
import { useRecoilState } from "recoil";
import { extractObjectArrayAttr } from "@/utils";
import { parseTimestampIntoMinute } from "@/utils/date";
import { getAudio } from "@/utils/audio";
import { useAudio } from "@/hooks";

// const AudioCurrentTime = () => {
//     const [time, setTime] = useState("00:00");

//     return <>{time}</>;
// };

const Player: FC = (props) => {
    const [isShowPlayList, setShowPlayList] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [music] = useRecoilState(musicState);
    const [, playOrPauseAudio] = useAudio();
    const handlePlayListClick = () => {
        setShowPlayList(!isShowPlayList);
    };
    const audio = getAudio();

    const handleTimeUpEvent = () => {
        setCurrentTime(+audio.currentTime * 1000);
    };

    const handlePlayOrPause = () => {
        // console.log('sdf')
        playOrPauseAudio(false);
    };

    useEffect(() => {
        audio.addEventListener("timeupdate", handleTimeUpEvent);
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpEvent);
        };
    });
    // useEffect(() => {}, []);
    return (
        <div className=" fixed h-16 bottom-0 w-screen bg-base-player ">
            <Progress currentTime={currentTime}></Progress>
            <PlayerPlayList isShow={isShowPlayList}></PlayerPlayList>
            <div className="px-16 flex items-center h-full">
                {music.currentSong && (
                    <div className="flex items-center gap-4">
                        <img
                            src={music.currentSong.al.picUrl}
                            alt=""
                            className="w-10 h-10 rounded-sm"
                        />
                        <div className="text-left">
                            <div>
                                {music.currentSong.name}{" "}
                                <span>
                                    -{" "}
                                    {extractObjectArrayAttr(
                                        music.currentSong.ar,
                                        "name"
                                    ).join(" ")}
                                </span>
                            </div>
                            <div>
                                {parseTimestampIntoMinute(currentTime)} /{" "}
                                {parseTimestampIntoMinute(
                                    audio.duration * 1000
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 m-auto">
                    <img className="w-6" src={previousSVG} alt="" />
                    <img
                        className="w-10"
                        onClick={handlePlayOrPause}
                        src={playSVG}
                        alt=""
                    />
                    <img className="w-6" src={nextSVG} alt="" />
                </div>
                <div className="flex gap-4  ml-auto relative ">
                    <img
                        className="w-4"
                        onClick={handlePlayListClick}
                        src={playlistSVG}
                        alt=""
                    />
                    <img className="w-4" src={voiceMeidaSVG} alt="" />
                </div>
            </div>
        </div>
    );
};
export default Player;
