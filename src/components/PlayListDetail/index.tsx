import { useAudio } from "@/hooks";
import { getListInfo, getListSong, getSongUrl } from "@/services/song";
import { extractObjectArrayAttr, wrapPromise } from "@/utils";
import { getAudio, playAudio } from "@/utils/audio";
import { parseTimestampIntoMinute } from "@/utils/date";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
type PlayListDetailProps = {
    songList: API.Song[];
};
const PlayListDetail: FC<PlayListDetailProps> = (props) => {
    const { songList } = props;
    const [playSong] = useAudio();
    const navigate = useNavigate();

    const handlePlaySong = async (song: API.Song) => {
        playSong(song);
    };

    return (
        <>
            <div className="divide-y divide-base">
                {songList?.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onDoubleClick={(e) => handlePlaySong(item)}
                            className="flex m-2 gap-4 h-12 items-center  "
                        >
                            <img
                                src={`${item.al.picUrl}?param=64y64`}
                                alt=""
                                className=" w-8"
                            />
                            <div className=" font-bold text-left w-1/3 truncate">
                                {item.name}
                            </div>
                            <div className="text-base-sub w-1/2 text-left truncate">
                                {item.ar.map((item) => (
                                    <>
                                        <span
                                            key={item.id}
                                            className=" cursor-pointer"
                                            onClick={(e) =>
                                                navigate(`/artist/${item.id}`)
                                            }
                                        >
                                            {item.name}
                                        </span>
                                        &nbsp;
                                    </>
                                ))}
                                {/* {extractObjectArrayAttr(item.ar, "name").join(
                                    " "
                                )} */}
                            </div>
                            <div className="ml-auto text-base-sub">
                                {parseTimestampIntoMinute(item.dt)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PlayListDetail;
