import React, { FC, MouseEventHandler, PropsWithChildren, useRef } from "react";
import { debounce } from "lodash";
import { useEventListener } from "@/hooks";
import "./index.less";
import { createNamespace } from "@/utils";

type ButtonProps = {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};
const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
    const event =
        props.onClick && debounce(props.onClick, 500, { leading: true });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rippleRef = useRef<HTMLSpanElement>(null);
    const [name, bem] = createNamespace("j-m-button");
    useEventListener(
        "click",
        (event) => {
            const target = buttonRef.current!;
            // var ripple = document.createElement("span");
            const ripple = rippleRef.current!;
            ripple.classList.add("ripple");
            var max = Math.max(target.offsetWidth, target.offsetHeight);
            ripple.style.width = ripple.style.height = max * 2 + "px";
            var rect = target.getBoundingClientRect();
            ripple.style.left = event.clientX - rect.left - max + "px";
            ripple.style.top = event.clientY - rect.top - max + "px";
            // target.appendChild(ripple);
            setTimeout(() => {
                // target.removeChild(ripple);
                ripple.classList.remove("ripple");
            }, 1000);
        },
        buttonRef
    );
    return (
        <button
            ref={buttonRef}
            className={`${name} relative bg-btn text-btn rounded-sm  font-bold  text-sm px-4 py-2 ${props.className}`}
            onClick={event}
        >
            {props.children}
            <span ref={rippleRef}></span>
        </button>
    );
};

export default Button;
