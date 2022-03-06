import { useRecoilState } from "recoil";
import appState from "@/store/app";
import { initTheme, setTheme, THEME } from "@/utils";
export type SetterOrUpdater<T> = (
    valOrUpdater: ((currVal: T) => T) | T
) => void;

export const useTheme = (): [THEME, (value: THEME) => void] => {
    const [app, setApp] = useRecoilState(appState);
    const setAppWrap = (value: THEME) => {
        setApp({ ...app, theme: value });
        setTheme(value);
    };
    return [app.theme, setAppWrap];
};

export const useInitTheme = () => {
    const [app, setApp] = useRecoilState(appState);

    const initFn = () => {
        const theme = initTheme();
        setApp({ ...app, theme: theme });
    };
    return initFn;
};
