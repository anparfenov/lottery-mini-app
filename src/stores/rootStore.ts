import { AppStore } from "./appStore";
import { LotsStore } from "./lotsStore"
import { UiStore } from "./uiStore"
import { UserStore } from "./userStore";

export class RootStore {
    uiStore: UiStore;
    lotsStore: LotsStore;
    userStore: UserStore;
    appStore: AppStore;

    constructor() {
        this.uiStore = new UiStore(this);
        this.lotsStore = new LotsStore(this);
        this.userStore = new UserStore(this);
        this.appStore = new AppStore(this);
    }
}

export const rootStore = new RootStore();