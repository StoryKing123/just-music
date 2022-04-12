import PlayListCard from "@/components/PlayListCard";
import { getRecommedSogList } from "@/services/song";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Index: FC = () => {
    const [recommendList, setRecommedSogList] = useState<API.Recommend[]>();
    const navigate = useNavigate();
    useEffect(() => {
        const initData = async () => {
            const res = await getRecommedSogList();
            console.log(res);
            res.code === 200 && setRecommedSogList(res.recommend);
        };

        initData();
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
                        // <div
                        //     className="w-1/6 cursor-pointer"
                        //     key={item.id}
                        //     onClick={() => navigate(`/playlist/${item.id}`)}
                        // >
                        //     <img src={item.picUrl} alt="" />
                        //     <div>{item.name}</div>
                        // </div>
                    ))}
            </div>
        </div>
    );
};

export default Index;
