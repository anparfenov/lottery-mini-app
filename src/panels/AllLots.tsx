import { Icon28MenuOutline } from '@vkontakte/icons';
import {
    Button,
    Div,
    Group,
    Header,
    IconButton,
    Pagination,
    Panel,
    PanelHeader,
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

export const AllLots: FC<Props> = observer(({ id, rootStore, openSortModal }) => {
    const [page, setPage] = useState(1);
    useEffect(() => {
        rootStore.lotsStore.fetchPage(page);
    }, [page]);
    const handleChange = React.useCallback((page) => {
        setPage(page);
    }, []);

    function createLot() {
        // TODO: add page names to enum
        rootStore.uiStore.go(RouteName.LOT_CREATOR);
    }
    return (
        <Panel id={id}>
            <PanelHeader before={<IconButton><Icon28MenuOutline /></IconButton>}>Аукцион</PanelHeader>
            <Group header={<Header mode="secondary">Lots lits</Header>}>
                <SortButton sortKey={rootStore.uiStore.currentSortItem} openSort={openSortModal} />
                <LotsList rootStore={rootStore} lotsList={rootStore.lotsStore.lotsList} />
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
                        totalPages={4}
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
});
