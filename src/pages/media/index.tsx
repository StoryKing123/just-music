import Tabs, { Tab } from "@/components/Tabs";
import TabPanel from "@/components/Tabs/TabPanel";
// import Tab from "@/components/Tabs/Tab";
import { getUserPlaylist } from "@/services/song";
import { checkLogin } from "@/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Playlist from "./components/Playlist";

const Media = () => {
    const userPlayList = useState();
    const [tabIndex, setTableIndex] = useState(0);
    const handleChange = (event: MouseEvent, newValue: number) => {
        console.log("event");
        console.log(newValue);
        setTableIndex(newValue);
    };
    useEffect(() => {
        let user = checkLogin();
        if (user) {
            getUserPlaylist(user!.account.id);
        } else {
            toast.info("请进行登录");
        }
    }, []);
    return (
        <div className="p-10">
            <Tabs value={tabIndex} onChange={handleChange}>
                <Tab label="歌单"></Tab>
                <Tab label="云盘"></Tab>
            </Tabs>
            <TabPanel index={0} value={tabIndex}>
                <Playlist></Playlist>
            </TabPanel>
            <TabPanel index={1} value={tabIndex}></TabPanel>
        </div>
    );
};

export default Media;
