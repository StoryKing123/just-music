import { useAudio } from "@/hooks";
import { getSongUrl } from "@/services/song";
import musicState from "@/store/music";
import { createNamespace, extractObjectArrayAttr } from "@/utils";
import { parseTimestampIntoMinute } from "@/utils/date";
import { FC } from "react";
import { useRecoilState } from "recoil";
import "./index.less";

type PlayerPlayListProps = {
    isShow: boolean;
};
const PlayerPlayList: FC<PlayerPlayListProps> = (props) => {
    const [name, bem] = createNamespace("player-play-list");
    const [music] = useRecoilState(musicState);
    const [playSong] = useAudio();
    // const playList: { id: number }[] = [{ id: 523423 }];
    // for (let i = 0; i < 31; i++) {
    //     playList.push({ id: i });
    // }
    const handleGetSongUrl = async (id: number) => {
        const res = await getSongUrl(id);
        return res;
    };
    const handlePlaySong = async (song: API.Song) => {
        const url = await handleGetSongUrl(song.id);
        playSong(song, url);
    };
    return (
        <div
            style={{
                height: props.isShow ? "40rem" : "0px",
            }}
            className={`w-80 text-left absolute right-10 h-100  overflow-hidden  flex flex-col  shadow-inner bottom-16 bg-progress-whole rounded-md ${name}`}
        >
            <div className="p-2">
                <div className="font-bold  text-lg ">当前播放</div>
                <div className="text-base-sub text-sm my-2 flex ">
                    <div>总{music.playList?.length}首</div>
                    <div className="ml-auto">清空列表</div>
                </div>
            </div>
            <div
                className={`overflow-scroll text-left  flex-1 ${bem(
                    "detail"
                )}  `}
            >
                {music.playList?.map((item) => (
                    <div
                        key={item.id}
                        className="flex h-7 px-2 hover:bg-base-sub  text-sm items-center odd:bg-base-sub"
                        onClick={() => handlePlaySong(item)}
                    >
                        <div className="w-1/2 truncate">{item.name}</div>
                        <div className="ml-auto flex-1 text-left truncate text-base-sub text-xs">
                            {extractObjectArrayAttr(item.ar, "name").join(" ")}
                        </div>
                        <div className=" ml-auto w-10 text-base-sub  text-xs">
                            {parseTimestampIntoMinute(item.dt)}
                        </div>
                    </div>
                ))}
                {/* {playList.map((item) => (
                    <div
                        key={item.id}
                        className="flex h-7 px-2 hover:bg-base-sub text-sm items-center odd:bg-base-sub"
                    >
                        <div>左边</div>
                        <div className="ml-auto text-base-sub text-xs">
                            杨丞琳
                        </div>
                        <div className=" ml-auto w-10 text-base-sub  text-xs">
                            03:03
                        </div>
                    </div>
                ))} */}
            </div>
            {/* playlist */}
        </div>
    );
};
export default PlayerPlayList;
function handleGetSongUrl(id: number) {
    throw new Error("Function not implemented.");
}
