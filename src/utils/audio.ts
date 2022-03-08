import { audioDir } from "@tauri-apps/api/path";

export const initAudio = () => {};

export const getAudio = (): HTMLAudioElement => {
    const element = document.getElementById(
        "just-music-audio"
    ) as HTMLAudioElement | null;
    if (element) {
        return element;
    } else {
        const newElement = document.createElement("audio");
        newElement.id = "just-music-audio";
        document.body.appendChild(newElement);
        return newElement;
    }
};
const audio = getAudio();

export const setAudioSrc = (src: string) => {
    // getAudio().src = src;
    audio.src;
};

export const playAudio = async (src?: string) => {
    if (src) {
        audio.src = src;
        audio.play();
    } else {
        audio.play();
    }
};
export const pauseAudio = () => {
    // getAudio().pause();
    audio.pause();
};

// export const ;

export const toggleAudio = () => {
    // getAudio().
    audio.paused ? audio.play() : audio.pause();
};
