import { createNamespace } from "@/utils";
import { FC } from "react";
import "./index.less";

type PlayerPlayListProps = {
    isShow: boolean;
};
const PlayerPlayList: FC<PlayerPlayListProps> = (props) => {
    const [name, bem] = createNamespace("player-play-list");
    const playList: { id: number }[] = [{ id: 523423 }];
    for (let i = 0; i < 31; i++) {
        playList.push({ id: i });
    }
    return (
        <div
            // hidden={props.isShow}
            style={{
                // visibility: props.isShow ? "visible" : "hidden",
                // opacity: props.isShow ? "100%" : "0%",
                height: props.isShow ? "40rem" : "0px",
            }}
            className={`w-80 text-left absolute right-10 h-100  overflow-hidden  flex flex-col  shadow-inner bottom-16 bg-progress-whole rounded-md ${name}`}
        >
            <div className="p-2">
                <div className="font-bold  text-lg ">当前播放</div>
                <div className="text-base-sub text-sm my-2 flex ">
                    <div>总32首</div>
                    <div className="ml-auto">清空列表</div>
                </div>
            </div> 
            <div className={`overflow-scroll  flex-1 ${bem("detail")}  `}>
                {playList.map((item) => (
                    <div key={item.id} className="flex h-7 px-2 hover:bg-base-sub text-sm items-center odd:bg-base-sub">
                        <div>左边</div>
                        <div className="ml-auto text-base-sub text-xs">
                            杨丞琳
                        </div>
                        <div className=" ml-auto w-10 text-base-sub  text-xs">
                            03:03
                        </div>
                    </div>
                ))}
            </div>
            {/* playlist */}
        </div>
    );
};
export default PlayerPlayList;
