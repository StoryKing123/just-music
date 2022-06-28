type Song = {
    id: number;
    name: string;
    dt: number;
    al: {
        picUrl: string;
    };
    ar: { id: number; name: string }[];
    fee: number;
};
type LoadingStatus = "loading" | "loaded" | "nomore";
