import { useModal, useTheme } from "@/hooks";
import userState from "@/store/user";
import { THEME } from "@/utils";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from "../Button";
import Login from "../Login";
import Search from "../Search";

type NavBarProps = {};
const NavBar: FC<NavBarProps> = () => {
    const [isShowLogin, setShowLogin] = useState(false);
    const [isShowSearch, setShowSearch] = useState(false);
    const [user] = useRecoilState(userState);
    // console.log(user);

    const closeSearch = () => {
        close();
    };

    const { open, close, Modal } = useModal({
        content: <Search close={closeSearch}></Search>,
    });
    // console.log(Modal)
    const [theme, setTheme] = useTheme();

    const handleLoginClick = () => {
        setShowLogin(!isShowLogin);
    };
    const handleThemeClick = () => {
        setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    };
    const handleSearch = () => {
        open();
    };
    return (
        <div className="flex justify-center relative gap-4 text-xl font-bold p-4">
            <div>
                <Link to="/index">首页</Link>
            </div>
            <div>
                <Link to="/playlist/138709164">探索</Link>
            </div>
            <div>媒体库</div>
            <div onClick={handleSearch}>搜索</div>
            <Button onClick={handleThemeClick}>切换主题</Button>
            <div className=" absolute   right-1  tranlslate-y-1/2 -translate-x-1/2 ">
                {user.user ? (
                    <div>{user.user.profile.nickname}</div>
                ) : (
                    <Button onClick={handleLoginClick}>登录</Button>
                )}
            </div>
            <Modal></Modal>
            <Login
                isShow={isShowLogin}
                onClose={() => setShowLogin(false)}
            ></Login>
        </div>
    );
};
export default NavBar;
