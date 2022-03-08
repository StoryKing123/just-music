import { FC, Suspense, useEffect, useState } from "react";
import { createNamespace } from "@/utils";
import Button from "@/components/Button";
import PlayListDetail from "@/components/PlayListDetail";
import { PlayList as IPlayList } from "@/declare";
import { getListInfo } from "@/services/song";

let add = new URL(location.href);
const id = add.searchParams.get("id");
const Playlist: FC = () => {
    const [name, bem] = createNamespace("play-list");
    const [playlist, setPlaylist] = useState<
        IPlayList["playlist"] | undefined
    >();
    const handleGetData = async () => {
        if (!id) {
            return;
        }
        const res = await getListInfo(+id);
        setPlaylist(res.playlist);
    };
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <div className={name + " p-20"}>
            <div className="flex">
                <div>
                    <img
                        src={playlist?.coverImgUrl}
                        alt=""
                        className={`w-60`}
                    />
                </div>
                <div className=" m-4">
                    <div className="text-5xl font-bold text-left ">
                        {playlist?.name}
                    </div>
                    <div>
                        <div className="text-left ">
                            播放列表 • YouTube Music • 2022
                        </div>
                        <div className="text-left ">
                            {playlist?.trackIds.length} 首歌曲 • 2小时50分钟
                        </div>
                    </div>
                    <div className="py-4 text-left">
                        {playlist?.description}
                        {/* The hottest new songs this week, served up fresh to you. */}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                console.log("play");
                            }}
                        >
                            播放歌曲
                        </Button>
                        <Button>随机播放</Button>
                    </div>
                    <div></div>
                </div>
            </div>
            <Suspense fallback={<div>loading</div>}>
                <PlayListDetail></PlayListDetail>
            </Suspense>
        </div>
    );
};

export default Playlist;
