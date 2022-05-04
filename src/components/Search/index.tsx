import { getSongDetail, searchSuggest } from "@/services/song";
import { ChangeEvent, FC, MouseEventHandler, useState } from "react";
import { throttle } from "lodash";
import { createNamespace, extractObjectArrayAttr, THEME } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import searchDark from "@/assets/icons/search-dark.svg";
import searchLight from "@/assets/icons/search-light.svg";
import { useAudio, useTheme } from "@/hooks";
import "./index.less";

type SearchProps = {
    close?: Function;
    // isShow: boolean;
};
const Search: FC<SearchProps> = (props) => {
    const [name, bem] = createNamespace("search");
    const [play] = useAudio();
    let navigate = useNavigate();
    const [theme] = useTheme();
    const [suggest, setSuggest] = useState<API.Result | null>();
    const handleThrottleInput = throttle(
        async (e: ChangeEvent<HTMLInputElement>) => {
            console.log(e);
            const res = await searchSuggest(e.target.value);
            if (res.code === 200) {
                // res.result
                setSuggest(res.result);
            }
        },
        500
    );
    const playSong = async (id: number) => {
        const detail = await getSongDetail(id);
        play(detail.songs[0]);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        handleThrottleInput(e);
    };
    const handleClick = (id: number) => {
        navigate(`/playlist/${id}`);
        props.close && props.close();
    };
    return (
        // <div style={{ visibility: props.isShow ? "visible" : "hidden" }}>
        <div className=" overflow-scroll  px-6 h-full">
            <div className="flex">
                <img
                    src={theme === THEME.DARK ? searchDark : searchLight}
                    alt=""
                />

                <input
                    // onChange={(e) => throttle(handleInput(e), 1000)}
                    placeholder="Search Music"
                    className={`${bem("input")}`}
                    onChange={handleInput}
                    type="text"
                />
            </div>

            <div>
                <div className={bem("title")}>歌曲</div>
                <div className="flex  flex-col gap-4 ">
                    {suggest?.songs?.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center rounded-md bg-search-item hover:bg-search-item-active p-3  "
                            onDoubleClick={() => playSong(item.id)}
                        >
                            <img
                                src={`${item.artists[0].img1v1Url}?param=64y64`}
                                className="w-8   rounded-sm"
                                alt=""
                            />
                            <div className=" ml-8">{item.name}</div>
                            <div className=" mr-0 ml-auto">
                                {extractObjectArrayAttr(
                                    item.artists,
                                    "name"
                                ).join(" ")}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className={bem("title")}>歌单</div>

                <div className="flex flex-col gap-5 ">
                    {suggest?.playlists?.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-5 rounded-md bg-search-item hover:bg-search-item-active  p-5 "
                            onClick={() => handleClick(item.id)}
                        >
                            <img
                                src={`${item.coverImgUrl}?param=64y64`}
                                className="w-12    rounded-sm"
                                alt=""
                            />
                            <div>{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={bem("title")}>歌手</div>
            <div className="fle flex-col gap-5">
                {suggest?.artists?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-5 rounded-md bg-search-item hover:bg-search-item-active  p-5 "
                        onClick={() => handleClick(item.id)}
                    >
                        <img
                            src={`${item.img1v1Url}?param=64y64`}
                            className="w-12    rounded-sm"
                            alt=""
                        />
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
        //     <input type="text" />
        // </div>
    );
};

export default Search;
