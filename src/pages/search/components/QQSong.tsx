import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail/QQ";
import { useBottomLoad, useTouchBottom } from "@/hooks";
import { getQQSearch, QQ_SEARCH_TYPE } from "@/services/qq/song";
import LoadMore from "@/components/LoadMore";
import { removeDuplicateQQSong } from "@/utils";
import { PAGE_SIZE } from "@/const";

type SongProps = { songList: API.QQ.Song[]; keyword: string; isShow: boolean };
const QQSong: FC<SongProps> = (props) => {
    const page = useRef(2);
    const listRef = useRef<HTMLDivElement>(null);
    const [songList, setSongList] = useState(props.songList);
    const [loading, setLoading] = useState<LoadingStatus>("loaded");

    const handleLoadMore = async () => {
        if (loading === "loading" || !props.isShow) {
            return;
        }
        try {
            setLoading("loading");
            const res = await getQQSearch(props.keyword, QQ_SEARCH_TYPE.SONG, {
                page: page.current,
                limit: PAGE_SIZE,
            });
            setSongList((list) => [
                ...list,
                ...removeDuplicateQQSong(res.data.song.list),
            ]);
            setLoading("loaded");
            page.current = page.current + 1;
            return res;
        } catch (error) {
            setLoading("loaded");
        }
    };
    useTouchBottom(handleLoadMore);

    return (
        <div className="pb-20" ref={listRef}>
            <PlayListDetail songList={songList} />
            <LoadMore status={loading} />
        </div>
    );
};

export default QQSong;
