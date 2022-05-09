import Dexie, { Table } from "dexie";
export interface Friend {
    id?: number;
    name: string;
    age: number;
}

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    friends!: Table<Friend>;
    playList!: Table<API.PlayList>;
    recommendList!: Table<API.Recommend>;

    constructor() {
        super("myDatabase");
        this.version(2).stores({
            friends: "++id, name, age", // Primary key and indexed props
            playList: "++id",
            recommendList: "++Id",
        });
    }
}

export const db = new MySubClassedDexie();
