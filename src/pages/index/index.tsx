import PlayListCard from "@/components/PlayListCard";
import { db } from "@/db";
import { getRecommedSogList } from "@/services/song";
// import { invoke } from "lodash";
// import { useLiveQuery } from "dexie-react-hooks";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";

const Index: FC = () => {
    const [recommendList, setRecommedSongList] = useState<API.Recommend[]>();
    const navigate = useNavigate();

    useEffect(() => {
        const initData = async () => {
            const res = await getRecommedSogList();
            console.log(res);
            if (res && res.code === 200) {
                setRecommedSongList(res.recommend);
                await db.recommendList.clear();
                db.recommendList.bulkAdd(res.recommend);
            }
        };

        initData();
    }, []);

    // let cacheRes = useLiveQuery(() => db.recommendList.toArray());
    useLayoutEffect(() => {
        const initDataFromDB = async () => {
            let cacheRes = await db.recommendList.toArray();
            setRecommedSongList(cacheRes);
        };
        initDataFromDB();
        // setRecommedSongList(cacheRes);
    }, []);

    return (
        <div className="font-bold   pb-20 px-8  ">
            {" "}
            <div className="flex  justify-center flex-wrap gap-10 ">
                {recommendList &&
                    recommendList.map((item) => (
                        <PlayListCard
                            className="w-1/6"
                            cover={item.picUrl}
                            title={item.name}
                            key={item.id}
                            onClose={() => navigate(`/playlist/${item.id}`)}
                        ></PlayListCard>
                    ))}
            </div>
        </div>
    );
};

export default Index;
