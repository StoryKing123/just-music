export const isFreeSong = (song: API.Song) => {
    if (song.fee === 8 || song.fee === 0) {
        return true;
    }
    return false;
};
