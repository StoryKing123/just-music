import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { createNamespace } from "@/utils";
import Button from "@/components/Button";
import PlayListDetail from "@/components/PlayListDetail";
import musicState from "@/store/music";
import { useSetRecoilState } from "recoil";
import { useAudio } from "@/hooks";
import { useParams } from "react-router-dom";
import { praseTimestampIntoDate } from "@/utils/date";
import { getListInfo, getListSong } from "@/services/song";
import { useFetch } from "@/hooks/data";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const Playlist: FC = () => {
    const setMusic = useSetRecoilState(musicState);
    const [name, bem] = createNamespace("play-list");
    const [playlist, setPlaylist] = useState<
        API.PlayList["playlist"] | undefined
    >();
    const [songList, setSongList] = useState<API.Song[]>();
    const { playSong } = useAudio();
    const params = useParams();
    const id = params.id;

    const { data, error, loading } = useFetch(() =>
        Promise.all([getListInfo(+id!), getListSong(+id!)])
    );
    console.log(data);

    const handleGetData = async () => {
        if (!id) {
            return;
        }
        const allRes = await Promise.all([getListInfo(+id), getListSong(+id)]);
        const [infoRes, SongRes] = allRes;
        setPlaylist(infoRes.playlist);
        setSongList(SongRes.songs);
    };

    const handlePlayPlayList = async () => {
        if (!songList) return;
        playSong(songList[0]);
        setMusic((music) => ({
            ...music,
            playList: songList,
        }));
    };

    const randomPlay = () => {
        songList &&
            playSong(songList[Math.floor(Math.random() * songList.length)]);
    };
    const totalDuration = useMemo(() => {
        if (!songList) return;
        const getHoursAndMinutes = (time: number) => {
            const hours = Math.floor(time / (1000 * 60 * 60));
            const minutes = Math.floor(time / 1000 / 60) % 60;
            return `${hours}小时${minutes}分钟`;
        };
        return getHoursAndMinutes(
            songList.map((item) => item.dt).reduce((prev, cur) => prev + cur)
        );
    }, [songList]);
    useEffect(() => {
        handleGetData();
    }, [id]);
    if (loading) {
        return (
            <div className={name + " p-20 select-none"}>
                <div className="flex">
                    <div className={`w-60 shrink-0  h-auto `}>
                        <Skeleton
                            sx={{ bgcolor: "#15202B" }}
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                    </div>
                    <div className=" m-4 w-3/4">
                        <div className="text-5xl font-bold text-left ">
                            {/* {playlist?.name} */}
                            <Skeleton
                                sx={{ bgcolor: "#15202B" }}
                                variant="text"
                            />
                        </div>
                        <div>
                            <div className="text-left ">
                                播放列表 • {playlist?.creator.nickname} •{" "}
                                {praseTimestampIntoDate(
                                    playlist?.updateTime,
                                    false
                                )}
                            </div>
                            <div className="text-left ">
                                {playlist?.trackIds.length} 首歌曲 •{" "}
                                {totalDuration}
                            </div>
                        </div>
                        <div className="py-4 text-left pb-0 overflow-hidden line-clamp-2">
                            {playlist?.description}
                        </div>
                        <div className="flex gap-2 mt-5">
                            <Skeleton
                                sx={{ bgcolor: "#15202B" }}
                                variant="text"
                            />
                            {/* <Button onClick={handlePlayPlayList}>
                                播放歌曲
                            </Button>
                            <Button onClick={randomPlay}>随机播放</Button> */}
                        </div>
                        <div></div>
                    </div>
                </div>
                {Array(20)
                    .fill(0)
                    .map(() => (
                        <Skeleton />
                    ))}
                {/* <Suspense fallback={<div>loading</div>}>
                    {songList && (
                        <PlayListDetail songList={songList}></PlayListDetail>
                    )}
                </Suspense> */}
            </div>
            // <div className={name + " p-20 select-none"}>
            //     <Stack spacing={1}>
            //         <Skeleton sx={{ bgcolor: "#15202B" }} variant="text" />
            //         <Skeleton
            //             sx={{ bgcolor: "#15202B" }}
            //             variant="circular"
            //             width={40}
            //             height={40}
            //         />
            //         <Skeleton
            //             sx={{ bgcolor: "#15202B" }}
            //             variant="rectangular"
            //             width={210}
            //             height={118}
            //         />
            //     </Stack>
            // </div>
        );
    }
    return (
        <div className={name + " p-20 select-none"}>
            <div className="flex">
                <div className={`w-60 shrink-0  h-auto `}>
                    <img
                        className=" "
                        src={`${playlist?.coverImgUrl}?param=512y512`}
                        alt=""
                    />
                </div>
                <div className=" m-4 w-3/4">
                    <div className="text-5xl font-bold text-left ">
                        {playlist?.name}
                    </div>
                    <div>
                        <div className="text-left ">
                            播放列表 • {playlist?.creator.nickname} •{" "}
                            {praseTimestampIntoDate(
                                playlist?.updateTime,
                                false
                            )}
                        </div>
                        <div className="text-left ">
                            {playlist?.trackIds.length} 首歌曲 • {totalDuration}
                        </div>
                    </div>
                    <div className="py-4 text-left pb-0 overflow-hidden line-clamp-2">
                        {playlist?.description}
                    </div>
                    <div className="flex gap-2 mt-5">
                        <Button onClick={handlePlayPlayList}>播放歌曲</Button>
                        <Button onClick={randomPlay}>随机播放</Button>
                    </div>
                    <div></div>
                </div>
            </div>
            <Suspense fallback={<div>loading</div>}>
                {songList && (
                    <PlayListDetail songList={songList}></PlayListDetail>
                )}
            </Suspense>
        </div>
    );
};

export default Playlist;
