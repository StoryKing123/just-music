import { PlayList, PlayListSong } from "@/declare";
import axios from "./";

export const getListSong = async (id: number) => {
    return await axios.get<null, PlayListSong>(
        `playlist/track/all?id=${id}&limit=20&offset=1`
    );
};
export const getListInfo = async (id: number) => {
    return await axios.get<null, PlayList>(`playlist/detail?id=${id}`);
};
export const getSongUrl = async (id: number) => {
    return await axios.get<
        null,
        { code: number; message: string; data: { size: number; url: "string" } }
        >(`http://localhost:4000/music/url/${id}`);
    // >(`https://fs-music-api.vercel.app/music/url/${id}`);
};
