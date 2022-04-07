import { createNamespace } from "@/utils";
import { FC, MouseEventHandler } from "react";
import { useNavigate } from "react-router";
import playWhiteSVG from "@/assets/icons/play-white.svg";
import "./index.less";

type PlayListCardProps = {
    cover: string;
    title: string;
    tag?: string;
    className?: string;
    onClose?: MouseEventHandler;
};
const PlayListCard: FC<PlayListCardProps> = (props) => {
    const [name, bem] = createNamespace("playlist-card");
    const className = props.className ?? "";
    // const navigator = useNavigate();
    // const handleClick = () => {
    // return navigator(`/playlist/${id}`, {});
    // };
    return (
        <div
            className={`${name}  ${className}`}
            onClick={props.onClose}
            // onClick={(e) => handleClick("2616438196")}
        >
            <div className={`${bem("background")}`}>
                <img
                    className="w-full"
                    src={`${props.cover}?param=256y256`}
                    alt=""
                />
                <div className={`${bem("play")}`}>
                    <img src={playWhiteSVG} alt="" />
                </div>
            </div>
            <div className={`${bem("title")}`}>{props.title}</div>
        </div>
    );
};

export default PlayListCard;
