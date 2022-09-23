import { audioDir } from "@tauri-apps/api/path";
import { Howl } from "howler";

export let player: Howl;

export const initAudio = () => {
    player = new Howl({
        src: [""],
        html5: true,
        preload: true,
        format: ['mp3', 'flac'],
        onend: () => {
            // this._nextTrackCallback();
        },
    });
    // player
    // howl.play()
};

export const changeSrc = (src: string) => {
    if (!player) return;
    player.unload();
    (player as any)._src = src;
    player.load();
}

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
        // audio.src = replaceHttpToHttps(src);
        audio.src = src
        changeSrc(src)
        player?.play()
        // audio.play();
    } else {
        player?.play()
        // audio.play();
    }
};
export const pauseAudio = () => {
    player.pause();
};

export const setAudioCurrentTime = (Proportion: number) => {
    console.log(audio.duration * Proportion);
    player.seek(audio.duration * Proportion)
    // audio.currentTime = audio.duration * Proportion;
};

// export const ;

export const toggleAudio = () => {
    // console.log("toggle");
    // getAudio().
    audio.paused ? audio.play() : audio.pause();
};
