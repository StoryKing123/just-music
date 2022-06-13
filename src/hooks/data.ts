import { useEffect, useReducer } from "react";

interface State<T> {
    data?: T;
    error?: Error;
}

type Action<T> =
    | { type: "loading" }
    | { type: "fetched"; payload: T }
    | { type: "error"; payload: Error };

export const useFetch = <T = unknown>(request: Promise<unknown>) => {
    const initialState: State<T> = {
        error: undefined,
        data: undefined,
    };
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case "loading":
                return { ...initialState };
            case "fetched":
                return { ...initialState, data: action.payload };
            case "error":
                return { ...initialState, error: action.payload };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "loading" });
            request
                .then((res) => {
                    dispatch({ type: "fetched", payload: res as T });
                })
                .catch((err) => dispatch({ type: "error", payload: err }));
        };
        fetchData();
    }, [request]);
    return state;
};
