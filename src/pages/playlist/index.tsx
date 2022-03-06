import { FC } from "react";
import { createNamespace } from "@/utils";
import Button from "@/components/Button";

const PlayList: FC = () => {
    const [name, bem] = createNamespace("play-list");
    const playlist: { id: number }[] = [{ id: -1 }];
    for (let i = 0; i < 30; i++) {
        // const element = array[i];
        playlist.push({ id: i });
    }
    return (
        <div className={name + " p-20"}>
            <div className="flex">
                <div>
                    <img
                        src="https://lh3.googleusercontent.com/qwStnnLb1PiXXTYa2TgSMRluJ_sniqVTjtpbgZAnzdomJPFln53gvTJN8eT9wH7U5cL0hlogPxnNpS0=w544-h544-l90-rj"
                        alt=""
                        className={`w-60`}
                    />
                </div>
                <div className=" m-4">
                    <div className="text-5xl font-bold text-left ">
                        RELEASED
                    </div>
                    <div>
                        <div className="text-left ">
                            播放列表 • YouTube Music • 2022
                        </div>
                        <div className="text-left ">
                            52 首歌曲 • 2小时50分钟
                        </div>
                    </div>
                    <div className="py-4">
                        The hottest new songs this week, served up fresh to you.
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                console.log("play");
                            }}
                        >
                            播放歌曲
                        </Button>
                        <Button>随机播放</Button>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="divide-y divide-base">
                {playlist.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex m-2 gap-4 h-12 items-center  "
                        >
                            <img
                                src="https://i.ytimg.com/vi/yD_v9Ol38BE/hqdefault.jpg?sqp=-oaymwEWCMACELQBIAQqCghQEJADGFogjgJIWg&rs=AMzJL3kFWWlyne_LhhYg-yVHXvktXhV6JQ"
                                alt=""
                                className=" w-12"
                            />
                            <div className=" font-bold">
                                Bam Bam (Official Audio)（合作音乐人：Ed
                                Sheeran）
                            </div>
                            <div className="text-base-sub">Camila Cabello</div>
                            <div className="ml-auto text-base-sub">3:28</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayList;
