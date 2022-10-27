import { LotsStore } from "./lotsStore"
import { UiStore } from "./uiStore"
import { UserStore } from "./userStore";

export class RootStore {
    uiStore: UiStore;
    lotsStore: LotsStore;
    userStore: UserStore;

    constructor() {
        this.uiStore = new UiStore(this);
        this.lotsStore = new LotsStore(this);
        this.userStore = new UserStore(this);
    }
}

export const rootStore = new RootStore();