import { Playlist, PlayList, PlayListSong, Song } from "@/declare";
import { useAudio } from "@/hooks";
import { getListInfo, getListSong, getSongUrl } from "@/services/song";
import { extractObjectArrayAttr, wrapPromise } from "@/utils";
import { getAudio, playAudio } from "@/utils/audio";
import { parseTimestampIntoMinute } from "@/utils/date";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
type PlayListDetailProps = {
    songList: Song[];
};
const PlayListDetail: FC<PlayListDetailProps> = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { songList } = props;
    const [playSong] = useAudio();

    // useEffect(() => {
    // }, []);

    const handlePlaySong = async (song: Song) => {
        const url = await handleGetSongUrl(song.id);
        playSong(song, url);
    };
    const handleGetSongUrl = async (id: number) => {
        const res = await getSongUrl(id);
        return res.data.url;
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
                            <img src={item.al.picUrl} alt="" className=" w-8" />
                            <div className=" font-bold text-left w-1/3 truncate">
                                {item.name}
                            </div>
                            <div className="text-base-sub w-1/2 text-left truncate">
                                {extractObjectArrayAttr(item.ar, "name").join(
                                    " "
                                )}
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
