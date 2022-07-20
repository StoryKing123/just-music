import CircularProgressWrapper from "@/components/CircularProgressWrapper";
import LoadMore from "@/components/LoadMore";
import PlayListCard from "@/components/PlayListCard";
import { LoadingAction, useBottomLoad } from "@/hooks";
import { useFetch } from "@/hooks/data";
import { getSearch, SEARCH_TYPE } from "@/services/song";
import { FC, useState } from "react";
import { useNavigate } from "react-router";

type PlaylistProps = { keyword: string; isShow: boolean };
const Playlist: FC<PlaylistProps> = (props) => {
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<API.Playlist[]>([]);
    // const { data, loading } = useFetch(getData);

    const loadMoreData = async (
        params: { current: number; pageSize: number },
        dispatch: React.Dispatch<LoadingAction<any>>
    ) => {
        if (!props.isShow && params.current > 1) throw Error;
        const res = (await getSearch(props.keyword, SEARCH_TYPE.PLAYLIST, {
            offset: (params.current - 1) * params.pageSize,
            limit: params.pageSize,
        })) as API.SearchPlaylist;
        if (res.result.playlistCount === 0) {
            dispatch({ type: "nomore" });
        }
        console.log(res);
        res.result.playlistCount > 0 &&
            setPlaylist((list) => [...list, ...res.result.playlists]);
        return res;
    };

    const { loading, data, page } = useBottomLoad(loadMoreData);
    return (
        <div className="flex z-0  justify-center flex-wrap gap-10 pb-20 pt-10">
            {playlist.map((item) => (
                <PlayListCard
                    className="w-1/6"
                    cover={item.coverImgUrl}
                    title={item.name}
                    key={item.id}
                    onClick={() => navigate(`/playlist/${item.id}`)}
                ></PlayListCard>
            ))}
            <div>
                <LoadMore status={loading} />
            </div>
        </div>
    );
};

export default Playlist;
