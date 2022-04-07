import { searchSuggest } from "@/services/song";
import { ChangeEvent, FC, MouseEventHandler, useState } from "react";
import { throttle } from "lodash";
import { createNamespace, extractObjectArrayAttr, THEME } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import searchDark from "@/assets/icons/search-dark.svg";
import searchLight from "@/assets/icons/search-light.svg";
import { useTheme } from "@/hooks";
import "./index.less";

type SearchProps = {
    close?: Function;
    // isShow: boolean;
};
const Search: FC<SearchProps> = (props) => {
    const [name, bem] = createNamespace("search");
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
            // const filterSongs = (item: Song) => {
            // if(item.rtype)
            // };
            // res.result.songs.forEach((item) => filterSongs(item));
        },
        1000
    );

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
        <div className="">
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
                歌曲
                <div>
                    {suggest?.songs?.map((item) => (
                        <div key={item.id} className="flex">
                            {/* <div></div> */}
                            {/* <img src={item.album.} alt="" /> */}
                            <img
                                src={`${item.artists[0].img1v1Url}?param=64y64`}
                                className="w-8   rounded-sm"
                                alt=""
                            />
                            <div>{item.name}</div>
                            <div>
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
                歌单
                <div className="flex flex-col gap-5">
                    {suggest?.playlists?.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-5 rounded-md bg-search-item p-5 "
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
            <div>歌手</div>
        </div>
        //     <input type="text" />
        // </div>
    );
};

export default Search;
