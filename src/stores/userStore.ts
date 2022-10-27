import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

type Bet = {
    lotId: string;
    bet: number;
}

type User = {
    id: string,
    name: string;
    bets: Bet[];
    lotIds: number[];
}

export class UserStore {
    currentUser: User = {
        id: '1',
        name: 'username',
        bets: [],
        lotIds: [],
    };
    otherUsers: User[];
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
}