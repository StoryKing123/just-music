import { getUserPlaylist } from "@/services/song";
import userState from "@/store/user";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Media = () => {
    const user = useRecoilValue(userState);
    useEffect(() => {
        console.log(user);
        user.user && getUserPlaylist(user.user.account.id);
    }, []);
    return <div>media</div>;
};

export default Media;
