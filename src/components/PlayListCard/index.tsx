import { createNamespace } from "@/utils";
import { FC, MouseEventHandler, PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import playWhiteSVG from "@/assets/icons/play-white.svg";
import "./index.less";

type PlayListCardProps = {
    cover: string;
    title: string;
    tag?: string;
    className?: string;
    onClick?: MouseEventHandler;
    blur?: boolean;
};
const PlayListCard: FC<PropsWithChildren<PlayListCardProps>> = (props) => {
    const [name, bem] = createNamespace("playlist-card");
    const className = props.className ?? "";
    return (
        <div className={`${name}  ${className}`} onClick={props.onClick}>
            <div className={`${bem("background")} `}>
                {props.children}
                <div className={`w-full  rounded-md overflow-hidden  `}>
                    <img
                        className={`w-full rounded-md ${
                            props.blur ? "blur-md" : ""
                        }  overflow-hidden   ${bem("background-img")}`}
                        src={`${
                            props.cover === "blank"
                                ? ""
                                : `${props.cover}?param=256y256`
                        }`}
                        style={{
                            paddingBottom:
                                props.cover === "blank" ? "100%" : "0",
                        }}
                        alt=""
                    />
                </div>

                <div className={`${bem("play")}`}>
                    <img src={playWhiteSVG} alt="" />
                </div>
            </div>
            <div className={`${bem("title")} mt-1`}>{props.title}</div>
        </div>
    );
};

export default PlayListCard;
