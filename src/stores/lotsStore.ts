import { makeAutoObservable, runInAction } from 'mobx';
import { Lot, LotDto } from '../features/lot';
import { Sort } from './uiStore';
import { RootStore } from './rootStore';
import { apiCreateLot, apiGetLotsByPage, apiUpdateLot } from '../features/api';

export class LotsStore {
    currentLot: Lot | null = null;
    lotsList: Lot[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 6;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    get lotsToBuy(): any[] {
        return [];
    }

    get lotsToSell(): any[] {
        return [];
    }

    get lotsCompleted(): any[] {
        return [];
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

    createLot(lot: LotDto, id?: number, isUpdate?: boolean) {
        if (isUpdate) {
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

    async fetchPage(page: number = 1) {
        const res = await apiGetLotsByPage({
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
