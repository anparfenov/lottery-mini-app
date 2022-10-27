import {
    Button,
    Div,
    Group,
    Header,
    Pagination,
    Panel,
    PanelHeader,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { SortButton } from '../components/SortButton/SortButton';
import { RootStore } from '../stores/rootStore';
import { LotsList } from '../widgets/LotsList/LotsList';

type Props = {
    id: any;
    rootStore: RootStore;
    openSortModal: any;
    greet: string;
};

export const AllLots: FC<Props> = observer(({ id, rootStore, openSortModal, greet }) => {
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
            <PanelHeader>{greet}</PanelHeader>
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
