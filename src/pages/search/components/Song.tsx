import { FC } from "react";
import PlayListDetail from "@/components/PlayListDetail";

type SongProps = { songList: API.Song[] };
const Song: FC<SongProps> = (props) => {
    return (
        <>
            {/* <PlayListDetail></PlayListDetail> */}
            <PlayListDetail songList={props.songList} />
        </>
    );
};

export default Song;
