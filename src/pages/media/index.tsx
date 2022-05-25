import { getUserPlaylist } from "@/services/song";
import userState from "@/store/user";
import { checkLogin } from "@/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

const Media = () => {
    const userPlayList = useState();
    useEffect(() => {
        let user = checkLogin();
        if (user) {
            getUserPlaylist(user!.account.id);
        } else {
            toast.info("请进行登录");
        }
    }, []);
    return <div>media</div>;
};

export default Media;
