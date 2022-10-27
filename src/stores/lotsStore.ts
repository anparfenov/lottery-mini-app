import { makeAutoObservable, runInAction } from 'mobx';
import { Lot, LotDto } from '../features/lot';
import { Sort } from './uiStore';
import { RootStore } from './rootStore';
import { apiCreateLot, apiGetCounters, apiGetLots, apiUpdateLot, LotStatus } from '../features/api';

type Counters = {
    total: number;
    my: number;
}

export class LotsStore {
    currentLot: Lot | null = null;
    lotsList: Lot[] = [];
    lotsToSell: Lot[] = [];
    lotsToBuy: Lot[] = [];
    lotsCompleted: Lot[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 6;
    counters: Counters;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    get totalPages() {
        if (this.counters) {
            return Math.ceil(this.counters.total / this.itemsPerPage);
        }
        return 0;
    }

    addLot(lot: Lot) {
        this.lotsList.push(lot);
    }

    removeLotById(id: any) {
        this.lotsList = this.lotsList.filter((lot) => lot.id !== id);
    }

    sortLots(sort: Sort) {
        this.currentPage = 1;
        this.fetchSorted(this.currentPage, sort);
    }

    setCurrentLot(lot: Lot) {
        this.currentLot = lot;
    }

    createLot(lot: LotDto, id?: number, isUpdate?: boolean) {
        if (isUpdate && id) {
            console.log('update!!!');
            apiUpdateLot({
                userHeaders: this.rootStore.appStore.extractHeaders(),
                lot,
                id,
            });
        } else {
            apiCreateLot({
                userHeaders: this.rootStore.appStore.extractHeaders(),
                lot,
            });
        }
    }

    makeBet() {
        // TODO
    }

    async fetchSorted(page: number = 1, sort: Sort) {
        const res = await apiGetLots({
            userHeaders: this.rootStore.appStore.extractHeaders(),
            page,
            limit: this.itemsPerPage,
            order: sort.by,
            dest: sort.ord
        });
        console.log(res);
        runInAction(() => {
            this.lotsList = res;
        });
    }

    async fetchPage(page: number = 1) {
        const res = await apiGetLots({
            userHeaders: this.rootStore.appStore.extractHeaders(),
            page,
            limit: this.itemsPerPage,
        });
        console.log(res);
        runInAction(() => {
            this.lotsList = res;
        });
    }

    async fetchPageByStatus(page: number = 1, status?: LotStatus) {
        const res = await apiGetLots({
            userHeaders: this.rootStore.appStore.extractHeaders(),
            page,
            status,
            limit: this.itemsPerPage,
        });
        console.log(res);
        runInAction(() => {
            if (status === 'sales') {
                this.lotsToSell = res;
            } else if (status === 'closed') {
                this.lotsCompleted = res;
            } else if (status === 'open') {
                this.lotsToBuy = res;
            }
        });
    }

    async fetchCounters() {
        apiGetCounters().then((counters: Counters) => {
            runInAction(() => {
                console.log('coutners', counters);
                this.counters = counters
            })
        })
    }
}
