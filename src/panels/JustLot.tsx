import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import {
    Button,
    ButtonGroup,
    FormItem,
    IconButton,
    Input,
    Panel,
    PanelHeader,
} from '@vkontakte/vkui';
import React, { FC, SyntheticEvent, useState } from 'react';
import { MyImage } from '../components/MyImage/MyImage';
import { Lot } from '../features/lot';
import { RootStore } from '../stores/rootStore';
import { RouteName } from '../stores/uiStore';

type LotProps = {
    lot: Lot;
    rootStore: RootStore;
};

const Lot: FC<LotProps> = ({ lot, rootStore }) => {
    const [bet, setBet] = useState(rootStore.lotsStore.currentLot.bets ?? 0);
    return (
        <div>
            <MyImage src={lot.imageSrc} alt={lot.title} />
            <h2>{lot.title}</h2>
            <div>
                {lot.priceStart}
                {lot.bets}
            </div>
            <div>until end: {lot.time}</div>
            <div>
                <FormItem top="ставка">
                    <Input
                        type="number"
                        value={bet}
                        onChange={(e: SyntheticEvent) =>
                            setBet(Number((e.target as HTMLInputElement).value))
                        }
                    />
                </FormItem>
                <span>min step {lot.priceStep}</span>
            </div>
            <div>{lot.description}</div>
            <div>
                <Button
                    stretched
                    size="m"
                    onClick={() => rootStore.lotsStore.makeBet()}
                >
                    сделать ставку
                </Button>
            </div>
        </div>
    );
};

const UserLot: FC<LotProps> = ({ lot, rootStore }) => {
    function removeLot() {
        rootStore.lotsStore.removeLotById(lot.id);
        rootStore.uiStore.go(RouteName.ALL_LOTS);
    }
    return (
        <div>
            <MyImage src={lot.imageSrc} alt={lot.title} />
            <h2>{lot.title}</h2>
            <div>
                {lot.priceStart}
                {lot.bets}
            </div>
            <div>until end: {lot.time}</div>
            <div>{lot.description}</div>
            <div>
                <ButtonGroup stretched>
                    <Button
                        stretched
                        size="m"
                        onClick={() => {
                            rootStore.lotsStore.currentLot = lot;
                            rootStore.uiStore.go(RouteName.LOT_CREATOR);
                        }}
                    >
                        изменить
                    </Button>
                    <Button stretched size="m" onClick={removeLot}>
                        удалить
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

type Props = {
    id: string;
    rootStore: RootStore;
};

export const JustLot: FC<Props> = ({ id, rootStore }) => {
    let lot = null;
    if (
        rootStore.userStore.currentUser.id !==
        rootStore.lotsStore.currentLot.ownerId
    ) {
        lot = (
            <UserLot
                lot={rootStore.lotsStore.currentLot}
                rootStore={rootStore}
            />
        );
    } else {
        lot = (
            <Lot
                lot={rootStore.lotsStore.currentLot}
                rootStore={rootStore}
            ></Lot>
        );
    }
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
            {lot}
        </Panel>
    );
};
