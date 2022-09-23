import { useEffect, useRef } from "react";
import { getOriginSongUrl, getSongUrl } from "@/services/song";
import musicState, { MusicStateType } from "@/store/music";
import { getAudio, pauseAudio, playAudio, toggleAudio } from "@/utils/audio";
import { useRecoilState } from "recoil";
import { validateMP3Url } from "@/utils/http";
import { toast } from "react-toastify";
import { isFreeSong } from "@/utils";
import axios from "axios";
import { Howl, Howler } from 'howler';

type UseAudioReturnType = {
    playSong: (song: Song, config?: { origin: boolean }) => void;
    playOrPauseSong: (isPlay?: boolean) => void;
    playPreviousOrNextSong: (type: "next" | "previous") => void;
};
export const useAudio: () => UseAudioReturnType = () => {
    const [music, setMusic] = useRecoilState(musicState);
    const musicRef = useRef<MusicStateType>();
    useEffect(() => {
        musicRef.current = music;
    }, [music]);
    let isProcessing = false;

    const playSong: UseAudioReturnType["playSong"] = async (song, config) => {
        console.log(song);

        let src, blobObj;
        if (config?.origin || isFreeSong(song)) {
            src = await getOriginSongUrl(song.id);
        } else {
            src = await getSongUrl(song.id, song.name, song.ar[0].name);
            console.log(src);
            const isValid = await validateMP3Url(src);
            if (!isValid) {
                console.log("播放原版歌曲");
                src = await getOriginSongUrl(song.id);
            }
            // const data: any = await axios.get(src)
            // console.log(data)
            // console.log(await data.blob())
            // src = await data.blob();
            // const blob = new Blob([data.data], { type: 'audio/mpeg' });
            // const blob = new Blob([data.data]);
            // src = data.blob() as unknown as string;
            // .then(src => res.blob())
            // blobObj = window.URL.createObjectURL(blob) as unknown as string;
        }
        let index = -1;
        // src = 'http://ch.sycdn.kuwo.cn/3c04651f98b4fc322793060d2d2d690b/62fee233/resource/n3/78/82/3483396756.mp3';
        // console.log(blobObj)
        // console.log(src);
        playAudio(src);

   
        if (musicRef.current!.playList) {
            index = musicRef.current!.playList.findIndex(
                (item) => item.id === song.id
            );
        }

        setMusic((music) => {
            const newMusicState = {
                ...music,
                currentSong: song,
                currentIndex:
                    index >= 0 ? index : musicRef.current!.currentIndex,
                isPlaying: true,
            };
            localStorage.setItem(
                "music",
                JSON.stringify({ ...newMusicState, isPlaying: false })
            );
            return newMusicState;
        });
    };
    const playOrPauseSong: UseAudioReturnType["playOrPauseSong"] = (isPlay) => {
        const audio = getAudio();

        //fresh app and continue to play
        if (
            !isPlay &&
            music.isPlaying === false &&
            audio.src === "" &&
            music.currentSong
        ) {
            playSong(music.currentSong);
            return;
        }

        if (isPlay !== undefined) {
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

    const playPreviousOrNextSong: UseAudioReturnType["playPreviousOrNextSong"] =
        (type) => {
            if (
                isProcessing ||
                !musicRef.current!.currentSong ||
                !musicRef.current!.playList
            ) {
                return;
            }
            isProcessing = true;
            let index = getPlayIndex(musicRef.current!.currentIndex, type);
            if (index !== undefined) {
                playSong(musicRef.current!.playList[index]);
            } else {
                playSong(musicRef.current!.playList[0]);
            }
            isProcessing = false;
        };

    const getPlayIndex = (
        currentIndex: number | undefined,
        type: "next" | "previous"
    ) => {
        if (!musicRef.current!.playList || currentIndex === undefined) {
            return;
        }

        if (type === "previous") {
            return currentIndex <= 0
                ? musicRef.current!.playList.length - 1
                : currentIndex - 1;
        } else {
            return currentIndex >= musicRef.current!.playList.length - 1
                ? 0
                : currentIndex + 1;
        }
    };

    return { playSong, playOrPauseSong, playPreviousOrNextSong };
};
