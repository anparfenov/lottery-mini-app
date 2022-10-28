import { Icon28UserOutline } from '@vkontakte/icons';
import {
    Button,
    Div,
    Group,
    IconButton,
    Pagination,
    Panel,
    PanelHeader,
    useAdaptivity,
    ViewWidth,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { SortButton } from '../components/SortButton/SortButton';
import { RootStore } from '../stores/rootStore';
import { RouteName } from '../stores/uiStore';
import { LotsList } from '../widgets/LotsList/LotsList';

type Props = {
    id: any;
    rootStore: RootStore;
    openSortModal: any;
};

export const AllLots: FC<Props> = observer(
    ({ id, rootStore, openSortModal }) => {
        const [page, setPage] = useState(1);
        const {viewWidth} = useAdaptivity();
        useEffect(() => {
            rootStore.lotsStore.fetchCounters().then(() => {
                return rootStore.lotsStore.fetchPage(page);
            });
        }, [page]);
        const handleChange = React.useCallback((page) => {
            setPage(page);
        }, []);

        function createLot() {
            rootStore.lotsStore.currentLot = null;
            // TODO: add page names to enum
            rootStore.uiStore.go(RouteName.LOT_CREATOR);
        }
        return (
            <Panel id={id}>
                <PanelHeader
                    before={
                        <IconButton
                            onClick={() =>
                                rootStore.uiStore.go(RouteName.USER_LOTS)
                            }
                        >
                            <Icon28UserOutline />
                        </IconButton>
                    }
                >
                    VK Аукцион
                </PanelHeader>
                <Group>
                    <SortButton
                        sortKey={rootStore.uiStore.currentSortItem}
                        openSort={openSortModal}
                    />
                    <LotsList
                        size={ViewWidth && viewWidth <= ViewWidth.MOBILE ? 'm' : 's'}
                        rootStore={rootStore}
                        lotsList={rootStore.lotsStore.lotsList}
                    />
                    <Div
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <Pagination
                            currentPage={page}
                            totalPages={rootStore.lotsStore.totalPages}
                            onChange={handleChange}
                        />
                    </Div>
                    <Div>
                        <Button size="m" stretched onClick={createLot}>
                            создать
                        </Button>
                    </Div>
                </Group>
            </Panel>
        );
    }
);
