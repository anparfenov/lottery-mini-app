import { makeAutoObservable, runInAction } from 'mobx';
import { Lot, LotDto } from '../features/lot';
import { Sort, UserLotsTab } from './uiStore';
import { RootStore } from './rootStore';
import {
    apiCreateLot,
    apiGetById,
    apiGetCounters,
    apiGetLots,
    apiMakeBet,
    apiUpdateLot,
    apiUploadImage,
} from '../features/api';

type Counters = {
    total: number;
    my: number;
};

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

    closeLot() {
        const lotDto = {
            title: this.currentLot.title,
            description: this.currentLot.description,
            address: '11',
            priceStart: this.currentLot.priceStart,
            priceStep: this.currentLot.priceStep,
            biddingEnd: this.currentLot.biddingEnd,
            status: 'closed' as any,
        };
        return this.createLot(lotDto, this.currentLot.id, true);
    }

    changeBiddingEnd(date: string) {
        this.currentLot.biddingEnd = date;
        const lotDto = {
            title: this.currentLot.title,
            description: this.currentLot.description,
            address: '11',
            priceStart: this.currentLot.priceStart,
            priceStep: this.currentLot.priceStep,
            biddingEnd: date,
            status: 'open' as any,
        };
        this.createLot(lotDto, this.currentLot.id, true);
    }

    sortLots(sort: Sort) {
        this.currentPage = 1;
        this.currentSort = sort;
        this.fetchSorted(this.currentPage, this.currentSort);
    }

    setCurrentLot(lot: Lot) {
        this.currentLot = lot;
    }

    fetchById(id: number) {
        return apiGetById({
            userHeaders: this.rootStore.appStore.extractHeaders(),
            id: id,
        })
    }

    // TODO rename
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
        return apiUploadImage({
            userHeaders: this.rootStore.appStore.extractHeaders(),
            file,
            id,
        });
    }

    makeBet(bet: number, lotId: number) {
        return apiMakeBet({
            bet,
            lotId,
            userHeaders: this.rootStore.appStore.extractHeaders(),
        }).then(() => {
            return this.fetchById(lotId);
        }).then(result => {
            console.log('makeBet', result);
            runInAction(() => {
                this.currentLot = result;
            })
        });
    }

    async fetchSorted(page: number = 1, sort: Sort) {
        const res = await apiGetLots({
            userHeaders: this.rootStore.appStore.extractHeaders(),
            page,
            limit: this.itemsPerPage,
            order: sort.by,
            dest: sort.ord,
        });
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
            runInAction(() => {
                this.lotsList = res;
            });
        }
    }

    async fetchPageByType(page: number = 1, type: UserLotsTab) {
        if (type === UserLotsTab.BUY) {
            const statuses = ['open', 'sales'];
            for (let status of statuses) {
                let params: any = {
                    userHeaders: this.rootStore.appStore.extractHeaders(),
                    page,
                    status,
                    limit: 10,
                    isOnlyBet: true,
                    isMy: false,
                };
                const res = await apiGetLots(params);
                runInAction(() => {
                    if (res && Array.isArray(res)) {
                        // @ts-ignore
                        this.lotsToBuy = [...this.lotsToBuy, ...res];
                    }
                });
            }
        } else if (type === UserLotsTab.SELL) {
            const statuses = ['open', 'sales'];
            for (let status of statuses) {
                let params: any = {
                    userHeaders: this.rootStore.appStore.extractHeaders(),
                    page,
                    status,
                    limit: 10,
                    isMy: true,
                };
                const res = await apiGetLots(params);
                runInAction(() => {
                    if (res && Array.isArray(res)) {
                        // @ts-ignore
                        this.lotsToSell = [...this.lotsToSell, ...res];
                    }
                });
            }
        } else if (type === UserLotsTab.COMPLETED) {
            const statuses = ['sales'];
            for (let status of statuses) {
                let params: any = {
                    userHeaders: this.rootStore.appStore.extractHeaders(),
                    page,
                    status,
                    limit: 10,
                    isOnlyBet: true,
                    isMy: false,
                };
                const res = await apiGetLots(params);
                runInAction(() => {
                    if (res && Array.isArray(res)) {
                        // @ts-ignore
                        this.lotsCompleted = [...this.lotsCompleted, ...res];
                    }
                });
            }
        }
    }

    async fetchCounters() {
        apiGetCounters({
            userHeaders: this.rootStore.appStore.extractHeaders(),
        }).then((counters: Counters) => {
            runInAction(() => {
                this.counters = counters;
            });
        });
    }
}
