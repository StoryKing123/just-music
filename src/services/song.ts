import { SongUrl } from "./../declare.d";
import { toast } from "react-toastify";
import { PlayList, PlayListSong } from "@/declare";
import axios from "./";

export const getListSong = async (id: number) => {
    return await axios.get<null, PlayListSong>(
        `playlist/track/all?id=${id}&offset=1`
    );
};
export const getListInfo = async (id: number) => {
    return await axios.get<null, PlayList>(`playlist/detail?id=${id}`);
};
export const getSongUrl = async (id: number) => {
    const res = await axios.get<
        null,
        { code: number; message: string; data: { size: number; url: "string" } }
    >(`http://localhost:4000/music/url/${id}`);
    if (res.code === 10001) {
        const urlRes = await axios.get<null, SongUrl>(`/song/url?id=${id}`);
        console.log(urlRes);
        if (urlRes.code === 200) {
            toast("歌曲不存在，播放原版歌曲");
            return urlRes.data[0].url;
        }
    }

    return res.data.url;
    // >(`https://fs-music-api.vercel.app/music/url/${id}`);
};
