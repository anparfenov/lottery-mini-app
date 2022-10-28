import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import {
    Button,
    ButtonGroup,
    Div,
    FormItem,
    Group,
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
import { format as dateFnsFormat } from 'date-fns';

// @ts-ignore
import style from './JustLot.module.css';

type LotProps = {
    lot: Lot;
    rootStore: RootStore;
};

const LotComponent: FC<LotProps> = ({ lot, rootStore }) => {
    const [bet, setBet] = useState<number>(
        rootStore.lotsStore.currentLot.bets ?? 0
    );
    return (
        <Group>
            <div className={style.Lot}>
                <div className={style.Lot__image}>
                    <MyImage src={lot.images?.[0]?.url} alt={lot.title} />
                </div>
                <h2 className={style.Lot__title}>{lot.title}</h2>
                <div className={style.Lot__priceStart}>{lot.priceStart}</div>
                <div className={style.Lot__biddingEnd}>
                    until end:{' '}
                    {dateFnsFormat(new Date(lot.biddingEnd), 'dd/MM/yyyy')}
                </div>
                <div>
                    <FormItem
                        top="ставка"
                        status={
                            bet >= lot.priceStart + lot.priceStep
                                ? 'default'
                                : 'error'
                        }
                        bottom={
                            bet >= lot.priceStart + lot.priceStep
                                ? ''
                                : `Шаг ставки ${lot.priceStep}`
                        }
                    >
                        <Input
                            type="number"
                            value={bet}
                            onChange={(e: SyntheticEvent) => {
                                const value = Number(
                                    (e.target as HTMLInputElement).value
                                );
                                setBet(value);
                            }}
                        />
                    </FormItem>
                    <span>min step {lot.priceStep}</span>
                </div>
                <div className={style.Lot__description}>{lot.description}</div>
                <Div>
                    <Button
                        stretched
                        size="m"
                        onClick={() => {
                            if (bet >= lot.priceStart + lot.priceStep) {
                                rootStore.lotsStore.makeBet(bet, lot.id);
                            }
                        }}
                    >
                        сделать ставку
                    </Button>
                </Div>
            </div>
        </Group>
    );
};

const UserLot: FC<LotProps> = ({ lot, rootStore }) => {
    function removeLot() {
        rootStore.lotsStore.removeLotById(lot.id);
        rootStore.uiStore.go(RouteName.ALL_LOTS);
    }
    return (
        <Group>
            <div>
                <MyImage src={lot.images?.[0]?.url} alt={lot.title} />
                <h2>{lot.title}</h2>
                <div>
                    {lot.priceStart}
                    {lot.bets}
                </div>
                <div>
                    until end:{' '}
                    {dateFnsFormat(new Date(lot.biddingEnd), 'dd/MM/yyyy')}
                </div>
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
        </Group>
    );
};

type Props = {
    id: string;
    rootStore: RootStore;
};

export const JustLot: FC<Props> = ({ id, rootStore }) => {
    let lot = null;
    if (
        rootStore.userStore.currentUser.id ===
        rootStore.lotsStore.currentLot.authorId
    ) {
        lot = (
            <UserLot
                lot={rootStore.lotsStore.currentLot}
                rootStore={rootStore}
            />
        );
    } else {
        lot = (
            <LotComponent
                lot={rootStore.lotsStore.currentLot}
                rootStore={rootStore}
            ></LotComponent>
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
