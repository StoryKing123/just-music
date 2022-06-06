import Button from "@/components/Button";
import PlayListDetail from "@/components/PlayListDetail";
import { useAudio } from "@/hooks";
import { getRecommedSong } from "@/services/song";
import musicState from "@/store/music";
import { useEffect, useLayoutEffect, useState } from "react";
import calendarSvg from "@/assets/icons/calendar.svg";
import { db } from "@/db";
import { useSetRecoilState } from "recoil";

const DailyRecommend = () => {
    const setMusic = useSetRecoilState(musicState);
    const [songList, setSongList] =
        useState<API.RecommendSong["data"]["dailySongs"]>();
    const { playSong } = useAudio();
    useEffect(() => {
        const initData = async () => {
            const res = await getRecommedSong();
            res.code === 200 && setSongList(res.data.dailySongs);
        };
        initData();
    }, []);

    useLayoutEffect(() => {
        const initDataFromDB = async () => {
            let cacheRes = await db.recommendSongList.toArray();
            setSongList(cacheRes);
        };
        initDataFromDB();
    }, []);
    const handlePlayPlayList = async () => {
        if (!songList) return;
        playSong(songList[0]);
        setMusic((music) => ({
            ...music,
            playList: songList,
        }));
    };

    return (
        <div className={" p-20 select-none"}>
            <div className="flex">
                <div className={`shrink-0  w-40  `} style={{}}>
                    <div className="relative z-20 w-full h-full   ">
                        <div
                            className=" block text-bg left-1/2 absolute top-1/2  -translate-x-1/2   "
                            style={{ fontSize: "3rem" }}
                        >
                            {new Date().getDate()}
                        </div>
                        <img
                            src={calendarSvg}
                            className="absolute w-80 left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 "
                            alt=""
                        />
                    </div>
                </div>
                <div className=" m-4 w-3/4">
                    <div className="text-5xl font-bold text-left ">
                        每日推荐
                    </div>
                    <div>
                        {/* <div className="text-left ">
                            播放列表 • {playlist?.creator.nickname} •{" "}
                            {praseTimestampIntoDate(
                                playlist?.updateTime,
                                false
                            )}
                        </div>
                        <div className="text-left ">
                            {playlist?.trackIds.length} 首歌曲 • {totalDuration}
                        </div> */}
                    </div>
                    <div className="py-4 text-left pb-0 overflow-hidden line-clamp-2">
                        根据你的音乐口味生成，每天6:00更新
                    </div>
                    <div className="flex gap-2 mt-5">
                        <Button onClick={handlePlayPlayList}>播放歌曲</Button>
                    </div>
                    <div></div>
                </div>
            </div>
            {songList && <PlayListDetail songList={songList}></PlayListDetail>}
        </div>
    );
};

export default DailyRecommend;
