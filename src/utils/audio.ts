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
    console.log(src);
    if (src) {
        audio.src = src;
        audio.play();
    } else {
        audio.play();
    }
    console.log("play");
};
export const pauseAudio = () => {
    // getAudio().pause();
    console.log("pause");
    // console.log(audio);
    // audio.pause();
    audio.pause();
};

// export const ;

export const toggleAudio = () => {
    console.log("toggle");
    // getAudio().
    audio.paused ? audio.play() : audio.pause();
};
