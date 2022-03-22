import { FC, useEffect, useState } from "react";
import nextSVG from "@/assets/icons/next-dark.svg";
import pauseSVG from "@/assets/icons/pause-dark.svg";
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
import { Song } from "@/declare";
import { getSongUrl } from "@/services/song";

const Player: FC = (props) => {
    const [isShowPlayList, setShowPlayList] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [music] = useRecoilState(musicState);
    const [playSong, playOrPauseAudio] = useAudio();

    const handlePlayListClick = () => {
        setShowPlayList(!isShowPlayList);
    };
    const audio = getAudio();

    const handleTimeUpEvent = () => {
        setCurrentTime(+audio.currentTime * 1000);
    };

    const handlePlayOrPause = () => {
        // console.log('sdf')
        playOrPauseAudio(music.isPlaying ? false : true);
    };

    const handlePlaySong = async (song: Song) => {
        const url = await handleGetSongUrl(song.id);
        playSong(song, url);
    };
    const handleGetSongUrl = async (id: number) => {
        const res = await getSongUrl(id);
        return res;
    };

    const getPlayIndex = (currentIndex: number, type: "next" | "previous") => {
        if (!music.playList) {
            return;
        }
        if (type === "previous") {
            if (currentIndex <= 0) {
                return music.playList.length - 1;
            } else {
                return currentIndex - 1;
            }
        } else {
            if (currentIndex >= music.playList.length) {
                return 0;
            } else {
                return currentIndex + 1;
            }
        }
    };

    let isProcessing = false;
    const handlePlayPreviousOrNextSong = (type: "next" | "previous") => {
        if (isProcessing) {
            return;
        }
        if (!music.currentSong) {
            return;
        }
        const isEqual = (item: Song) => item.id === music.currentSong?.id;
        const currentIndex = music.playList?.findIndex(isEqual);
        const playIndex = currentIndex && getPlayIndex(currentIndex, type);
        // console.log(playIndex);
        playIndex &&
            music.playList &&
            handlePlaySong(music.playList[playIndex]);
        isProcessing = false;
    };

    useEffect(() => {
        audio.addEventListener("timeupdate", handleTimeUpEvent);
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpEvent);
        };
    });
    // useEffect(() => {}, []);
    return (
        <div className="select-none fixed h-16 bottom-0 w-screen bg-base-player ">
            <Progress currentTime={currentTime}></Progress>
            <PlayerPlayList isShow={isShowPlayList}></PlayerPlayList>
            <div className="px-16 flex items-center h-full">
                {music.currentSong && (
                    <div className="flex items-center gap-4 w-1/3 truncate">
                        <img
                            src={music.currentSong.al.picUrl}
                            alt=""
                            className="w-10 h-10 rounded-sm"
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
                                {parseTimestampIntoMinute(
                                    audio.duration * 1000
                                ) ?? `00:00`}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 m-auto absolute left-1/2 -translate-x-1/2">
                    <img
                        className="w-6"
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
                    <img
                        className="w-4"
                        onClick={handlePlayListClick}
                        src={playlistSVG}
                        alt=""
                    />
                    <img
                        className="w-4"
                        src={voiceMeidaSVG}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};
export default Player;
