import { Icon20SortOutline } from '@vkontakte/icons';
import {
    Button,
    CellButton,
    Div,
    Group,
    Header,
    IconButton,
    ModalPage,
    ModalPageHeader,
    ModalRoot,
    Pagination,
    Panel,
    PanelHeader,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { SortButton } from '../components/SortButton/SortButton';
import { LotsStore } from '../stores/lotsStore';
import { RootStore } from '../stores/rootStore';
import { Sort, UiStore } from '../stores/uiStore';
import { LotsList } from '../widgets/LotsList/LotsList';

type Props = {
    go: any;
    id: any;
    rootStore: RootStore;
    openSortModal: any;
};



export const AllLots: FC<Props> = observer(({ go, id, rootStore, openSortModal }) => {
    const [page, setPage] = useState(1);
    useEffect(() => {
        rootStore.lotsStore.fetchPage(page);
    }, [page]);
    const handleChange = React.useCallback((page) => {
        setPage(page);
    }, []);

    function createLot() {
        // TODO:
    }
    return (
        <Panel id={id}>
            <PanelHeader>Auction</PanelHeader>
            <Group header={<Header mode="secondary">Lots lits</Header>}>
                <SortButton sortKey={rootStore.uiStore.currentSortItem} openSort={openSortModal} />
                <LotsList lotsList={rootStore.lotsStore.lotsList} />
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
