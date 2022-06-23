import Tabs, { Tab } from "@/components/Tabs";
import TabPanel from "@/components/Tabs/TabPanel";
import { useFetch } from "@/hooks/data";
import { getQQAllTypeSearch } from "@/services/qq/song";
import { getAllTypeSearch, getSearch, SEARCH_TYPE } from "@/services/song";
import { useState } from "react";
import { useParams } from "react-router";
import QQSong from "./components/QQSong";
import Song from "./components/Song";

const search = () => {
    // const
    const params = useParams();
    // const id = params.id;
    // console.log(params);
    const keyword = params.keyword;
    if (!keyword) {
        return <></>;
    }
    const [tabIndex, setTableIndex] = useState(0);
    const handleChange = (event: MouseEvent, newValue: number) => {
        setTableIndex(newValue);
    };
    const { data, loading, error } = useFetch(() => getAllTypeSearch(keyword));
    const {
        data: qqData,
        loading: qqLoading,
        error: qqError,
    } = useFetch(() => getQQAllTypeSearch(keyword));
    console.log(qqData);

    console.log(data);
    if (!data) {
        return <></>;
    }
    if (data[0].status === "rejected") {
        return <></>;
    }
    if (!qqData) {
        return <></>;
    }
    if (qqData[0].status === "rejected") {
        return <></>;
    }
    if (data) {
        if (data[0].status === "fulfilled") {
            data[0].value;
        }
    }

    return (
        <div className="p-10">
            <Tabs value={tabIndex} onChange={handleChange}>
                <Tab label="歌曲"></Tab>
                <Tab label="专辑"></Tab>
                <Tab label="歌手"></Tab>
                <Tab label="歌单"></Tab>
                <Tab label="QQ音乐歌曲"></Tab>
                <Tab label="QQ音乐歌单"></Tab>
            </Tabs>
            <TabPanel index={0} value={tabIndex}>
                {/* <Playlist></Playlist> */}
                <Song songList={data[0].value.result.songs}></Song>
            </TabPanel>
            <TabPanel index={1} value={tabIndex}>
                {/* <Cloud></Cloud> */}
            </TabPanel>
            <TabPanel index={4} value={tabIndex}>
                <QQSong
                    keyword={keyword}
                    songList={qqData[0].value.data.song.list}
                ></QQSong>
            </TabPanel>
        </div>
    );
};

export default search;
