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

// audio.addEventListener("error", (err) => {
//     // console.log(Object.keys(err));
//     console.log("err");
//     console.log(err);
//     // console.log("err");
// });

export const setAudioSrc = (src: string) => {
    // getAudio().src = src;
    audio.src = src;
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
    audio.pause();
};

export const setAudioCurrentTime = (Proportion: number) => {
    console.log(audio.duration * Proportion);
    audio.currentTime = audio.duration * Proportion;
};

// export const ;

export const toggleAudio = () => {
    console.log("toggle");
    // getAudio().
    audio.paused ? audio.play() : audio.pause();
};
