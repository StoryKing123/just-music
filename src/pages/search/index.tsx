import { useFetch } from "@/hooks/data";
import { getAllTypeSearch, getSearch, SEARCH_TYPE } from "@/services/song";
import { useParams } from "react-router";

const search = () => {
    // const
    const params = useParams();
    // const id = params.id;
    // console.log(params);
    const keyword = params.keyword;
    if (!keyword) {
        return <></>;
    }
    const { data, loading, error } = useFetch(() => getAllTypeSearch(keyword));
    console.log(data);

    return <div>serach</div>;
};

export default search;
