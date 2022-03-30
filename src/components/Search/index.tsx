import { searchSuggest } from "@/services/song";
import { ChangeEvent, FC, useState } from "react";
import { throttle } from "lodash";
import { Result, Song } from "@/declare";
import { extractObjectArrayAttr } from "@/utils";
import { Link } from "react-router-dom";

type SearchProps = {
    // isShow: boolean;
};
const Search: FC<SearchProps> = (props) => {
    const [suggest, setSuggest] = useState<Result | null>();
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
        // throttle()
        // throttle(() => {}, 10000);
        // search(e.currentTarget.value);
        // fn();
        handleThrottleInput(e);
    };
    return (
        // <div style={{ visibility: props.isShow ? "visible" : "hidden" }}>
        <div>
            search
            <div>
                <input
                    // onChange={(e) => throttle(handleInput(e), 1000)}
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
                <div>
                    {suggest?.playlists?.map((item) => (
                        <div key={item.id} className="flex items-center ">
                            <img
                                src={`${item.coverImgUrl}?param=64y64`}
                                className="w-8   rounded-sm"
                                alt=""
                            />
                            <Link to={`/playlist?id=${item.id}`}> <div>{item.name}</div></Link>
                           
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
