import { useEffect, useReducer } from "react";

interface State<T> {
    data?: T;
    error?: Error;
    loading: boolean;
}

type Action<T> =
    | { type: "loading" }
    | { type: "fetched"; payload: T }
    | { type: "error"; payload: Error };

export const useFetch = <T>(request: () => Promise<T>) => {
    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        loading: true,
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
    const [state, dispatch] = useReducer(fetchReducer, initialState);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "loading" });
            request()
                .then((res) => {
                    console.log("res");
                    console.log(res);
                    dispatch({ type: "fetched", payload: res as T });
                })
                .catch((err) => dispatch({ type: "error", payload: err }));
        };
        fetchData();
    }, []);
    return state;
};
