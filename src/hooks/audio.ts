import { useEffect, useRef } from "react";
// import { Song } from "@/declare";
import { getSongUrl } from "@/services/song";
import appState from "@/store/app";
import musicState, { MusicStateType } from "@/store/music";
import { pauseAudio, playAudio, toggleAudio } from "@/utils/audio";
import { useRecoilState } from "recoil";

export const useAudio = (): {
    playSong: (song: API.Song) => void;
    playOrPauseSong: (isPlay?: boolean) => void;
    playPreviousOrNextSong: (type: "next" | "previous") => void;
    // any;
} => {
    const [app, setApp] = useRecoilState(appState);
    const [music, setMusic] = useRecoilState(musicState);
    const musicRef = useRef<MusicStateType>();

    useEffect(() => {
        musicRef.current = music;
    }, [music]);
    // const setDuration = () => {};
    const playSong = async (song: API.Song) => {
        const src = await getSongUrl(song.id, song.name, song.ar[0].name);
        let index = -1;
        playAudio(src);
        console.log("ref:");
        console.log(musicRef);

        if (musicRef.current!.playList) {
            index = musicRef.current!.playList.findIndex(
                (item) => item.id === song.id
            );
        }
        setMusic((music) => {
            console.log(music);
            return {
                ...music,
                currentSong: song,
                currentIndex:
                    index >= 0 ? index : musicRef.current!.currentIndex,
                isPlaying: true,
            };
        });
    };
    const playOrPauseSong = (isPlay?: boolean) => {
        if (isPlay) {
            isPlay ? playAudio() : pauseAudio();
            setMusic((music) => ({ ...music, isPlaying: isPlay }));
        } else {
            musicRef.current!.isPlaying ? pauseAudio() : playAudio();
            setMusic((music) => ({
                ...music,
                isPlaying: !musicRef.current!.isPlaying,
            }));
        }
    };

    const playPreviousOrNextSong = (type: "next" | "previous") => {
        if (isProcessing) {
            return;
        }
        if (!musicRef.current!.currentSong) {
            return;
        }
        if (!musicRef.current!.playList) {
            return;
        }
        console.log("current");
        console.log(music);
        isProcessing = true;
        let index = getPlayIndex(musicRef.current!.currentIndex, type);
        console.log("next index:" + index);
        if (index !== undefined) {
            playSong(musicRef.current!.playList[index]);
            // console.log(music.playList[index]);
        } else {
            playSong(musicRef.current!.playList[0]);
        }
        isProcessing = false;
    };

    const getPlayIndex = (
        currentIndex: number | undefined,
        type: "next" | "previous"
    ) => {
        if (!musicRef.current!.playList) {
            return;
        }
        if (currentIndex === undefined) {
            return;
        }

        if (type === "previous") {
            if (currentIndex <= 0) {
                return musicRef.current!.playList.length - 1;
            } else {
                return currentIndex - 1;
            }
        } else {
            if (currentIndex >= musicRef.current!.playList.length - 1) {
                return 0;
            } else {
                return currentIndex + 1;
            }
        }
    };

    let isProcessing = false;

    return { playSong, playOrPauseSong, playPreviousOrNextSong };
};
