import { throttle } from "lodash";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void
): void;

export function useEventListener<
    K extends keyof HTMLElementEventMap,
    T extends HTMLElement = HTMLDivElement
>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T>
): void;

export function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    T extends HTMLElement | void = void
>(
    eventName: KW | KH,
    handler: (
        event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event
    ) => void,
    element?: RefObject<T>
) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);
    useLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
        const targetElement: T | Window = element?.current || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        const eventListener: typeof handler = (event) =>
            savedHandler.current(event);
        targetElement.addEventListener(eventName, eventListener);

        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

const isTouchBottom = (handler: Function) => {
    // 文档显示区域高度
    const showHeight = window.innerHeight;
    // 网页卷曲高度
    const scrollTopHeight =
        document.body.scrollTop || document.documentElement.scrollTop;
    // 所有内容高度
    const allHeight = document.body.scrollHeight;
    // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
    if (allHeight <= showHeight + scrollTopHeight) {
        handler();
    }
};

export const useTouchBottom = (fn: Function) => {
    // const eventHandler = throttle(() => fn, 500);
    const useFn = throttle(() => {
        if (typeof fn === "function") {
            isTouchBottom(fn);
        }
    }, 500);

    useEventListener("scroll", useFn);
};

// export const useEventListener = <K extends keyof WindowEventMap>(
//     eventName: K,
//     handler: (event: WindowEventMap[K]) => void
// ) => {
//     useEffect(() => {
//         // window.addEventListener('keydown')
//         // return
//     }, []);
// };
