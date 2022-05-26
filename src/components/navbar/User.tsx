import { useAuth } from "@/hooks";
import userState from "@/store/user";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../Button";

type UserProps = {
    login: (...arg0: any) => any;
};
const User: FC<UserProps> = (props) => {
    console.log("user render");

    const [user] = useRecoilState(userState);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [_, logout] = useAuth();

    return (
        <>
            {user.user ? (
                <div className="flex gap-4  items-center">
                    <img
                        className="h-10 rounded-full"
                        src={user.user.profile.avatarUrl}
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    />

                    <div onClick={handleClick}>
                        {user.user.profile.nickname}
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        id="fade-menu"
                        MenuListProps={{
                            "aria-labelledby": "fade-button",
                        }}
                        TransitionComponent={Fade}
                        // MenuListProps={{
                        //     "aria-labelledby": "basic-button",
                        // }}
                    >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                        <MenuItem onClick={handleClose}>{user.user.profile.nickname}</MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                logout();
                            }}
                        >
                            退出登录
                        </MenuItem>
                    </Menu>
                </div>
            ) : (
                <Button onClick={props.login}>登录</Button>
            )}
        </>
    );
};

export default User;
