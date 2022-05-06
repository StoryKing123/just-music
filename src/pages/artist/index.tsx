import { getArtistDetail, getArtistTopSong } from "@/services/song";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ArtistDetail = () => {
    const params = useParams();
    const id = params.id;
    const [artist, setArtist] = useState<API.ArtistDetail["data"]>();
    const [topSong, setTopSong] = useState<API.ArtistTopSong["songs"]>([]);
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
                    //                     -webkit-mask: linear-gradient(#000, transparent);
                    // mask: linear-gradient(#000, transparent);
                    style={{
                        WebkitMask: "linear-gradient(#000, transparent)",
                        mask: "linear-gradient(,#000, transparent)",
                    }}
                    src={artist?.user.backgroundUrl}
                />
                <div className="absolute top-60">
                    <div className=" text-left px-10 text-6xl font-bold">
                        {artist?.artist.name}
                    </div>
                    <div className="text-left px-10 w-5/12">
                        {artist?.artist.briefDesc}
                    </div>
                </div>
                <div>
                    <div>歌曲</div>
                    <div>
                        {topSong.map((item) => (
                            <div key={item.id}>{item.name}</div>
                        ))}
                    </div>
                </div>

                {/* <img src="" alt="" /> */}
            </div>
        </div>
    );
};
export default ArtistDetail;
