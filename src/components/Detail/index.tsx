import appState from "@/store/app";
import musicState from "@/store/music";
import { createNamespace } from "@/utils";
import { useRecoilValue } from "recoil";
import "./index.less";

const Detail = () => {
    const music = useRecoilValue(musicState);
    const app = useRecoilValue(appState);
    const [name, bem] = createNamespace("detail");
    return (
        <div
            className={` fixed w-full h-full overflow-auto left-0 z-50   bg-base p-20 ${
                app.showDetail ? "top-0 " : "top-full "
            } ${name}`}
        >
            detail
            <img src={music.currentSong?.al.picUrl} alt="" />
        </div>
    );
};

export default Detail;
