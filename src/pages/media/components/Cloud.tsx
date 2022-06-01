import PlayListDetail from "@/components/PlayListDetail";
import { useAudio } from "@/hooks";
import { getOriginSongUrl, getUserCloud } from "@/services/song";
import { useEffect, useState } from "react";

const Cloud = () => {
    const [cloudSong, setCloudSong] = useState<API.UserCloud["data"]>([]);
    const { playSong } = useAudio();
    useEffect(() => {
        const initData = async () => {
            const res = await getUserCloud();
            if (res) {
                setCloudSong(res.data);
            }
        };
        initData();
    }, []);
    const play = (song: API.Song) => {
        playSong(song, { origin: true });
    };
    return (
        <div className="pb-10">
            {cloudSong && (
                <PlayListDetail
                    songList={cloudSong.map((item) => item.simpleSong)}
                    play={play}
                ></PlayListDetail>
            )}
        </div>
    );
};

export default Cloud;
