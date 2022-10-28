import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import {
    Group,
    HorizontalScroll,
    IconButton,
    Panel,
    PanelHeader,
    Tabs,
    TabsItem,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { LotCell } from '../components/LotCell/LotCell';
import { Lot } from '../features/lot';
import { RootStore } from '../stores/rootStore';
import { RouteName, UserLotsTab } from '../stores/uiStore';

type Props = {
    id: any;
    rootStore: RootStore;
};

type ScrollableTabsProps = {
    selected: UserLotsTab;
    setSelected: any;
};

const ScrollableTabs: FC<ScrollableTabsProps> = observer(
    ({ selected, setSelected }) => {
        return (
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
        );
    }
);

type UserLogsProps = {
    rootStore: RootStore;
};
export const UserLotsBuy: FC<UserLogsProps> = observer(({ rootStore }) => {
    useEffect(() => {
        rootStore.lotsStore.fetchPageByType(1, UserLotsTab.BUY);
        return () => {
            rootStore.lotsStore.lotsToBuy = [];
        };
    }, []);
    function goToLot(lot: Lot) {
        rootStore.lotsStore.currentLot = lot;
        rootStore.uiStore.go(RouteName.JUST_LOT);
    }
    return (
        <Group>
            {rootStore.lotsStore.lotsToBuy &&
                Array.isArray(rootStore.lotsStore.lotsToBuy) &&
                rootStore.lotsStore.lotsToBuy.map((lot) => (
                    <LotCell
                        userId={rootStore.appStore.appLaunchParams.vk_user_id}
                        key={lot.id}
                        goToLot={() => goToLot(lot)}
                        lot={lot}
                    />
                ))}
            {rootStore.lotsStore.lotsToBuy.length === 0 && <div>пусто</div>}
        </Group>
    );
});

export const UserLotsSell: FC<UserLogsProps> = observer(({ rootStore }) => {
    useEffect(() => {
        rootStore.lotsStore.fetchPageByType(1, UserLotsTab.SELL);
        return () => {
            rootStore.lotsStore.lotsToSell = [];
        };
    }, []);
    function goToLot(lot: Lot) {
        rootStore.lotsStore.currentLot = lot;
        rootStore.uiStore.go(RouteName.JUST_LOT);
    }
    return (
        <Group>
            {rootStore.lotsStore.lotsToSell &&
                Array.isArray(rootStore.lotsStore.lotsToSell) &&
                rootStore.lotsStore.lotsToSell?.map((lot) => (
                    <LotCell
                        userId={rootStore.appStore.appLaunchParams.vk_user_id}
                        key={lot.id}
                        goToLot={() => goToLot(lot)}
                        lot={lot}
                    />
                ))}
            {rootStore.lotsStore.lotsToSell.length === 0 && <div>пусто</div>}
        </Group>
    );
});

export const UserLotsCompleted: FC<UserLogsProps> = observer(
    ({ rootStore }) => {
        useEffect(() => {
            rootStore.lotsStore.fetchPageByType(1, UserLotsTab.COMPLETED);
            return () => {
                rootStore.lotsStore.lotsCompleted = [];
            };
        }, []);
        function goToLot(lot: Lot) {
            rootStore.lotsStore.currentLot = lot;
            rootStore.uiStore.go(RouteName.JUST_LOT);
        }
        return (
            <Group>
                {rootStore.lotsStore.lotsCompleted &&
                    Array.isArray(rootStore.lotsStore.lotsCompleted) &&
                    rootStore.lotsStore.lotsCompleted.map((lot) => (
                        <LotCell
                            userId={
                                rootStore.appStore.appLaunchParams.vk_user_id
                            }
                            key={lot.id}
                            goToLot={() => goToLot(lot)}
                            lot={lot}
                        />
                    ))}
                {rootStore.lotsStore.lotsCompleted.length === 0 && (
                    <div>пусто</div>
                )}
            </Group>
        );
    }
);

export const UserLots: FC<Props> = observer(({ id, rootStore }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <IconButton onClick={() => rootStore.uiStore.back()}>
                        <Icon28ArrowLeftOutline />
                    </IconButton>
                }
            >
                Мои лоты
            </PanelHeader>
            <ScrollableTabs
                selected={rootStore.uiStore.userRouteSelectedTab}
                setSelected={rootStore.uiStore.setUserRouteSelectedTab.bind(
                    rootStore.uiStore
                )}
            />
            {rootStore.uiStore.userRouteSelectedTab === UserLotsTab.BUY && (
                <UserLotsBuy rootStore={rootStore} />
            )}
            {rootStore.uiStore.userRouteSelectedTab === UserLotsTab.SELL && (
                <UserLotsSell rootStore={rootStore} />
            )}
            {rootStore.uiStore.userRouteSelectedTab ===
                UserLotsTab.COMPLETED && (
                <UserLotsCompleted rootStore={rootStore} />
            )}
        </Panel>
    );
});
