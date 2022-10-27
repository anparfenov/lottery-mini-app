import { CellButton, Group, ModalPage, ModalPageHeader, ModalRoot } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Lot } from "../../features/lot";
import { Sort, UiStore } from "../../stores/uiStore";

export const sortItems: Sort[] = [
    {
        name: 'новинки',
        by: 'dateCreated',
        sortFn: (a: Lot, b: Lot) => {
            return new Date(a.biddingEnd).getTime() - new Date(b.biddingEnd).getTime()
        },
        isEnabled: true,
    },
    {
        name: 'Сначала дешевые',
        by: 'priceStart',
        sortFn: (a: Lot, b: Lot) => {
            return Number(a.priceStart) - Number(b.priceStart)
        },
        isEnabled: false,
    },
    {
        name: 'Сначала дорогие',
        by: 'priceStart',
        sortFn: (a: Lot, b: Lot) => {
            return Number(b.priceStart) - Number(a.priceStart)
        },
        isEnabled: false,
    },
]

type SortModalProps = {
    sortItems: Sort[];
    uiStore: UiStore;
    id: string;
    onPick: any;
}

export const SortModal: FC<SortModalProps> = observer(({ sortItems, uiStore, id, onPick }) => {
    function pickSortItem(sortItem: Sort) {
        uiStore.setCurrentSortByName(sortItem.name);
        onPick();
    }
    return (
        <ModalPage id={id}>
            <ModalPageHeader>
                Sort
            </ModalPageHeader>
            <Group>
                {sortItems.map((sortItem) => (<CellButton key={sortItem.name} onClick={() => pickSortItem(sortItem)}>{sortItem.name}</CellButton>))}
            </Group>
        </ModalPage>
    )
});