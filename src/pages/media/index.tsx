import { getUserPlaylist } from "@/services/song";
import userState from "@/store/user";
import { checkLogin } from "@/utils";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#fff",
        color: "white",
    },
    red: {
        backgroundColor: "red",
    },
    "&.Mui-selected": {
        color: "black"
    },
}));
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
        // className: "text-base",
        // buttonStyle: {
        //     color: "#4b4b4b",
        // },
    };
}
const Media = () => {
    const userPlayList = useState();
    const styles = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
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
        <div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    // TabIndicatorProps={{
                    //     sx: {
                    //         // backgroundColor: "red",
                    //         // color: "#fff",
                    //         height: 3,
                    //     },
                    // }}
                    className={styles.root}
                >
                    <Tab label="歌单" {...a11yProps(0)} />
                    <Tab label="云盘" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </Box>
            media
        </div>
    );
};

export default Media;
