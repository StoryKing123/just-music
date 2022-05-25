import axios from "axios";

export const validateMP3Url: (url: string) => Promise<boolean> = (url) => {
    return new Promise((resolve, reject) => {
        const audio = document.createElement("audio");
        audio.src = url;
        audio.oncanplay = () => {
            resolve(true);
        };
        audio.onerror = () => {
            resolve(false);
        };
    });
};
