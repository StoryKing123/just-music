import { FC, MouseEventHandler } from "react";

type ButtonProps = {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
const Button: FC<ButtonProps> = (props) => {
    return (
        <button
            className={` bg-btn text-btn rounded-sm  font-bold  text-sm px-4 py-2 ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
