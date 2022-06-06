import PlayListCard from "@/components/PlayListCard";
import { db } from "@/db";
import { getRecommedPlaylist, getRecommedSong } from "@/services/song";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import calendarSvg from "@/assets/icons/calendar.svg";
import { useNavigate } from "react-router";
import Calendar from "./component/Calendar";

const Index: FC = () => {
    const [recommendList, setRecommedSongList] = useState<API.Recommend[]>();
    const [songList, setSongList] =
        useState<API.RecommendSong["data"]["dailySongs"]>();
    const navigate = useNavigate();
    useEffect(() => {
        const initData = async () => {
            const res = await getRecommedPlaylist();
            if (res && res.code === 200) {
                setRecommedSongList(res.recommend);
                await db.recommendList.clear();
                db.recommendList.bulkAdd(res.recommend);
            }
        };
        const initRecommedSong = async () => {
            const res = await getRecommedSong();
            if (res && res.code === 200) {
                setSongList(res.data.dailySongs);
                await db.recommendList.clear();
                db.recommendSongList.bulkAdd(res.data.dailySongs);
            }
        };
        initData();
        initRecommedSong();
    }, []);
    useLayoutEffect(() => {
        const initDataFromDB = async () => {
            let cacheRes = await db.recommendList.toArray();
            setRecommedSongList(cacheRes);
        };
        initDataFromDB();
    }, []);

    return (
        <div className="font-bold   pb-20 px-8  ">
            <div className="flex  justify-center flex-wrap gap-10 ">
                {recommendList && (
                    <>
                        <div className="w-1/6 relative">
                            <Calendar
                                cover={
                                    songList ? songList[0].al.picUrl : "black"
                                }
                                className="absolute z-10"
                                text=""
                            ></Calendar>
                        </div>
                        {recommendList.map((item) => (
                            <PlayListCard
                                className="w-1/6"
                                cover={item.picUrl}
                                title={item.name}
                                key={item.id}
                                onClick={() => navigate(`/playlist/${item.id}`)}
                            ></PlayListCard>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Index;
