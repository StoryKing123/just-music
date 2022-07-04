import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail/QQ";
import { LoadingAction, useBottomLoad, useTouchBottom } from "@/hooks";
import { getQQSearch, QQ_SEARCH_TYPE } from "@/services/qq/song";
import LoadMore from "@/components/LoadMore";
import { removeDuplicateQQSong } from "@/utils";
import { PAGE_SIZE } from "@/const";

type SongProps = { songList: API.QQ.Song[]; keyword: string; isShow: boolean };
const QQSong: FC<SongProps> = (props) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [songList, setSongList] = useState(props.songList);
    const handleLoadMore = async (
        params: { current: number; pageSize: number },
        dispatch: React.Dispatch<LoadingAction<any>>
    ) => {
        if (loading === "loading" || !props.isShow) {
            return;
        }
        const res = await getQQSearch(props.keyword, QQ_SEARCH_TYPE.SONG, {
            page: params.current,
            limit: PAGE_SIZE,
        });
        setSongList((list) => [
            ...list,
            ...removeDuplicateQQSong(res.data.song.list),
        ]);
        return res;
    };
    const { loading } = useBottomLoad(handleLoadMore);

    return (
        <div className="pb-20" ref={listRef}>
            <PlayListDetail songList={songList} />
            <LoadMore status={loading} />
        </div>
    );
};

export default QQSong;
