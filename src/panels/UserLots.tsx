import {
    Icon16Dropdown,
    Icon20NewsfeedOutline,
    Icon20PictureOutline,
    Icon20ThumbsUpOutline,
    Icon20UsersOutline,
    Icon24NewsfeedOutline,
    Icon24PictureOutline,
    Icon24ThumbsUpOutline,
    Icon24UsersOutline,
    Icon28ArrowLeftOutline,
} from '@vkontakte/icons';
import {
    Badge,
    Cell,
    Group,
    HorizontalScroll,
    IconButton,
    Panel,
    PanelHeader,
    SimpleCell,
    Tabs,
    TabsItem,
} from '@vkontakte/vkui';
import React, { FC } from 'react';
import { LotCard } from '../components/LotCard/LotCard';
import { LotCell } from '../components/LotCell/LotCell';
import { Lot } from '../features/lot';
import { RootStore } from '../stores/rootStore';
import { RouteName } from '../stores/uiStore';

type Props = {
    id: any;
    rootStore: RootStore;
};

enum UserLotsTab {
    SELL = 'sell',
    BUY = 'buy',
    COMPLETED = 'COMPLETED',
}

type ScrollableTabsProps = {
    selected: UserLotsTab;
    setSelected: any;
}

const ScrollableTabs: FC<ScrollableTabsProps> = ({ selected, setSelected }) => {

    return (
        <Group>
            <Tabs>
                <HorizontalScroll arrowSize="m">
                    <TabsItem
                        selected={selected === UserLotsTab.BUY}
                        onClick={() => setSelected(UserLotsTab.BUY)}
                    >
                        Покупаю
                    </TabsItem>
                    <TabsItem
                        selected={selected === UserLotsTab.SELL}
                        onClick={() => setSelected(UserLotsTab.SELL)}
                    >
                        Продаю
                    </TabsItem>
                    <TabsItem
                        selected={selected === UserLotsTab.COMPLETED}
                        onClick={() => setSelected(UserLotsTab.COMPLETED)}
                    >
                        Завершено
                    </TabsItem>
                </HorizontalScroll>
            </Tabs>
        </Group>
    );
};

type UserLogsProps = {
    rootStore: RootStore;
}
export const UserLotsBuy: FC<UserLogsProps> = ({ rootStore}) => {
    function goToLot(lot: Lot) {
        rootStore.lotsStore.currentLot = lot;
        rootStore.uiStore.go(RouteName.JUST_LOT);
    }
    return (
        <Group>
            {rootStore.lotsStore.lotsToBuy.map((lot) => <LotCell goToLot={() => goToLot(lot)} lot={lot} />)}
        </Group>
    )
}

export const UserLotsSell: FC<UserLogsProps> = ({ rootStore}) => {
    function goToLot(lot: Lot) {
        rootStore.lotsStore.currentLot = lot;
        rootStore.uiStore.go(RouteName.JUST_LOT);
    }
    return (
        <Group>
            {rootStore.lotsStore.lotsToSell.map((lot) => <LotCell goToLot={() => goToLot(lot)} lot={lot} />)}
        </Group>
    )
}

export const UserLotsCompleted: FC<UserLogsProps> = ({ rootStore}) => {
    function goToLot(lot: Lot) {
        rootStore.lotsStore.currentLot = lot;
        rootStore.uiStore.go(RouteName.JUST_LOT);
    }
    return (
        <Group>
            {rootStore.lotsStore.lotsCompleted.map((lot) => <LotCell goToLot={() => goToLot(lot)} lot={lot} />)}
        </Group>
    )
}

export const UserLots: FC<Props> = ({ id, rootStore }) => {
    const [selectedTab, setSelectedTab] = React.useState(UserLotsTab.BUY);

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <IconButton onClick={() => rootStore.uiStore.back()}>
                        <Icon28ArrowLeftOutline />
                    </IconButton>
                }
            >
            </PanelHeader>
            <ScrollableTabs selected={selectedTab} setSelected={setSelectedTab} />
            {selectedTab === UserLotsTab.BUY && <UserLotsBuy rootStore={rootStore} />}
            {selectedTab === UserLotsTab.SELL && <UserLotsSell rootStore={rootStore} />}
            {selectedTab === UserLotsTab.COMPLETED && <UserLotsCompleted rootStore={rootStore} />}
        </Panel>
    );
};
