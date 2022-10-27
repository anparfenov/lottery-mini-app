import { LotsStore } from "./lotsStore"
import { UiStore } from "./uiStore"

export class RootStore {
    uiStore: UiStore;
    lotsStore: LotsStore;

    constructor() {
        this.uiStore = new UiStore(this)
        this.lotsStore = new LotsStore(this)
    }
}

export const rootStore = new RootStore();