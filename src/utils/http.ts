import { replaceHttpToHttps } from "./audio";

export const validateMP3Url: (url: string) => Promise<boolean> = (url) => {
    return new Promise((resolve, reject) => {
        const audio = document.createElement("audio");


        /**
          * desc: base64对象转blob文件对象
          * @param base64  ：数据的base64对象
          * @param fileType  ：文件类型 mp3等;
          * @returns {Blob}：Blob文件对象
          */
        // function base64ToBlob(base64: string, fileType: string) {
        //     let typeHeader = 'data:application/' + fileType + ';base64,'; // 定义base64 头部文件类型
        //     let audioSrc = typeHeader + base64; // 拼接最终的base64
        //     let arr = audioSrc.split(',');
        //     let array = arr[0].match(/:(.*?);/);
        //     let mime = (array && array.length > 1 ? array[1] : type) || type;
        //     // 去掉url的头，并转化为byte
        //     let bytes = window.atob(arr[1]);
        //     // 处理异常,将ascii码小于0的转换为大于0
        //     let ab = new ArrayBuffer(bytes.length);
        //     // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        //     let ia = new Uint8Array(ab);
        //     for (let i = 0; i < bytes.length; i++) {
        //         ia[i] = bytes.charCodeAt(i);
        //     }
        //     return new Blob([ab], {
        //         type: mime
        //     });
        // }
        // let audioBlob = base64ToBlob("你的base64编码", "mp3");



        // audio.src = replaceHttpToHttps(url);
        audio.src =   url
        audio.oncanplay = () => {
            resolve(true);
        };
        audio.onerror = (err) => {
            console.error(err);
            resolve(false);
        };
    });
};
