import CircularProgressWrapper from "@/components/CircularProgressWrapper";
import PlayListCard from "@/components/PlayListCard";
import { useFetch } from "@/hooks/data";
import { getSearch, SEARCH_TYPE } from "@/services/song";
import { FC } from "react";
import { useNavigate } from "react-router";

type AlbumProps = {
    isShow: boolean;
    keyword: string;
};
const Album: FC<AlbumProps> = (props) => {
    const navigate = useNavigate();
    const getData = () => {
        return getSearch(props.keyword, SEARCH_TYPE.ALBUM);
    };
    const { data, loading } = useFetch(getData);
    console.log(data);
    if (loading) {
        return <CircularProgressWrapper />;
    }
    if (data?.code !== 200) {
        return <>error</>;
    }
    const list = (data as API.SearchAlbum).result.albums;
    return (
        <div className="flex z-0  justify-center flex-wrap gap-10 pb-20 pt-10">
            {list.map((item) => (
                <PlayListCard
                    className="w-1/6"
                    cover={item.picUrl}
                    title={item.name}
                    key={item.id}
                    onClick={() => navigate(`/album/${item.id}`)}
                ></PlayListCard>
            ))}
        </div>
    );
};
export default Album;
