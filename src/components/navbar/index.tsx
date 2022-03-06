import { useTheme } from "@/hooks";
import { THEME } from "@/utils";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import Login from "../Login";

type NavBarProps = {};
const NavBar: FC<NavBarProps> = () => {
    const [isShowLogin, setShowLogin] = useState(false);
    const [theme, setTheme] = useTheme();

    const handleLoginClick = () => {
        setShowLogin(!isShowLogin);
    };
    const handleThemeClick = () => {
        setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    };
    return (
        <div className="flex justify-center gap-4 text-xl font-bold p-4">
            <div>
                <Link to="index"></Link> 首页
            </div>
            <div>探索</div>
            <div>媒体库</div>
            <div>搜索</div>
            <Button onClick={handleLoginClick}>登录</Button>
            <Button onClick={handleThemeClick}>切换主题</Button>
            <Login
                isShow={isShowLogin}
                onClose={() => setShowLogin(false)}
            ></Login>
        </div>
    );
};
export default NavBar;
