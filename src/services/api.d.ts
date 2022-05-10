
declare namespace API {
    export interface PlayList {
        code: number;
        relatedVideos: null;
        playlist: Playlist;
        urls: null;
        privileges: Privilege[];
        sharedPrivilege: null;
        resEntrance: null;
    }

    export interface Playlist {
        length: number;
        id: number;
        name: string;
        coverImgId: number;
        coverImgUrl: string;
        coverImgId_str: string;
        adType: number;
        userId: number;
        createTime: number;
        status: number;
        opRecommend: boolean;
        highQuality: boolean;
        newImported: boolean;
        updateTime: number;
        trackCount: number;
        specialType: number;
        privacy: number;
        trackUpdateTime: number;
        commentThreadId: string;
        playCount: number;
        trackNumberUpdateTime: number;
        subscribedCount: number;
        cloudTrackCount: number;
        ordered: boolean;
        description: string;
        tags: string[];
        updateFrequency: null;
        backgroundCoverId: number;
        backgroundCoverUrl: null;
        titleImage: number;
        titleImageUrl: null;
        englishTitle: null;
        officialPlaylistType: null;
        subscribers: Creator[];
        subscribed: boolean;
        creator: Creator;
        tracks: Track[];
        videoIds: null;
        videos: null;
        trackIds: TrackID[];
        shareCount: number;
        commentCount: number;
        remixVideo: null;
        sharedUsers: null;
        historySharedUsers: null;
    }
    export interface SongUrl {
        data: Datum[];
        code: number;
    }

    export interface Datum {
        id: number;
        url: string;
        br: number;
        size: number;
        md5: string;
        code: number;
        expi: number;
        type: string;
        gain: number;
        fee: number;
        uf: null;
        payed: number;
        flag: number;
        canExtend: boolean;
        freeTrialInfo: null;
        level: null;
        encodeType: null;
        freeTrialPrivilege: FreeTrialPrivilege;
        freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
        urlSource: number;
    }

    export interface FreeTimeTrialPrivilege {
        resConsumable: boolean;
        userConsumable: boolean;
        type: number;
        remainTime: number;
    }

    export interface FreeTrialPrivilege {
        resConsumable: boolean;
        userConsumable: boolean;
        listenType: null;
    }

    export interface Creator {
        defaultAvatar: boolean;
        province: number;
        authStatus: number;
        followed: boolean;
        avatarUrl: string;
        accountStatus: number;
        gender: number;
        city: number;
        birthday: number;
        userId: number;
        userType: number;
        nickname: string;
        signature: string;
        description: string;
        detailDescription: string;
        avatarImgId: number;
        backgroundImgId: number;
        backgroundUrl: string;
        authority: number;
        mutual: boolean;
        expertTags: null;
        experts: null;
        djStatus: number;
        vipType: number;
        remarkName: null;
        authenticationTypes: number;
        avatarDetail: null;
        avatarImgIdStr: string;
        backgroundImgIdStr: string;
        anchor: boolean;
        avatarImgId_str: string;
    }

    export interface TrackID {
        id: number;
        v: number;
        t: number;
        at: number;
        alg: null;
        uid: number;
        rcmdReason: string;
        sc: null;
    }

    export interface Track {
        name: string;
        id: number;
        pst: number;
        t: number;
        ar: Ar[];
        alia: string[];
        pop: number;
        st: number;
        rt: null | string;
        fee: number;
        v: number;
        crbt: null;
        cf: string;
        al: Al;
        dt: number;
        h: H;
        m: H;
        l: H;
        a: null;
        cd: string;
        no: number;
        rtUrl: null;
        ftype: number;
        rtUrls: any[];
        djId: number;
        copyright: number;
        s_id: number;
        mark: number;
        originCoverType: number;
        originSongSimpleData: OriginSongSimpleData | null;
        single: number;
        noCopyrightRcmd: null;
        mst: number;
        cp: number;
        mv: number;
        rtype: number;
        rurl: null;
        publishTime: number;
        tns?: string[];
    }

    export interface Al {
        id: number;
        name: string;
        picUrl: string;
        tns: any[];
        pic_str?: string;
        pic: number;
    }

    export interface Ar {
        id: number;
        name: string;
        tns: any[];
        alias: any[];
    }

    export interface H {
        br: number;
        fid: number;
        size: number;
        vd: number;
    }

    export interface OriginSongSimpleData {
        songId: number;
        name: string;
        artists: AlbumMeta[];
        albumMeta: AlbumMeta;
    }

    export interface AlbumMeta {
        id: number;
        name: string;
    }

