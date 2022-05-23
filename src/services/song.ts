import { toast } from "react-toastify";
import axios from "./";
import { invoke } from "@tauri-apps/api/tauri";

export const getListSong = async (id: number) => {
    return await axios.get<null, API.PlayListSong>(
        `playlist/track/all?id=${id}&offset=1&limit=1000`
    );
};

export const getSongDetail = async (id: number | number[]) => {
    return await axios.get<null, API.PlayListSong>(
        `song/detail?ids=${Array.isArray(id) ? id.join(",") : id}`
    );
};
export const getListInfo = async (id: number) => {
    return await axios.get<null, API.PlayList>(`playlist/detail?id=${id}`);
};
export const getSongUrl = async (id: number, name: string, artist: string) => {
    try {
        let res = await invoke("get_song_url", {
            name,
            artist,
        });
        return res as string;
    } catch (error) {
        const songUrl = await getOriginSongUrl(id);
        toast("歌曲不存在，播放原版歌曲");
        return songUrl;
    }
    // const res = await axios.get<
    //     null,
    //     { code: number; message: string; data: { size: number; url: "string" } }
    // >(`http://localhost:4000/music/url/${id}`);
    //   if (!res || res.code === 10001) {
    //     const songUrl = await getOriginSongUrl(id);
    //     toast("歌曲不存在，播放原版歌曲");
    //     return songUrl;
    //   }
    //   return res.data.url;
};

export const getOriginSongUrl = async (id: number) => {
    const res = await axios.get<null, API.SongUrl>(`/song/url?id=${id}`);
    // console.log(urlRes);
    if (res.code === 200) {
        return res.data[0].url;
    } else {
        throw new Error("error");
    }
};

export const searchSuggest = async (keywords: string) => {
    return await axios.get<null, API.SearchSuggest>(
        `/search/suggest?keywords=${keywords}`
    );
};

export const getArtistTopSong = async (id: number) => {
    return await axios.get<null, API.ArtistTopSong>(
        `/artist/top/song?id=${id}`
    );
};

export const getArtistAlbumn = async (id: number) => {
    return await axios.requestGet<API.ArtistAlbum>(`/artist/album?id=${id}`);
};

export const getArtistDetail = async (id: number) => {
    return await axios.get<null, API.ArtistDetail>(`/artist/detail?id=${id}`);
};

export const getRecommedSogList = async () => {
    return await axios.get<null, API.RecommendSongList>(`/recommend/resource`);
};

export const getUserPlaylist = async (id: number) => {
    return axios.requestGet(`/user/playlist?uid=${id}`);
};
