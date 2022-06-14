import PlayListCard from "@/components/PlayListCard";
import { useFetch } from "@/hooks/data";
import { getUserPlaylist } from "@/services/song";
import userState from "@/store/user";
import { checkLogin } from "@/utils";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import CircularProgressWrapper from "@/components/CircularProgressWrapper";

const Playlist: FC = () => {
    // const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState<API.UserPlaylist["playlist"]>([]);
    let user = checkLogin();
    if (!user) {
        return <div></div>;
    }
    const { data, error } = useFetch(() =>
        getUserPlaylist((user as API.Login)!.account.id)
    );

    // const initData = async () => {
    // let user = checkLogin();
    // if (user) {
    //     const res = await getUserPlaylist(user!.account.id);
    //     setPlaylist(res.playlist);
    // }
    // };
    // if (user) {
    //     const res = await getUserPlaylist(user!.account.id);
    //     setPlaylist(res.playlist);
    // }
    // useEffect(() => {
    //     const initData = async () => {
    //         let user = checkLogin();
    //         if (user) {
    //             const res = await getUserPlaylist(user!.account.id);
    //             setPlaylist(res.playlist);
    //         }
    //     };
    //     initData();
    // }, []);
    if (error) {
        return <div>error</div>;
    }
    if (!data) {
        return (
            <div>
                {" "}
                <CircularProgressWrapper />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap justify-around gap-10 py-10">
                {data?.playlist.map((item) => (
                    <PlayListCard
                        className="w-1/6"
                        cover={item.coverImgUrl}
                        title={item.name}
                        key={item.id}
                        onClick={() => navigate(`/playlist/${item.id}`)}
                    ></PlayListCard>
                ))}
                {/* {playlist &&
                    playlist.map((item) => (
                        <PlayListCard
                            className="w-1/6"
                            cover={item.coverImgUrl}
                            title={item.name}
                            key={item.id}
                            onClick={() => navigate(`/playlist/${item.id}`)}
                        ></PlayListCard>
                    ))} */}
            </div>
        </div>
    );
};
export default Playlist;
