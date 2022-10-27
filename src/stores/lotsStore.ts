import { makeAutoObservable, runInAction } from "mobx";
import { Lot, LotDto } from "../features/lot";
import { makeFakeData } from '../../scripts/makeFakeData';
import { Sort } from "./uiStore";
import { RootStore } from "./rootStore";
import { apiCreateLot } from "../features/api";

// @ts-ignore
const fakeData: Lot[] = makeFakeData();

function runRequest(page = 1, perPage = 4): Promise<Lot[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData.slice(page * perPage - perPage, page * perPage));
        }, 100);
    });
}

export class LotsStore {
    currentLot: Lot | null = null;
    lotsList: Lot[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 4;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    addLot(lot: Lot) {
        this.lotsList.push(lot);
    }

    removeLotById(id: any) {
        this.lotsList = this.lotsList.filter((lot) => lot.id !== id);
    }

    sortLots(sort: Sort) {
        this.lotsList = this.lotsList.sort(sort.sortFn);
    }

    setCurrentLot(lot: Lot) {
        this.currentLot = lot;
    }

    createLot(lot: LotDto) {
        apiCreateLot(lot);
    }

    makeBet() {
        // TODO
    }

    async fetchPage(page: number = 1) {
        const res = await runRequest(page, this.itemsPerPage);
        runInAction(() => {
            this.lotsList = res;
        })
    }
}