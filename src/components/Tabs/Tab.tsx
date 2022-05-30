import { FC } from "react";

type TabProps = {
    label: string;
    className?: string;
    onClick?: React.MouseEventHandler;
};

const Tab: FC<TabProps> = (props) => {
    return (
        <div
            className={`cursor-pointer  text-md ${props.className ?? ""} `}
            onClick={props.onClick}
        >
            {props.label}
        </div>
    );
};
export default Tab;
