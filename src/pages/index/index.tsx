import PlayListCard from "@/components/PlayListCard";
import { db } from "@/db";
import {
    getRecommedPlaylist,
    getRecommedPlaylistNotLogin,
    getRecommedSong,
} from "@/services/song";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import calendarSvg from "@/assets/icons/calendar.svg";
import { useNavigate } from "react-router";
import Calendar from "./component/Calendar";

import { checkLogin } from "@/utils";

const Index: FC = () => {
    console.log("----index----");
    const [recommendList, setRecommedSongList] = useState<
        API.RecommendPlaylist[]
    >([]);
    const [songList, setSongList] =
        useState<API.RecommendSong["data"]["dailySongs"]>();
    const navigate = useNavigate();
    let user = checkLogin();

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
        const initTouristData = async () => {
            const res = await getRecommedPlaylistNotLogin();
            if (res && res.code === 200) {
                setRecommedSongList(res.result);
                await db.recommendList.clear();
                db.recommendList.bulkAdd(res.result);
            }
        };
        if (user) {
            initData();
            initRecommedSong();
        } else {
            initTouristData();
        }
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
            <div className="flex z-0  justify-center flex-wrap gap-10 ">
                {recommendList.length > 0 && (
                    <>
                        {user && (
                            <div className="w-1/6 relative">
                                <Calendar
                                    cover={
                                        songList
                                            ? songList[0].al.picUrl
                                            : "black"
                                    }
                                    className="absolute z-10"
                                    text=""
                                ></Calendar>
                            </div>
                        )}

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
