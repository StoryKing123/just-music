import PlayListDetail from "@/components/PlayListDetail";
import { useAudio } from "@/hooks";
import { getArtistDetail, getArtistTopSong } from "@/services/song";
import { extractObjectArrayAttr } from "@/utils";
import { parseTimestampIntoMinute } from "@/utils/date";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ArtistDetail = () => {
    const params = useParams();
    const id = params.id;
    const [artist, setArtist] = useState<API.ArtistDetail["data"]>();
    const [topSong, setTopSong] = useState<API.ArtistTopSong["songs"]>([]);
    const [deploymentDesc, setDeploymentDesc] = useState<boolean>(false);
    const [playSong] = useAudio();
    const handlePlaySong = async (song: API.Song) => {
        playSong(song);
    };

    useEffect(() => {
        const initData = async () => {
            if (!id) return;
            const res = await Promise.allSettled([
                getArtistDetail(+id),
                getArtistTopSong(+id),
            ]);
            if (res[0].status === "fulfilled") {
                setArtist(res[0].value.data);
            }
            if (res[1].status === "fulfilled") {
                setTopSong(res[1].value.songs);
            }
        };
        initData();
    }, [id]);
    return (
        <div>
            {/* artist detail */}
            <div
                className="absolute bg-base -z-10 w-full top-0 left-0 bg-no-repeat bg-cover"
                style={
                    {
                        // backgroundImage: `url(${artist?.user.backgroundUrl})`,
                        // backgroundSize: "100% auto",
                        // WebkitMask: "linear-gradient(#000, transparent)",
                        // mask: "linear-gradient(#000, transparent)",
                    }
                }
            >
                <img
                    className="w-full top-0 left-0 -z-10"
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
                <div className="absolute top-60 px-10 w-full flex flex-col">
                    <div className=" text-left  text-6xl font-bold">
                        {artist?.artist.name}
                    </div>
                    <div
                        className={`text-left  w-5/12 ${
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
                </div>
                <div className="p-20">
                    <div className="font-bold text-2xl  my-4 text-left">
                        歌曲
                    </div>
                    <div>
                        <PlayListDetail songList={topSong} />
                    </div>
                </div>

                {/* <img src="" alt="" /> */}
            </div>
        </div>
    );
};
export default ArtistDetail;
