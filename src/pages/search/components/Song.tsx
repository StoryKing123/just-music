import { FC, useRef, useState } from "react";
import PlayListDetail from "@/components/PlayListDetail";
import LoadMore from "@/components/LoadMore";
import { getSearch, SEARCH_TYPE } from "@/services/song";
import { PAGE_SIZE } from "@/const";
import { useTouchBottom } from "@/hooks";

type SongProps = { songList: API.Song[]; keyword: string; isShow: boolean };
const Song: FC<SongProps> = (props) => {
    const page = useRef(2);
    const [songList, setSongList] = useState(props.songList);
    const [loading, setLoading] = useState<LoadingStatus>("loaded");

    // const removeDuplicateQQSong = (arr: API.Song[]) => {
    //     const newArr: API.Song[] = [];
    //     arr.forEach((item) => {
    //         if (newArr.findIndex((song) => song.id === item.id) > -1) {
    //             console.log("--------");
    //             console.log(item);
    //             newArr.push(item);
    //         }
    //     });
    //     return newArr;
    // };

    // removeDuplicateQQSong(songList);
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
    useTouchBottom(handleLoadMore);

    return (
        <div className="pb-20">
            <PlayListDetail songList={songList} />
            <LoadMore status={loading} />
        </div>
    );
};

export default Song;