    export interface Privilege {
        id: number;
        fee: number;
        payed: number;
        realPayed: number;
        st: number;
        pl: number;
        dl: number;
        sp: number;
        cp: number;
        subp: number;
        cs: boolean;
        maxbr: number;
        fl: number;
        pc: null;
        toast: boolean;
        flag: number;
        paidBigBang: boolean;
        preSell: boolean;
        playMaxbr: number;
        downloadMaxbr: number;
        rscl: null;
        freeTrialPrivilege: FreeTrialPrivilege;
        chargeInfoList: ChargeInfoList[];
    }

    export interface ChargeInfoList {
        rate: number;
        chargeUrl: null;
        chargeMessage: null;
        chargeType: number;
    }

    export interface FreeTrialPrivilege {
        resConsumable: boolean;
        userConsumable: boolean;
    }

    export interface PlayListSong {
        songs: Song[];
        privileges: Privilege[];
        code: number;
    }

    export interface Privilege {
        id: number;
        fee: number;
        payed: number;
        st: number;
        pl: number;
        dl: number;
        sp: number;
        cp: number;
        subp: number;
        cs: boolean;
        maxbr: number;
        fl: number;
        toast: boolean;
        flag: number;
        preSell: boolean;
        playMaxbr: number;
        downloadMaxbr: number;
        rscl: null;
        freeTrialPrivilege: FreeTrialPrivilege;
        chargeInfoList: ChargeInfoList[];
    }

    export interface ChargeInfoList {
        rate: number;
        chargeUrl: null;
        chargeMessage: null;
        chargeType: number;
    }

    export interface FreeTrialPrivilege {
        resConsumable: boolean;
        userConsumable: boolean;
    }

    interface Song {
        name: string;
        id: number;
        pst: number;
        t: number;
        ar: Ar[];
        alia: any[];
        pop: number;
        st: number;
        rt: null | string;
        fee: number;
        v: number;
        crbt: null;
        cf: string;
        al: Al;
        dt: number;
        h: H;
        m: H;
        l: H;
        a: null;
        cd: string;
        no: number;
        rtUrl: null;
        ftype: number;
        rtUrls: any[];
        djId: number;
        copyright: number;
        s_id: number;
        mark: number;
        originCoverType: number;
        originSongSimpleData: null;
        tagPicList: null;
        resourceState: boolean;
        version: number;
        songJumpInfo: null;
        entertainmentTags: null;
        single: number;
        noCopyrightRcmd: null;
        rtype: number;
        rurl: null;
        mst: number;
        cp: number;
        mv: number;
        publishTime: number;
    }

    export interface Al {
        id: number;
        name: string;
        picUrl: string;
        tns: any[];
        pic: number;
        pic_str?: string;
    }

    export interface Ar {
        id: number;
        name: string;
        tns: any[];
        alias: any[];
    }

    export interface H {
        br: number;
        fid: number;
        size: number;
        vd: number;
    }

    export interface Login {
        loginType: number;
        code: number;
        account: Account;
        token: string;
        profile: Profile;
        bindings: Binding[];
        cookie: string;
    }

    export interface Account {
        id: number;
        userName: string;
        type: number;
        status: number;
        whitelistAuthority: number;
        createTime: number;
        salt: string;
        tokenVersion: number;
        ban: number;
        baoyueVersion: number;
        donateVersion: number;
        vipType: number;
        viptypeVersion: number;
        anonimousUser: boolean;
        uninitialized: boolean;
    }

    export interface Binding {
        userId: number;
        url: string;
        expired: boolean;
        bindingTime: number;
        tokenJsonStr: string;
        expiresIn: number;
        refreshTime: number;
        id: number;
        type: number;
    }

    export interface Profile {
        followed: boolean;
        backgroundUrl: string;
        detailDescription: string;
        avatarImgIdStr: string;
        userId: number;
        userType: number;
        backgroundImgIdStr: string;
        accountStatus: number;
        gender: number;
        vipType: number;
        avatarImgId: number;
        nickname: string;
        backgroundImgId: number;
        birthday: number;
        city: number;
        avatarUrl: string;
        defaultAvatar: boolean;
        province: number;
        expertTags: null;
        experts: string;
        mutual: boolean;
        remarkName: null;
        authStatus: number;
        djStatus: number;
        description: string;
        signature: string;
        authority: number;
        avatarImgId_str: string;
        followeds: number;
        follows: number;
        eventCount: number;
        avatarDetail: null;
        playlistCount: number;
        playlistBeSubscribedCount: number;
    }

    export interface Search {
        result: Result;
        code: number;
    }

    export interface Result {
        searchQcReminder: null;
        songs: Song[];
        songCount: number;
    }

    export interface SearchSuggest {
        result: Result;
        code: number;
    }

    export interface Result {
        albums: AlbumElement[];
        artists: Artist[];
        songs: Song[];
        playlists: Playlist[];
        order: string[];
    }

