import { FC, MouseEventHandler } from "react";
import { debounce } from "lodash";

type ButtonProps = {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
const Button: FC<ButtonProps> = (props) => {
    const event =
        props.onClick && debounce(props.onClick, 500, { leading: true });
    return (
        <button
            className={` bg-btn text-btn rounded-sm  font-bold  text-sm px-4 py-2 ${props.className}`}
            onClick={event}
        >
            {props.children}
        </button>
    );
};

export default Button;
