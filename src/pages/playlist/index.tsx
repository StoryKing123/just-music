import { FC, Suspense, useEffect, useState } from "react";
import { createNamespace } from "@/utils";
import Button from "@/components/Button";
import PlayListDetail from "@/components/PlayListDetail";
import { PlayList as IPlayList, Song } from "@/declare";
import { getListInfo, getListSong, getSongUrl } from "@/services/song";
import musicState from "@/store/music";
import { useRecoilState } from "recoil";
import { useAudio } from "@/hooks";

let add = new URL(location.href);
const id = add.searchParams.get("id");
const Playlist: FC = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const [name, bem] = createNamespace("play-list");
    const [playlist, setPlaylist] = useState<
        IPlayList["playlist"] | undefined
    >();
    const [songList, setSongList] = useState<Song[]>();
    const [playSong] = useAudio();
    const handleGetData = async () => {
        console.log(id);
        if (!id) {
            return;
        }
        const allRes = await Promise.all([getListInfo(+id), getListSong(+id)]);
        const [infoRes, SongRes] = allRes;
        setPlaylist(infoRes.playlist);
        setSongList(SongRes.songs);
    };

    const handlePlaySong = async (song: Song) => {
        const url = await handleGetSongUrl(song.id);
        playSong(song, url);
    };
    const handleGetSongUrl = async (id: number) => {
        const res = await getSongUrl(id);
        return res;
    };
    const handlePlayPlayList = async () => {
        setMusic({ ...music, playList: songList });
        songList && handlePlaySong(songList[0]);

        localStorage.setItem("playlist", JSON.stringify(songList));
        // localStorage.set("aaa", "bbb");
    };
    // const handleGetData = async () => {
    //     const id = searchParams.get("id");
    //     if (!id) return;

    //     // setSongList(res.songs);
    // };
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <div className={name + " p-20 select-none"}>
            <div className="flex">
                <div>
                    <img
                        src={`${playlist?.coverImgUrl}?param=512y512`}
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
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handlePlayPlayList}>播放歌曲</Button>
                        <Button>随机播放</Button>
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
