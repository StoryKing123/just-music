import PlayListCard from "@/components/PlayListCard";
import { getUserPlaylist } from "@/services/song";
import userState from "@/store/user";
import { checkLogin } from "@/utils";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";

const Playlist: FC = () => {
    // const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<API.UserPlaylist["playlist"]>([]);
    useEffect(() => {
        const initData = async () => {
            let user = checkLogin();
            if (user) {
                const res = await getUserPlaylist(user!.account.id);
                setPlaylist(res.playlist);
            }
        };
        initData();
    }, []);
    return (
        <div>
            <div className="flex flex-wrap justify-around gap-10 py-10">
                {playlist &&
                    playlist.map((item) => (
                        <PlayListCard
                            className="w-1/6"
                            cover={item.coverImgUrl}
                            title={item.name}
                            key={item.id}
                            onClose={() => navigate(`/playlist/${item.id}`)}
                        ></PlayListCard>
                    ))}
            </div>
        </div>
    );
};
export default Playlist;
