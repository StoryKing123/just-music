import { PlayList } from "@/declare";
import axios from "./";

export const getListSong = async (id: number) => {
    return await axios.get<PlayList>(
        `playlist/track/all?id=${id}&limit=10&offset=1`
    );
};
export const getListInfo = async (id: number) => {
    return await axios.get<null,PlayList>(`playlist/detail?id=${id}`);
};

export const getSongUrl = async (id: number) => {
    return await axios.get("");
};
