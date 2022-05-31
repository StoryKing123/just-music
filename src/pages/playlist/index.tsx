import { FC, Suspense, useEffect, useMemo, useState } from "react";
import { createNamespace } from "@/utils";
import Button from "@/components/Button";
import PlayListDetail from "@/components/PlayListDetail";
// import { getListInfo, getListSong, getSongUrl } from "@/services/song";
import musicState from "@/store/music";
import { useRecoilState } from "recoil";
import { useAudio } from "@/hooks";
import { useParams, useSearchParams } from "react-router-dom";
import { praseTimestampIntoDate } from "@/utils/date";
import { db } from "@/db";
import { getListInfo, getListSong } from "@/services/song";

const Playlist: FC = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const [name, bem] = createNamespace("play-list");
    const [playlist, setPlaylist] = useState<
        API.PlayList["playlist"] | undefined
    >();
    const [songList, setSongList] = useState<API.Song[]>();
    const { playSong } = useAudio();
    const params = useParams();
    const id = params.id;

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

        // localStorage.setItem("playlist", JSON.stringify(songList));
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
    return (
        <div className={name + " p-20 select-none"}>
            <div className="flex">
                <div className={`w-1/4   h-auto min-w-1/4`}>
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
