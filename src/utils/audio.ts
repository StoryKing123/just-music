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

export const replaceHttpToHttps = (src: string) => src.replace("http:", "https:");

export const setAudioSrc = (src: string) => {
    audio.src = replaceHttpToHttps(src);
};

export const playAudio = async (src?: string) => {
    if (src) {
        audio.src = replaceHttpToHttps(src);
        audio.play();
    } else {
        audio.play();
    }
};
export const pauseAudio = () => {
    audio.pause();
};

export const setAudioCurrentTime = (Proportion: number) => {
    console.log(audio.duration * Proportion);
    audio.currentTime = audio.duration * Proportion;
};

// export const ;

export const toggleAudio = () => {
    // console.log("toggle");
    // getAudio().
    audio.paused ? audio.play() : audio.pause();
};
