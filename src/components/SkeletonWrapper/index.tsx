import Skeleton from "@mui/material/Skeleton";
import { ComponentProps, FC } from "react";

type SkeletonWrapperProps = ComponentProps<typeof Skeleton>;
const SkeletonWrapper: FC<SkeletonWrapperProps> = (props) => {
    return <Skeleton {...props} sx={{ bgcolor: "#15202B" }}></Skeleton>;
};
export default SkeletonWrapper;
