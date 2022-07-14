import CircularProgressWrapper from "@/components/CircularProgressWrapper";
import LoadMore from "@/components/LoadMore";
import PlayListCard from "@/components/PlayListCard";
import { LoadingAction, useBottomLoad } from "@/hooks";
import { useFetch } from "@/hooks/data";
import { getSearch, SEARCH_TYPE } from "@/services/song";
import { FC, useState } from "react";
import { useNavigate } from "react-router";

type AlbumProps = {
    isShow: boolean;
    keyword: string;
};
const Album: FC<AlbumProps> = (props) => {
    const navigate = useNavigate();

    const [albumList, setAlbumList] = useState<API.AlbumClass[]>([]);
    // const { data, loading } = useFetch(getData);

    const loadMoreData = async (
        params: { current: number; pageSize: number },
        dispatch: React.Dispatch<LoadingAction<any>>
    ) => {
        const res = (await getSearch(props.keyword, SEARCH_TYPE.ALBUM, {
            offset: (params.current - 1) * params.pageSize,
            limit: params.pageSize,
        })) as API.SearchAlbum;
        if (res.result.albumCount === 0) {
            dispatch({ type: "nomore" });
        }
        // console.log("=======");
        // console.log(res);
        res.result.albumCount > 0 &&
            setAlbumList((list) => [...list, ...res.result.albums]);
        return res;
    };
    const { loading, data, page } = useBottomLoad(loadMoreData);
    console.log(albumList);
    // const { loading, data, page } = useBottomLoad(loadMoreData);
    // const getData = () => {
    //     return getSearch(props.keyword, SEARCH_TYPE.ALBUM);
    // };
    // const { data, loading } = useFetch(getData);
    // console.log(data);
    // if (loading) {
    //     return <CircularProgressWrapper />;
    // }
    // if (data?.code !== 200) {
    //     return <>error</>;
    // }
    // const list = (data as API.SearchAlbum).result.albums;
    return (
        <div className="flex z-0  justify-center flex-wrap gap-10 pb-20 pt-10">
            {albumList.map((item) => (
                <PlayListCard
                    className="w-1/6"
                    cover={item.picUrl}
                    title={item.name}
                    key={item.id}
                    onClick={() => navigate(`/album/${item.id}`)}
                ></PlayListCard>
            ))}
            <div>
                <LoadMore status={loading} />
            </div>
        </div>
    );
};
export default Album;
