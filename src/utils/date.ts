export const parseTimestampIntoMinute = (timestamp: number): string => {
    const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
    return `${minutes}:${prefixZero(seconds, 2)}`;
};

export const prefixZero = (num: number, n: number): string => {
    return (Array(n).join("0") + num).slice(-n);
};

export const praseTimestampIntoDate = (time = +new Date(), isFull = true) => {
    const date = new Date(time + 8 * 3600 * 1000);
    const fullString = date.toJSON().substring(0, 19).replace("T", " ");
    return isFull ? fullString : fullString.split(" ")[0];
};
