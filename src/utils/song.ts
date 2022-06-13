export const isFreeSong = (song: API.Song) => {
    //0 or 8 is  free song
    if (song.fee === 8 || song.fee === 0) {
        return true;
    }
    return false;
};
