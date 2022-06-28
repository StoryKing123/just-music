import { FC } from "react";
import CircularProgressWrapper from "../CircularProgressWrapper";

type LoadMoreProps = {
    status: LoadingStatus;
};
const LoadMore: FC<LoadMoreProps> = (props) => {
    console.log(props);
    if (props.status === "loaded") {
        return <></>;
    }
    if (props.status === "loading") {
        // return <div>loading</div>;
        return <CircularProgressWrapper />;
    }
    if (props.status === "nomore") {
        return <div>nomore</div>;
    }
    return <></>;
};

export default LoadMore;
