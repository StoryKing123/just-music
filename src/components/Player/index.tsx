import { FC, useEffect, useMemo, useState } from "react";
import nextSVG from "@/assets/icons/next-dark.svg";
import pauseSVG from "@/assets/icons/pause-dark.svg";
import playSVG from "@/assets/icons/play-dark.svg";
import previousSVG from "@/assets/icons/previous-dark.svg";
import playlistSVG from "@/assets/icons/playlist.svg";
import Progress from "@/components/Progress";
import PlayerPlayList from "../PlayerPlayList";
import musicState from "@/store/music";
import { useRecoilState, useSetRecoilState } from "recoil";
import { extractObjectArrayAttr } from "@/utils";
import { parseTimestampIntoMinute } from "@/utils/date";
import { getAudio, player } from "@/utils/audio";
import { useAudio } from "@/hooks";
import { PLAY_MODE } from "@/const";
import { throttle } from "lodash";
import Voice from "./Voice";
import appState from "@/store/app";
import PlaySort from "./PlaySort";

const Player: FC = (props) => {
    const [isShowPlayList, setShowPlayList] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [music] = useRecoilState(musicState);
    const setApp = useSetRecoilState(appState);
    const { playSong, playOrPauseSong, playPreviousOrNextSong } = useAudio();
    const memoPlayerPlayList = useMemo(
        () => <PlayerPlayList isShow={isShowPlayList}></PlayerPlayList>,
        [isShowPlayList]
    );

    const handlePlayListClick = () => {
        setShowPlayList(!isShowPlayList);
    };
    // const audio = getAudio();

    const handleTimeUpEvent = () => {
        console.log("seek");
        if (!player) {
            return;
        }
        setCurrentTime(+player?.seek() * 1000);
    };

    const handlePlayOrPause = () => {
        playOrPauseSong();
    };
    const VoiceMemo = useMemo(() => Voice, []);

    const handlePlayPreviousOrNextSong = (type: "next" | "previous") => {
        playPreviousOrNextSong(type);
    };

    const handleEnded = async () => {
        if (music.mode === PLAY_MODE.SEQUENCE) {
            await handlePlayPreviousOrNextSong("next");
        }
    };
    const handleUpdateTime = () => {
        setCurrentTime(player.seek() * 1000);
        setTimeout(handleUpdateTime,500);
    };

    const handleTimeUpEventThrottle = throttle(handleTimeUpEvent, 1000);
    useEffect(() => {
        player.on("end", handleEnded);
        player.on("seek", handleTimeUpEventThrottle);
        handleUpdateTime();
        // audio.addEventListener("timeupdate", handleTimeUpEventThrottle);
        // audio.addEventListener("ended", handleEnded);
        return () => {
            player.off("end", handleEnded);
            player.off("seek", handleTimeUpEventThrottle);
            // audio.removeEventListener("timeupdate", handleTimeUpEventThrottle);
            // audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    return (
        <div className="select-none z-50 fixed h-16 bottom-0 w-screen bg-base-player ">
            <Progress currentTime={currentTime}></Progress>
            {memoPlayerPlayList}
            <div className="px-16 flex items-center h-full">
                {music.currentSong && (
                    <div className="flex items-center gap-4 w-1/3 truncate">
                        <img
                            src={music.currentSong.al.picUrl}
                            onClick={() =>
                                setApp((app) => ({
                                    ...app,
                                    showDetail: !app.showDetail,
                                }))
                            }
                            alt=""
                            className="w-10 h-10 rounded-sm cursor-pointer"
                        />
                        <div className="text-left  ">
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
                                {player.duration()
                                    ? parseTimestampIntoMinute(
                                          player.duration() * 1000
                                      )
                                    : parseTimestampIntoMinute(
                                          music.currentSong.dt
                                      )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 m-auto absolute left-1/2 -translate-x-1/2">
                    <img
                        className="w-6 "
                        src={previousSVG}
                        onClick={() => handlePlayPreviousOrNextSong("previous")}
                        alt=""
                    />
                    <img
                        className="w-10"
                        onClick={handlePlayOrPause}
                        src={music.isPlaying ? pauseSVG : playSVG}
                        alt=""
                    />
                    <img
                        className="w-6"
                        onClick={() => handlePlayPreviousOrNextSong("next")}
                        src={nextSVG}
                        alt=""
                    />
                </div>
                <div className="flex gap-4  ml-auto relative ">
                    <PlaySort></PlaySort>

                    <img
                        className="w-4"
                        onClick={handlePlayListClick}
                        src={playlistSVG}
                        alt=""
                    />

                    {/* <Voice></Voice> */}
                    <VoiceMemo />
                </div>
            </div>
        </div>
    );
};
export default Player;
