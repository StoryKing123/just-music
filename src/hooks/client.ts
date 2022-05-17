import { globalShortcut } from "@tauri-apps/api";
import { useEffect } from "react";
import { useAudio } from "./audio";

const NEXT_SONG = "";
const PREV_SONG = "";
const PLAYORPAUSE = "";

export const useInitShortCut = () => {
    const { playPreviousOrNextSong } = useAudio();
    const initData = async () => {
        // console.log("reigster short cut");
        // console.log(await globalShortcut.isRegistered("Cmd+Right"));
        await globalShortcut.unregisterAll();
        globalShortcut.register("Cmd+Right", () => {
            console.log("next");
            playPreviousOrNextSong("next");
        });
    };
    useEffect(() => {
        initData();
    }, []);
};
