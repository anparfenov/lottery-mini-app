import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import { Button, IconButton, Input, Panel, PanelHeader } from '@vkontakte/vkui';
import React, { FC } from 'react';
import { MyImage } from '../components/MyImage/MyImage';
import { Lot } from '../features/lot';
import { RootStore } from '../stores/rootStore';

type Props = {
    id: string;
    rootStore: RootStore;
};

type LotProps = {
    lot: Lot;
    rootStore: RootStore;
};

const Lot: FC<LotProps> = ({ lot, rootStore }) => {
    return (
        <div>
            <MyImage src={lot.imageSrc} alt={lot.name} />
            <h2>{lot.name}</h2>
            <div>
                {lot.price}
                {lot.bets}
            </div>
            <div>until end: {lot.time}</div>
            <div>
                <Input />
                <span>min step 100</span>
            </div>
            <div>{lot.description}</div>
            <Button onClick={() => rootStore.lotsStore.makeBet()}>
                make bet
            </Button>
        </div>
    );
};

export const JustLot: FC<Props> = ({ id, rootStore }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <IconButton onClick={() => rootStore.uiStore.back()}>
                        <Icon28ArrowLeftOutline />
                    </IconButton>
                }
            >
                Этот лот
            </PanelHeader>
        </Panel>
    );
};
