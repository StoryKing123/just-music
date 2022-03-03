import { FC } from "react";

type NavBarProps = {};
const NavBar: FC<NavBarProps> = () => {
    return (
        <div className="flex justify-center gap-4 text-xl font-bold">
            <div>首页</div>
            <div>探索</div>
            <div>媒体库</div>
            <div>搜索</div>
        </div>
    );
};
export default NavBar;