    export interface AlbumElement {
        id: number;
        name: string;
        artist: Artist;
        publishTime: number;
        size: number;
        copyrightId: number;
        status: number;
        picId: number;
        mark: number;
    }

    export interface Artist {
        id: number;
        name: string;
        cover?: string;
        briefDesc?: string;
        picUrl: null | string;
        alias: string[];
        albumSize: number;
        picId: number;
        img1v1Url: string;
        img1v1: number;
        trans: null;
        alia?: string[];
        accountId?: number;
    }

    export interface Song {
        id: number;
        name: string;
        artists: Artist[];
        album: SongAlbum;
        duration: number;
        copyrightId: number;
        status: number;
        alias: string[];
        rtype: number;
        ftype: number;
        mvid: number;
        fee: number;
        rUrl: null;
        mark: number;
    }

    export interface SongAlbum {
        id: number;
        name: string;
        artist: Artist;
        publishTime: number;
        size: number;
        copyrightId: number;
        status: number;
        picId: number;
        mark: number;
        alia?: string[];
    }

    export interface RecommendSongList {
        code: number;
        featureFirst: boolean;
        haveRcmdSongs: boolean;
        recommend: Recommend[];
    }

    export interface Recommend {
        id: number;
        type: number;
        name: string;
        copywriter: string;
        picUrl: string;
        playcount: number;
        createTime: number;
        creator: Creator;
        trackCount: number;
        userId: number;
        alg: string;
    }
    export interface ArtistTopSong {
        code: number;
        more: boolean;
        songs: Song[];
    }

    export interface ArtistDetail {
        code: number;
        message: string;
        data: ArtistDetailData;
    }

    export interface ArtistDetailData {
        videoCount: number;
        vipRights: VipRights;
        identify: Identify;
        artist: Artist;
        blacklist: boolean;
        preferShow: number;
        showPriMsg: boolean;
        secondaryExpertIdentiy: SecondaryExpertIdentiy[];
        eventCount: number;
        user: User;
    }

    export interface User {
        backgroundUrl: string;
        birthday: number;
        detailDescription: string;
        authenticated: boolean;
        gender: number;
        city: number;
        signature: string;
        description: string;
        remarkName: null;
        shortUserName: string;
        accountStatus: number;
        locationStatus: number;
        avatarImgId: number;
        defaultAvatar: boolean;
        province: number;
        nickname: string;
        expertTags: null;
        djStatus: number;
        avatarUrl: string;
        accountType: number;
        authStatus: number;
        vipType: number;
        userName: string;
        followed: boolean;
        userId: number;
        lastLoginIP: string;
        lastLoginTime: number;
        authenticationTypes: number;
        mutual: boolean;
        createTime: number;
        anchor: boolean;
        authority: number;
        backgroundImgId: number;
        userType: number;
        experts: null;
        avatarDetail: AvatarDetail;
    }

    export interface AvatarDetail {
        userType: number;
        identityLevel: number;
        identityIconUrl: string;
    }
    export interface ArtistAlbum {
        artist: Artist;
        hotAlbums: HotAlbum[];
        more: boolean;
        code: number;
    }
    export interface HotAlbum {
        songs: any[];
        paid: boolean;
        onSale: boolean;
        mark: number;
        companyId: number;
        blurPicUrl: string;
        artists: Artist[];
        alias: string[];
        copyrightId: number;
        picId: number;
        artist: Artist;
        publishTime: number;
        company: string;
        briefDesc: string;
        picUrl: string;
        commentThreadId: string;
        pic: number;
        tags: string;
        description: string;
        status: number;
        subType: string;
        name: string;
        id: number;
        type: string;
        size: number;
        picId_str?: string;
        isSub: boolean;
    }

    export interface VipRights {
        rightsInfoDetailDtoList: RightsInfoDetailDtoList[];
        oldProtocol: boolean;
        redVipAnnualCount: number;
    }

    export interface RightsInfoDetailDtoList {
        vipCode: number;
        expireTime: number;
        signIap: boolean;
        sign: boolean;
    }
    export interface Rank {
        rank: number;
        type: number;
    }

    export interface Identify {
        imageUrl: string;
        imageDesc: string;
        actionUrl: string;
    }

    export interface SecondaryExpertIdentiy {
        expertIdentiyId: number;
        expertIdentiyName: string;
        expertIdentiyCount: number;
    }

    // export interface Experts {}

    // 用户基本信息
    // export type CurrentUser = {
    //     avatar?: string;
    //     name?: string;
    //     title?: string;
    //     group?: string;
    //     signature?: string;
    //     tags?: {
    //         key: string;
    //         label: string;
    //     }[];
    //     userid?: string;
    //     access?: "user" | "guest" | "admin";
    //     unreadCount?: number;
    // };
}
