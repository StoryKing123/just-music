// import { isInTauri } from "@/utils/tauri";
// import { globalShortcut } from "@tauri-apps/api";
// import { platform } from "@tauri-apps/api/os";
import { isInTauri } from "@/utils/tauri";
import { useEffect } from "react";
import { useAudio } from "./audio";

type System = "win32" | "darwin";
type ShortCut = {
    nextSong: string;
    prevSong: string;
    playOrPause: string;
};
const shortCut: Record<System, ShortCut> = {
    win32: {
        nextSong: "Control+Alt+Right",
        prevSong: "Control+Alt+Left",
        playOrPause: "Control+Alt+Space",
    },
    darwin: {
        nextSong: "Cmd+Option+Right",
        prevSong: "Cmd+Option+Left",
        playOrPause: "Cmd+Option+Space",
    },
};

export const useInitShortCut = async () => {
    const { playPreviousOrNextSong, playOrPauseSong } = useAudio();
    const initData = async () => {
        if (isInTauri()) {
            const { platform } = await import("@tauri-apps/api/os");
            const { globalShortcut } = await import("@tauri-apps/api");
            const system = (await platform()) as "darwin" | "win32";
            if (system === "darwin" || system === "win32") {
                await globalShortcut.unregisterAll();
                globalShortcut.register(shortCut[system]["nextSong"], () => {
                    playPreviousOrNextSong("next");
                });
                globalShortcut.register(shortCut[system]["prevSong"], () => {
                    playPreviousOrNextSong("previous");
                });
                globalShortcut.register(shortCut[system]["playOrPause"], () => {
                    playOrPauseSong();
                });
            } else {
                throw new Error("not supported system");
            }
        }
    };
    useEffect(() => {
        initData();
    }, []);
};
