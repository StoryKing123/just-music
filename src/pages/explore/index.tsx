import PlayListCard from "@/components/PlayListCard";
import PlayListDetail from "@/components/PlayListDetail";
import { getListSong } from "@/services/song";
import { getToplist } from "@/services/toplist";
import { log } from "console";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Explore: FC = () => {
    const [toplist, setToplist] = useState<API.Toplist[]>([]);
    const [toplistSongs, setToplistSongs] = useState<API.Song[][]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const initData = async () => {
            toast.info("开发中");
            const res = await getToplist();
            if (res.code === 200) {
                setToplist(res.list);
                initToplistSong(res.list.slice(0, 4).map((list) => list.id));
            }
        };

        const initToplistSong = async (idArr: number[]) => {
            const requestArr = idArr.map((id) => getListSong(id, { limit: 5 }));
            const res = await Promise.all(requestArr);
            res.forEach((songlistRes) => {
                if (songlistRes.code === 200) {
                    setToplistSongs((songs) => [...songs, songlistRes.songs]);
                }
            });
            console.log(res);
        };
        initData();
    }, []);
    return (
        <div className="flex flex-col p-10 pb-20">
            <div>
                {toplist && (
                    <>
                        <div className="flex flex-col gap-10 justify-center ">
                            {toplist.slice(0, 4).map((item, index) => (
                                <div className="flex gap-10">
                                    <div className="w-40 " key={item.id}>
                                        <PlayListCard
                                            title={item.name}
                                            cover={item.coverImgUrl}
                                        ></PlayListCard>
                                    </div>
                                    <div className="flex-1">
                                        {toplistSongs && (
                                            <PlayListDetail
                                                songList={toplistSongs[index]}
                                            ></PlayListDetail>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="grid gap-4  "
                            style={{
                                justifyContent: "space-between",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(6rem,8rem))",
                            }}
                        >
                            {toplist.slice(4, toplist.length).map((item) => (
                                <div className="w-full" key={item.id}>
                                    <PlayListCard
                                        onClick={() =>
                                            navigate(`/playlist/${item.id}`)
                                        }
                                        title={item.name}
                                        cover={item.coverImgUrl}
                                    ></PlayListCard>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Explore;
