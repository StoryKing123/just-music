import PlayListDetail from "@/components/PlayListDetail";
import { getUserCloud } from "@/services/song";
import { useEffect, useState } from "react";

const Cloud = () => {
    const [cloudSong, setCloudSong] = useState<API.UserCloud["data"]>([]);
    useEffect(() => {
        const initData = async () => {
            const res = await getUserCloud();
            if (res) {
                setCloudSong(res.data);
            }
        };
        initData();
    }, []);
    return (
        <div>
            {cloudSong && (
                <PlayListDetail
                    songList={cloudSong.map((item) => item.simpleSong)}
                ></PlayListDetail>
            )}
        </div>
    );
};

export default Cloud;
