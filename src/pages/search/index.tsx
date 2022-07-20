import CircularProgressWrapper from "@/components/CircularProgressWrapper";
import Tabs, { Tab } from "@/components/Tabs";
import TabPanel from "@/components/Tabs/TabPanel";
import { useFetch } from "@/hooks/data";
import { getQQAllTypeSearch } from "@/services/qq/song";
import { getAllTypeSearch, getSearch, SEARCH_TYPE } from "@/services/song";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Artist from "./components/Artist";
import Album from "./components/Album";
import Playlist from "./components/Playlist";
import QQSong from "./components/QQSong";
import Song from "./components/Song";

const search = () => {
    const params = useParams();
    const keyword = params.keyword;
    if (!keyword) {
        return <></>;
    }
    // console.log("search");
    useEffect(() => {
        console.log("kwyword change");
    }, [keyword]);
    const [tabIndex, setTableIndex] = useState(0);
    const handleChange = (event: MouseEvent, newValue: number) => {
        setTableIndex(newValue);
    };
    // const { data, loading, error } = useFetch(() => getAllTypeSearch(keyword));
    // const {
    //     data: qqData,
    //     loading: qqLoading,
    //     error: qqError,
    // } = useFetch(() => getQQAllTypeSearch(keyword));
    // if (loading || qqLoading) {
    //     return <CircularProgressWrapper />;
    // }
    // if (!data) {
    //     return <></>;
    // }
    // if (data[0].status === "rejected") {
    //     return <></>;
    // }
    // if (!qqData) {
    //     return <></>;
    // }
    // if (qqData[0].status === "rejected") {
    //     return <></>;
    // }
    // if (data) {
    //     if (data[0].status === "fulfilled") {
    //         data[0].value;
    //     }
    // }

    return (
        <div className="p-10">
            <Tabs value={tabIndex} onChange={handleChange}>
                <Tab label="歌曲"></Tab>
                <Tab label="专辑"></Tab>
                <Tab label="歌手"></Tab>
                <Tab label="歌单"></Tab>
            </Tabs>
            {/* <Tab label="QQ音乐歌单"></Tab> */}

            {/* <Tab label="QQ音乐歌曲"></Tab> */}
            <TabPanel index={0} value={tabIndex}>
                <Song
                    isShow={0 === tabIndex}
                    key={keyword}
                    keyword={keyword}
                ></Song>
            </TabPanel>
            {/* <TabPanel index={1} value={tabIndex}> */}
            {/* <Cloud></Cloud> */}
            {/* </TabPanel> */}
            <TabPanel index={1} value={tabIndex}>
                <Album
                    isShow={1 === tabIndex}
                    key={keyword}
                    keyword={keyword}
                ></Album>
            </TabPanel>
            <TabPanel index={2} key={keyword} value={tabIndex}>
                <Artist keyword={keyword} isShow={2 === tabIndex}></Artist>
            </TabPanel>
            <TabPanel index={3} key={keyword} value={tabIndex}>
                <Playlist keyword={keyword} isShow={2 === tabIndex}></Playlist>
            </TabPanel>
            {/* <TabPanel index={2} value={tabIndex}>
                <QQSong
                    isShow={2 === tabIndex}
                    keyword={keyword}
                    songList={qqData[0].value.data.song.list}
                ></QQSong>
            </TabPanel> */}
        </div>
    );
};

export default search;
