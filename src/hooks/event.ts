import { PAGE_SIZE } from "@/const";
import { throttle } from "lodash";
import {
    RefObject,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
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

export type LoadingAction<T> =
    | { type: "loading" }
    | { type: "fetched"; payload: T }
    | { type: "error"; payload: Error }
    | { type: "nomore" };

export const useBottomLoad = <T>(fetchFn: (...args: any[]) => Promise<T>) => {
    // const page = useRef(2);
    // const [loading, setLoading] = useState<LoadingStatus>("loaded");
    interface State<T> {
        data?: T;
        error?: Error;
        loading: LoadingStatus;
        pageSize: number;
        page: number;
    }

    type Action<T> = LoadingAction<T>;

    const initialState: State<T> = {
        loading: "loaded",
        data: undefined,
        error: undefined,
        pageSize: PAGE_SIZE,
        page: 2,
    };
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        // console.log("=======");
        // console.log(action);
        // console.log(state);
        // console.log("=======");
        if (state.loading === "nomore") {
            return state;
        }
        switch (action.type) {
            case "loading":
                return { ...state, loading: "loading" };
            case "fetched":
                return {
                    ...state,
                    data: action.payload,
                    page: state.page + 1,
                    loading: "loaded",
                };
            case "error":
                return {
                    ...state,
                    error: action.payload,
                    loading: "loaded",
                };
            case "nomore":
                return {
                    ...state,
                    loading: "nomore",
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useTouchBottom(() => {
        if (state.loading === "loading" || state.loading === "nomore") return;
        dispatch({ type: "loading" });
        fetchFn({ current: state.page, pageSize: state.pageSize }, dispatch)
            .then((res) => {
                dispatch({ type: "fetched", payload: res as T });
            })
            .catch((err) => dispatch({ type: "error", payload: err }));
    });
    return state;
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
