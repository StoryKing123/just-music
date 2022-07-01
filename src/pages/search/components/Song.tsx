import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail";
import LoadMore from "@/components/LoadMore";
import { getSearch, SEARCH_TYPE } from "@/services/song";
import { PAGE_SIZE } from "@/const";
import { useBottomLoad, useTouchBottom } from "@/hooks";

type SongProps = { songList: API.Song[]; keyword: string; isShow: boolean };
const Song: FC<SongProps> = (props) => {
    const page = useRef(2);
    const [songList, setSongList] = useState(props.songList);
    const [loading, setLoading] = useState<LoadingStatus>("loaded");

    const handleLoadMore = async () => {
        if (loading === "loading" || !props.isShow) {
            return;
        }
        try {
            setLoading("loading");
            const res = await getSearch(props.keyword, SEARCH_TYPE.SONG, {
                offset: (page.current - 1) * PAGE_SIZE,
                limit: PAGE_SIZE,
            });
            setSongList((list) => [...list, ...res.result.songs]);
            setLoading("loaded");
            page.current = page.current + 1;
            return res;
        } catch (error) {
            setLoading("loaded");
        }
    };

    // useTouchBottom(handleLoadMore);
    const loadData = async (params: { current: number; pageSize: number }) => {
        return getSearch(props.keyword, SEARCH_TYPE.SONG, {
            offset: (params.current - 1) * params.pageSize,
            limit: params.pageSize,
        });
        // const res = await getSearch(props.keyword, SEARCH_TYPE.SONG, {
        //     offset: (params.current - 1) * params.pageSize,
        //     limit: params.pageSize,
        // });
        // return res
        // setSongList((list) => [...list, ...res.result.songs]);
    };
    const data = useBottomLoad(loadData);
    console.log(data);

    return (
        <div className="pb-20">
            <PlayListDetail songList={songList} />
            <LoadMore status={loading} />
        </div>
    );
};

export default Song;
