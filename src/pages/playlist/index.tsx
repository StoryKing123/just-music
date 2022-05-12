import { FC, Suspense, useEffect, useState } from "react";
import { createNamespace } from "@/utils";
import Button from "@/components/Button";
import PlayListDetail from "@/components/PlayListDetail";
import { getListInfo, getListSong, getSongUrl } from "@/services/song";
import musicState from "@/store/music";
import { useRecoilState } from "recoil";
import { useAudio } from "@/hooks";
import { useParams, useSearchParams } from "react-router-dom";
import { praseTimestampIntoDate } from "@/utils/date";
import { db } from "@/db";

const Playlist: FC = () => {
    // const [music, setMusic] = useRecoilState(musicState);
    const [music, setMusic] = useRecoilState(musicState);
    const [name, bem] = createNamespace("play-list");
    const [playlist, setPlaylist] = useState<
        API.PlayList["playlist"] | undefined
    >();
    const [songList, setSongList] = useState<API.Song[]>();
    const [playSong] = useAudio();
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

    const handlePlaySong = async (song: API.Song) => {
        // const url = await handleGetSongUrl(song.id);
        playSong(song);
    };
    const handleGetSongUrl = async (
        id: number,
        name: string,
        artist: string
    ) => {
        const res = await getSongUrl(id, name, artist);
        return res;
    };
    const handlePlayPlayList = async () => {
        if (!songList) return;
        await handlePlaySong(songList[0]);
        setMusic({
            ...music,
            playList: songList,
            // currentSong: songList[0],
        });
        localStorage.setItem("playlist", JSON.stringify(songList));
        // localStorage.set("aaa", "bbb");
    };

    const randomPlay = () => {
        songList &&
            playSong(songList[Math.floor(Math.random() * songList.length)]);
    };
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
                            {playlist?.trackIds.length} 首歌曲 • 2小时50分钟
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
