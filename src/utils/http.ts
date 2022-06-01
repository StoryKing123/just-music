import axios from "axios";
import { replaceHttpToHttps } from "./audio";

export const validateMP3Url: (url: string) => Promise<boolean> = (url) => {
    return new Promise((resolve, reject) => {
        const audio = document.createElement("audio");
        audio.src = replaceHttpToHttps(url);
        audio.oncanplay = () => {
            resolve(true);
        };
        audio.onerror = () => {
            resolve(false);
        };
    });
};
