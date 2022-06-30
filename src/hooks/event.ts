import { throttle } from "lodash";
import {
    RefObject,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
} from "react";

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
    const showHeight = window.innerHeight;
    const scrollTopHeight =
        document.body.scrollTop || document.documentElement.scrollTop;
    const allHeight = document.body.scrollHeight;
    // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
    if (allHeight <= showHeight + scrollTopHeight + 100) {
        handler();
    }
};

export const useTouchBottom = (
    fn: Function,
    element?: RefObject<HTMLElement>
) => {
    // const eventHandler = throttle(() => fn, 500);
    const useFn = throttle(() => {
        if (typeof fn === "function") {
            isTouchBottom(fn);
        }
    }, 500);
    useEventListener("scroll", useFn);
};

export const useBottomLoad = <T>(fetchFn: Promise<T>) => {
    const page = useRef(1);
    interface State<T> {
        data?: T;
        error?: Error;
        loading: boolean;
        page: number;
    }

    type Action<T> =
        | { type: "loading" }
        | { type: "fetched"; payload: T }
        | { type: "error"; payload: Error };

    const initialState: State<T> = {
        loading: true,
        data: undefined,
        error: undefined,
        page: 1,
    };
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case "loading":
                return { ...initialState };
            case "fetched":
                return {
                    ...initialState,
                    data: action.payload,
                    loading: false,
                };
            case "error":
                return {
                    ...initialState,
                    error: action.payload,
                    loading: false,
                };
            default:
                return state;
        }
    };
    // useTouchBottom(() => {
    //     fetchFn.then((res) => {
    //         console.log(res);
    //         console.log("end");
    //     });
    // });
    const [state, dispatch] = useReducer(fetchReducer, initialState);
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
