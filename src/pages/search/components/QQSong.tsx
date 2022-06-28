import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail/QQ";
import { useBottomLoad, useTouchBottom } from "@/hooks";
import { getQQSearch, QQ_SEARCH_TYPE } from "@/services/qq/song";
import LoadMore from "@/components/LoadMore";
import { removeDuplicateQQSong } from "@/utils";

type SongProps = { songList: API.QQ.Song[]; keyword: string };
const QQSong: FC<SongProps> = (props) => {
    const page = useRef(1);
    const [songList, setSongList] = useState(props.songList);
    const [loading, setLoading] = useState<LoadingStatus>("loaded");
    // useBottomLoad(
    //     getQQSearch(props.keyword, QQ_SEARCH_TYPE.SONG, {
    //         page: page.current,
    //     })
    // );
    const handleLoadMore = async () => {
        if (loading === "loading") {
            return;
        }
        try {
            setLoading("loading");
            page.current = page.current + 1;
            const res = await getQQSearch(props.keyword, QQ_SEARCH_TYPE.SONG, {
                page: page.current,
            });
            setSongList((list) => [
                ...list,
                ...removeDuplicateQQSong(res.data.song.list),
            ]);
            // console.log(res);
            // console.log(removeDuplicateQQSong(res.data.song.list));
            setLoading("loaded");
            return res;
        } catch (error) {
            setLoading("loaded");
        }
    };
    useTouchBottom(handleLoadMore);

    return (
        <div className="pb-20">
            <PlayListDetail songList={songList} />
            <LoadMore status={loading} />
        </div>
    );
};

export default QQSong;
