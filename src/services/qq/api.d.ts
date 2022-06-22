declare namespace API {
    namespace QQ {
        export interface SearchResponse {
            code: number;
            data: Data;
            message: string;
            notice: string;
            subcode: number;
            time: number;
            tips: string;
        }

        export interface Data {
            keyword: string;
            priority: number;
            qc: any[];
            semantic: Semantic;
            song: Semantic;
            tab: number;
            taglist: any[];
            totaltime: number;
            zhida: Zhida;
        }

        export interface Semantic {
            curnum: number;
            curpage: number;
            list: List[];
            totalnum: number;
        }

        export interface List {
            albumid: number;
            albummid: string;
            albumname: string;
            albumname_hilight: string;
            alertid: number;
            belongCD: number;
            cdIdx: number;
            chinesesinger: number;
            docid: string;
            grp?: List[];
            interval: number;
            isonly: number;
            lyric: string;
            lyric_hilight: string;
            media_mid: string;
            msgid: number;
            newStatus: number;
            nt: number;
            pay: Pay;
            preview: Preview;
            pubtime: number;
            pure: number;
            singer: Singer[];
            size128: number;
            size320: number;
            sizeape: number;
            sizeflac: number;
            sizeogg: number;
            songid: number;
            songmid: string;
            songname: string;
            songname_hilight: string;
            strMediaMid: string;
            stream: number;
            switch: number;
            t: number;
            tag: number;
            type: number;
            ver: number;
            vid: string;
            format?: string;
            songurl?: string;
        }

        export interface Pay {
            payalbum: number;
            payalbumprice: number;
            paydownload: number;
            payinfo: number;
            payplay: number;
            paytrackmouth: number;
            paytrackprice: number;
        }

        export interface Preview {
            trybegin: number;
            tryend: number;
            trysize: number;
        }

        export interface Singer {
            id: number;
            mid: string;
            name: string;
            name_hilight: string;
        }

        export interface Zhida {
            type: number;
            zhida_singer: ZhidaSinger;
        }

        export interface ZhidaSinger {
            albumNum: number;
            hotalbum: Hotalbum[];
            hotsong: Hotsong[];
            mvNum: number;
            singerID: number;
            singerMID: string;
            singerName: string;
            singerPic: string;
            singername_hilight: string;
            songNum: number;
        }

        export interface Hotalbum {
            albumID: number;
            albumMID: string;
            albumName: string;
            albumname_hilight: string;
        }

        export interface Hotsong {
            f: string;
            songID: number;
            songMID: string;
            songName: string;
            songname_hilight: string;
        }
    }
}
