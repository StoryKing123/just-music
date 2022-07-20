import { toast } from "react-toastify";
import axios from "./";
import { invoke } from "@tauri-apps/api/tauri";

export const getListSong = async (
    id: number,
    config: { offset?: number; limit?: number } = { offset: 1, limit: 1000 }
) => {
    return axios.get<null, API.PlayListSong>(
        `playlist/track/all?id=${id}&offset=${config?.offset}&limit=${config?.limit}`
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
        console.log(res);

        return res as string;
    } catch (error) {
        // console.log(error)
        const songUrl = await getOriginSongUrl(id);
        toast("歌曲不存在，播放原版歌曲");
        return songUrl;
    }
};

export const getOriginSongUrl = async (id: number) => {
    const res = await axios.get<null, API.SongUrl>(`/song/url?id=${id}`);
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
export const getArtistSong = async (id: number) => {
    return await axios.get<null, API.ArtistTopSong>(
        `/artist/songs?id=${id}&limit=999`
    );
};

export const getArtistAlbumn = async (id: number) => {
    return await axios.requestGet<API.ArtistAlbum>(`/artist/album?id=${id}`);
};

export const getArtistDetail = async (id: number) => {
    return await axios.requestGet<API.ArtistDetail>(`/artist/detail?id=${id}`);
};

export const getRecommedPlaylist = async () => {
    return await axios.requestGet<API.RecommendPlaylists>(
        `/recommend/resource`
    );
};
export const getRecommedPlaylistNotLogin = async () => {
    return await axios.requestGet<API.RecommedPlayListsNotLogin>(
        `/personalized`
    );
};

export const getRecommedSong = async () => {
    return await axios.requestGet<API.RecommendSong>("/recommend/songs");
};

export const getUserPlaylist = async (id: number) => {
    console.trace("!!!!");
    return await axios.requestGet<API.UserPlaylist>(`/user/playlist?uid=${id}`);
};

export const getUserCloud = async () => {
    return axios.requestGet<API.UserCloud>(`/user/cloud?limit=1000`);
};

export enum SEARCH_TYPE {
    SONG = 1,
    ALBUM = 10,
    ARTIST = 100,
    PLAYLIST = 1000,
}

export const getAllTypeSearch = async (keyword: string) => {
    const arr: any[] = [];
    Object.values(SEARCH_TYPE)
        .filter((value) => Number.isInteger(value))
        .forEach((value) => arr.push(getSearch(keyword, value as SEARCH_TYPE)));
    return Promise.allSettled(arr);
};
export const getSearch = async (
    keyword: string,
    type: SEARCH_TYPE,
    config: { limit?: number; offset?: number } = { limit: 30, offset: 0 }
) => {
    return axios.requestGet<API.SearchResult[SEARCH_TYPE]>(
        `/cloudsearch?keywords=${keyword}&type=${type}&limit=${config.limit}&offset=${config.offset}`
    );
};

export const getAlbum = async (id: number) => {
    return axios.requestGet<API.Album>(`/album?id=${id}`);
};
