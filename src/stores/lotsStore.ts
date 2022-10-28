import { makeAutoObservable, runInAction } from 'mobx';
import { Lot, LotDto } from '../features/lot';
import { Sort } from './uiStore';
import { RootStore } from './rootStore';
import { apiCreateLot, apiGetCounters, apiGetLots, apiMakeBet, apiUpdateLot, apiUploadImage, LotStatus } from '../features/api';

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
    currentSort: Sort | null = null;
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
        this.currentSort = sort;
        this.fetchSorted(this.currentPage, this.currentSort);
    }

    setCurrentLot(lot: Lot) {
        this.currentLot = lot;
    }

    async createLot(lot: LotDto, id?: number, isUpdate?: boolean) {
        if (isUpdate && id) {
            return apiUpdateLot({
                userHeaders: this.rootStore.appStore.extractHeaders(),
                lot,
                id,
            });
        } else {
            return apiCreateLot({
                userHeaders: this.rootStore.appStore.extractHeaders(),
                lot,
            });
        }
    }

    async uploadImage(file: any, id: number) {
        return apiUploadImage({ userHeaders: this.rootStore.appStore.extractHeaders(), file, id})
    }

    makeBet(bet: number, lotId: number) {
        apiMakeBet({bet, lotId, userHeaders: this.rootStore.appStore.extractHeaders()})
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
        if (this.currentSort) {
            this.fetchSorted(page, this.currentSort);
        } else {
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
            if (res) {
                if (status === 'sales') {
                    this.lotsToSell = !Array.isArray(res) && res.error ? [] : res;
                } else if (status === 'closed') {
                    this.lotsCompleted = !Array.isArray(res) && res.error ? [] : res;
                } else if (status === 'open') {
                    this.lotsToBuy = !Array.isArray(res) && res.error ? [] : res;
                }
            }
        });
    }

    async fetchCounters() {
        apiGetCounters({ userHeaders: this.rootStore.appStore.extractHeaders() }).then((counters: Counters) => {
            runInAction(() => {
                console.log('coutners', counters);
                this.counters = counters
            })
        })
    }
}
