export enum PLAY_MODE {
    RANDOM,
    SEQUENCE,
    LIST_CYCLE,
    SONG_CYCLE,
}
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

export interface Song {
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
