import { makeAutoObservable } from "mobx";
import { sortItems as sortModalItems } from "../components/SortModal/SortModal";
import { RootStore } from "./rootStore";

export type Sort = {
    name: string;
    by: string;
    sortFn: any;
    isEnabled: boolean;
}

export class UiStore {
    sortItems: Sort[] = sortModalItems;
    rootStore: RootStore;
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    get currentSortItem() {
        return this.sortItems.find((sortItem) => sortItem.isEnabled);
    }

    setCurrentSortByName(name: string) {
        this.sortItems = this.sortItems.map((sortItem) => {
            if (name === sortItem.name) {
                return {
                    ...sortItem,
                    isEnabled: true,
                }
            } else {
                return {
                    ...sortItem,
                    isEnabled: false,
                }
            }
        });
        this.rootStore.lotsStore.sortLots(this.currentSortItem);
    }
}