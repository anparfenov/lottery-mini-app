import { makeAutoObservable } from 'mobx';
import { sortItems as sortModalItems } from '../components/SortModal/SortModal';
import { RootStore } from './rootStore';

export type Sort = {
    name: string;
    by: string;
    sortFn: any;
    isEnabled: boolean;
};

export type Route = {
    hash?: string;
    name: string;
};

export enum RouteName {
    ALL_LOTS = 'alllots',
    USER_LOTS = 'userlots',
    JUST_LOT = 'just_lot',
    LOT_CREATOR = 'lot_creator',
}

const routesConfig: Record<RouteName, Route> = {
    [RouteName.ALL_LOTS]: {
        name: RouteName.ALL_LOTS,
    },
    [RouteName.USER_LOTS]: {
        name: RouteName.USER_LOTS,
    },
    [RouteName.JUST_LOT]: {
        name: RouteName.JUST_LOT,
    },
    [RouteName.LOT_CREATOR]: {
        name: RouteName.LOT_CREATOR,
    },
};

export class UiStore {
    sortItems: Sort[] = sortModalItems;
    currentPanel: string = RouteName.ALL_LOTS;
    routes: Route[] = [];
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
                };
            } else {
                return {
                    ...sortItem,
                    isEnabled: false,
                };
            }
        });
        this.rootStore.lotsStore.sortLots(this.currentSortItem);
    }

    go(panelName: RouteName, before?: any) {
        if (before) {
            before();
        }
        // @ts-ignore
        this.routes.push(routesConfig[this.currentPanel]);
        this.currentPanel = panelName;
    }

    back() {
        if (this.routes.length > 0) {
            const last = this.routes.pop();
            if (last && last.name) {
                this.currentPanel = last.name;
            }
        } else {
            this.currentPanel = RouteName.ALL_LOTS;
        }
    }
}
