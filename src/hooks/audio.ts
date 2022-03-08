import appState from "@/store/app";
import { useRecoilState } from "recoil";

export const useAudio = () => {
    const [app, setApp] = useRecoilState(appState);
    const setDuration = () => {};
    const setSrc = () => {};
    const setPlayOrPause = () => {};
    return [setDuration, setSrc, setPlayOrPause];
};
