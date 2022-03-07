import { PlayList, PlayListSong, Song } from "@/declare";
import { getListInfo, getListSong } from "@/services/song";
import { wrapPromise } from "@/utils";
import { parseTimestampIntoMinute } from "@/utils/date";
import { FC } from "react";

const fetchData = () => {
    let dataPromise = getListInfo(24381616);
    let songListDataPromise = getListSong(24381616);
    return {
        list: wrapPromise(dataPromise),
        songList: wrapPromise(songListDataPromise),
    };
};

const resource = fetchData();
type PlayListDetailProps = {};
const PlayListDetail: FC<PlayListDetailProps> = (props) => {
    const songList = resource.songList.read() as PlayListSong;
    const listInfo = resource.list.read() as PlayList;
    const playlist = songList.songs;
    console.log(songList);
    console.log(listInfo);
    // const playlist: { id: number }[] = [{ id: -1 }];
    // for (let i = 0; i < 30; i++) {
    //     playlist.push({ id: i });
    // }
    return (
        <>
            <div className="divide-y divide-base">
                {playlist.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex m-2 gap-4 h-12 items-center  "
                        >
                            <img src={item.al.picUrl} alt="" className=" w-8" />
                            <div className=" font-bold">{item.name}</div>
                            <div className="text-base-sub">Camila Cabello</div>
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
