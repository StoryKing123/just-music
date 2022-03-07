export const parseTimestampIntoMinute = (timestamp: number): string => {
    const minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
    return `${minutes}:${prefixZero(seconds, 2)}`;
};

export const prefixZero = (num: number, n: number): string => {
    return (Array(n).join("0") + num).slice(-n);
};
