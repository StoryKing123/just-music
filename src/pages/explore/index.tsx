import CircularProgressWrapper from "@/components/CircularProgressWrapper";
import PlayListCard from "@/components/PlayListCard";
import PlayListDetail from "@/components/PlayListDetail";
import { useFetch } from "@/hooks/data";
import { getListSong } from "@/services/song";
import { getToplist } from "@/services/toplist";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { log } from "console";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Explore: FC = () => {
    const [toplist, setToplist] = useState<API.Toplist[]>([]);
    const [toplistSongs, setToplistSongs] = useState<API.Song[][]>([]);
    const { data, error } = useFetch(() => getToplist());
    const navigate = useNavigate();
    useEffect(() => {
        const initData = async () => {
            const res = await getToplist();
            if (res.code === 200) {
                setToplist(res.list);
                // initToplistSong(res.list.slice(0, 4).map((list) => list.id));
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
    if (error) {
        return <div>error</div>;
    }
    // if (!data) {
    //     return (
    //         <div>
    //             <Stack spacing={1}>
    //                 <Skeleton variant="text" />
    //                 <Skeleton variant="circular" width={40} height={40} />
    //                 <Skeleton variant="rectangular" width={210} height={118} />
    //             </Stack>
    //             {/* <CircularProgressWrapper /> */}
    //         </div>
    //     );
    // }
    const arr = new Array(40).fill(0);

    return (
        <div className="flex flex-col p-10 pb-20">
            <div>
                {data?.list ? (
                    <>
                        <div
                            className="grid gap-4  "
                            style={{
                                justifyContent: "space-between",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(6rem,8rem))",
                            }}
                        >
                            {data?.list.map((item) => (
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
                ) : (
                    <div
                        className="grid gap-4  "
                        style={{
                            justifyContent: "space-between",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(6rem,8rem))",
                        }}
                    >
                        {arr.map(() => (
                            <div className="w-full">
                                <Skeleton
                                    sx={{ bgcolor: "#15202B" }}
                                    variant="rectangular"
                                    height={118}
                                />
                                <Skeleton
                                    sx={{ bgcolor: "#15202B" }}
                                    variant="text"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
