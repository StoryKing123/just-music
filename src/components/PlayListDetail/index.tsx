import { useAudio } from "@/hooks";
import { parseTimestampIntoMinute } from "@/utils/date";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
type PlayListDetailProps = {
    songList: API.Song[];
    play?: (song: API.Song) => any;
};
const PlayListDetail: FC<PlayListDetailProps> = (props) => {
    const { songList } = props;
    console.log(songList);

    const { playSong } = useAudio();
    const navigate = useNavigate();
    const handlePlaySong = async (song: API.Song) => {
        props.play ? props.play(song) : playSong(song);
    };

    return (
        <>
            <div className="divide-y divide-base">
                {songList?.map((item) => {
                    return (
                        <div
                            key={item.id}
                            onDoubleClick={(e) => handlePlaySong(item)}
                            className="flex m-2 gap-4 h-12 items-center  "
                        >
                            {item.al ? (
                                item.al.picUrl && (
                                    <img
                                        src={`${item.al.picUrl}?param=64y64`}
                                        alt=""
                                        className=" w-8"
                                    />
                                )
                            ) : (
                                <img
                                    src={`http://p4.music.126.net/UeTuwE7pvjBpypWLudqukA==/3132508627578625.jpg?param=64y64`}
                                    alt=""
                                    className=" w-8"
                                />
                            )}

                            <div className=" font-bold text-left w-1/3 truncate">
                                {item.name}
                            </div>
                            <div className="text-base-sub w-1/2 text-left truncate">
                                {item.ar
                                    ? item.ar.map((item) => (
                                          <span key={item.id}>
                                              <span
                                                  className=" cursor-pointer"
                                                  onClick={() =>
                                                      navigate(
                                                          `/artist/${item.id}`
                                                      )
                                                  }
                                              >
                                                  {item.name}
                                              </span>
                                              &nbsp;
                                          </span>
                                      ))
                                    : "未知歌手"}
                                {/* {extractObjectArrayAttr(item.ar, "name").join(
                                    " "
                                )} */}
                            </div>
                            <div className="ml-auto text-base-sub">
                                {parseTimestampIntoMinute(item.dt)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PlayListDetail;
