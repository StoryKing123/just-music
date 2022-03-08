import { PlayList, PlayListSong, Song } from "@/declare";
import { getListInfo, getListSong, getSongUrl } from "@/services/song";
import { extractObjectArrayAttr, wrapPromise } from "@/utils";
import { playAudio } from "@/utils/audio";
import { parseTimestampIntoMinute } from "@/utils/date";
import { FC } from "react";

let add = new URL(location.href);
const id = add.searchParams.get("id");

const fetchData = (id: number) => {
    let dataPromise = getListInfo(id);
    let songListDataPromise = getListSong(id);
    return {
        list: wrapPromise(dataPromise),
        songList: wrapPromise(songListDataPromise),
    };
};
let resource: any;
if (id) {
    resource = fetchData(+id);
} else {
}
type PlayListDetailProps = {};
const PlayListDetail: FC<PlayListDetailProps> = (props) => {
    const songList = resource.songList.read() as PlayListSong;
    const handlePlaySong = async (song: Song) => {
        console.log(song);
        const url = await handleGetSongUrl(song.id);
        playAudio(url);
    };
    const handleGetSongUrl = async (id: number) => {
        const res = await getSongUrl(id);
        console.log(res);
        // return (await res).code
        return res.data.url;
    };
    const playlist = songList.songs;
    return (
        <>
            <div className="divide-y divide-base">
                {playlist.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onDoubleClick={(e) => handlePlaySong(item)}
                            className="flex m-2 gap-4 h-12 items-center  "
                        >
                            <img src={item.al.picUrl} alt="" className=" w-8" />
                            <div className=" font-bold text-left w-1/3 truncate">{item.name}</div>
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
