import { FC } from "react";
import PlayListDetail from "./index";

type QQPlaylistDetailProps = {
    songList: API.QQ.Song[];
};
const QQPlaylistDetail: FC<QQPlaylistDetailProps> = (props) => {
    const songList: Song[] = props.songList.map((item) => ({
        id: item.songid,
        name: item.songname,
        dt: item.nt,
        al: { id: item.albumid, name: item.albumname, picUrl: "" },
        ar: item.singer.map((item) => ({
            id: item.id,
            name: item.name,
            picUrl: "",
        })),
        fee: 1,
        picUrl: "",
    }));

    return <PlayListDetail songList={songList} />;
};

export default QQPlaylistDetail;
