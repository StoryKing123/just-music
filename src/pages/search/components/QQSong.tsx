import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail/QQ";
import { useTouchBottom } from "@/hooks";
import { useFetch } from "@/hooks/data";
import { getQQSearch, QQ_SEARCH_TYPE } from "@/services/qq/song";

type SongProps = { songList: API.QQ.Song[]; keyword: string };
const QQSong: FC<SongProps> = (props) => {
    const page = useRef(1);
    const [songList, setSongList] = useState(props.songList);
    useTouchBottom(async () => {
        page.current = page.current + 1;
        const res = await getQQSearch(props.keyword, QQ_SEARCH_TYPE.SONG, {
            page: page.current,
        });
        setSongList((list) => [...list, ...res.data.song.list]);
        console.log(res);
    });

    return (
        <div className="pb-10">
            <PlayListDetail songList={songList} />
        </div>
    );
};

export default QQSong;
