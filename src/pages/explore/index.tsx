import { getToplist } from "@/services/toplist";
import { FC, useEffect } from "react";

const Explore: FC = () => {
    useEffect(() => {
        getToplist();
    }, []);
    return <div>开发中</div>;
};

export default Explore;
