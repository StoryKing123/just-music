import Button from "@/components/Button";
import PlayListCard from "@/components/PlayListCard";
import PlayListDetail from "@/components/PlayListDetail";
import { useAudio } from "@/hooks";
import {
    getArtistAlbumn,
    getArtistDetail,
    getArtistSong,
    getArtistTopSong,
} from "@/services/song";
import musicState from "@/store/music";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSetRecoilState } from "recoil";

const ArtistDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const setMusic = useSetRecoilState(musicState);
    const [artist, setArtist] = useState<API.ArtistDetail["data"]>();
    const [topSong, setTopSong] = useState<API.ArtistTopSong["songs"]>([]);
    const [albumn, setAlbumn] = useState<API.ArtistAlbum["hotAlbums"]>([]);
    const [deploymentDesc, setDeploymentDesc] = useState<boolean>(false);
    const { playSong } = useAudio();
    const playSongList = () => {
        if (!topSong) return;
        playSong(topSong[0]);
        setMusic((music) => ({ ...music, playList: topSong }));
    };

    useEffect(() => {
        const initData = async () => {
            if (!id) return;
            const res = await Promise.allSettled([
                getArtistDetail(+id),
                getArtistSong(+id),
                getArtistAlbumn(+id),
            ]);
            if (res[0].status === "fulfilled") {
                setArtist(res[0].value.data);
            }
            if (res[1].status === "fulfilled") {
                setTopSong(res[1].value.songs);
            }
            if (res[2].status === "fulfilled") {
                setAlbumn(res[2].value.hotAlbums);
            }
        };
        initData();
    }, [id]);
    return (
        <div className="bg-base">
            <div className="absolute bg-base -z-10  pb-96 w-full top-0 left-0 bg-no-repeat bg-cover">
                <img
                    className=" absolute w-full top-0 left-0 -z-10"
                    style={{
                        WebkitMask: "linear-gradient(#000, transparent)",
                        mask: "linear-gradient(,#000, transparent)",
                    }}
                    src={
                        artist?.artist.cover
                            ? `${artist.artist.cover}?param=512y512`
                            : ""
                    }
                />
                <div className=" relative top-60 px-10 w-full flex flex-col">
                    <div className=" text-left  text-6xl font-bold">
                        {artist?.artist.name}
                    </div>
                    <div
                        className={`text-left mt-5  w-5/12 ${
                            deploymentDesc ? "" : "line-clamp-2"
                        }`}
                    >
                        {artist?.artist.briefDesc}
                    </div>
                    <div className="text-left  text-lg font-semibold inline-block ">
                        <span
                            className="cursor-pointer"
                            onClick={() => setDeploymentDesc(!deploymentDesc)}
                        >
                            {deploymentDesc ? "收起" : "展开"}
                        </span>
                    </div>
                    <div className="text-left mt-5">
                        <Button onClick={playSongList}>播放歌曲</Button>
                    </div>

                    <div>
                        <div className=" mt-20 font-bold text-2xl  my-4 text-left">
                            歌曲
                        </div>
                        <div>
                            <PlayListDetail
                                songList={topSong.filter(
                                    (_, index) => index < 20
                                )}
                            />
                        </div>

                        <div className="mt-20 font-bold text-2xl  my-4 text-left">
                            专辑
                        </div>
                        <div className="grid gap-10 grid-cols-4">
                            {albumn
                                .filter((_, index) => index < 8)
                                .map((item) => (
                                    <PlayListCard
                                        className=""
                                        key={item.id}
                                        title={item.name}
                                        cover={item.picUrl}
                                        onClick={() =>
                                            navigate(`/album/${item.id}`)
                                        }
                                    ></PlayListCard>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="p-20"></div>
                {/* <img src="" alt="" /> */}
            </div>
        </div>
    );
};
export default ArtistDetail;
