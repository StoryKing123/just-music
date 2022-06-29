import { qqAxios } from "..";

export enum QQ_SEARCH_TYPE {
    SONG = "song",
    ALBUM = "album",
    PLAYLIST = "playtlist",
}

export const getQQAllTypeSearch = (keyword: string) => {
    const arr: any[] = [];
    Object.values(QQ_SEARCH_TYPE)
        .filter((_, index) => index < Object.values(QQ_SEARCH_TYPE).length / 2)
        .forEach((value) =>
            arr.push(getQQSearch(keyword, value as QQ_SEARCH_TYPE))
        );
    return Promise.allSettled(arr);
};

export const getQQSearch = async (
    keyword: string,
    type: QQ_SEARCH_TYPE,
    config: {
        page?: number;
        limit?: number;
    } = { page: 1, limit: 30 }
) => {
    return qqAxios.requestGet<API.QQ.SearchResponse>(
        `getSearchByKey?key=${keyword}&type=${type}&limit=${config.limit}&page=${config.page}`
    );
};
