export const isFreeSong = (song: Song) => {
    //0 or 8 is  free song
    if (song.fee === 8 || song.fee === 0) {
        return true;
    }
    return false;
};

export const removeDuplicateQQSong = (arr: API.QQ.Song[]) => {
    const newArr: API.QQ.Song[] = [];
    arr.forEach((item) => {
        if (
            newArr.findIndex(
                (song) =>
                    song.songname === item.songname &&
                    song.singer[0]?.name === item.singer[0]?.name
            ) === -1
        ) {
            newArr.push(item);
        }
    });
    return newArr;
};
