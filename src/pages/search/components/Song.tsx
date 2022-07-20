import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail";
import LoadMore from "@/components/LoadMore";
import { getSearch, SEARCH_TYPE } from "@/services/song";
import { PAGE_SIZE } from "@/const";
import { LoadingAction, useBottomLoad, useTouchBottom } from "@/hooks";

type SongProps = { songList: API.Song[]; keyword: string; isShow: boolean };
const Song: FC<SongProps> = (props) => {
    const [songList, setSongList] = useState(props.songList);
    const loadData = async (
        params: { current: number; pageSize: number },
        dispatch: React.Dispatch<LoadingAction<any>>
    ) => {
        const res = await getSearch(props.keyword, SEARCH_TYPE.SONG, {
            offset: (params.current - 1) * params.pageSize,
            limit: params.pageSize,
        });
        if (res.result.songCount === 0) {
            dispatch({ type: "nomore" });
        }
        console.log(res);
        res.result.songCount > 0 &&
            setSongList((list) => [...list, ...res.result.songs]);

        return res;
    };

    const { loading, data, page } = useBottomLoad(loadData);

    console.log(page);
    console.log(data);
    console.log(loading);

    return (
        <div className="pb-20">
            <PlayListDetail songList={songList} />
            <LoadMore status={loading} />
        </div>
    );
};

export default Song;
