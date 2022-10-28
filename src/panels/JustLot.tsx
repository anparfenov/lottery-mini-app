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
    function isTimeOver() {
        return new Date(lot.biddingEnd).getTime() < new Date().getTime();
    }
    return (
        <Group>
            <div className={style.Lot}>
                <div className={style.Lot__image}>
                    <MyImage src={lot.images?.[0]?.url} alt={lot.title} />
                </div>
                <h2 className={style.Lot__title}>{lot.title}</h2>
                <div className={style.Lot__description}>{lot.description}</div>
                <div className={style.Lot__priceStart}>
                    цена: {lot.priceStart}
                </div>
                <div className={style.Lot__biddingEnd}>
                    до конца ставок:{' '}
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
                </div>
                <Div>
                    {!isTimeOver() && (
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
                    )}
                    {isTimeOver() && (
                        <Button stretched disabled={true} size="m">
                            Аукцион завершен
                        </Button>
                    )}
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
            <div className={style.UserLot}>
                <div className={style.UserLot__image}>
                    <MyImage src={lot.images?.[0]?.url} alt={lot.title} />
                </div>
                <h2 className={style.UserLot__title}>{lot.title}</h2>
                <div className={style.UserLot__description}>
                    {lot.description}
                </div>
                <div className={style.UserLot__price}>
                    цена: {lot.priceStart}
                </div>
                <div className={style.UserLot__biddingEnd}>
                    до конца ставок:{' '}
                    {dateFnsFormat(new Date(lot.biddingEnd), 'dd/MM/yyyy')}
                </div>
                <Div className={style.userLot__buttons}>
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
                        <Button
                            appearance="negative"
                            stretched
                            size="m"
                            onClick={removeLot}
                        >
                            удалить
                        </Button>
                    </ButtonGroup>
                </Div>
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
                {rootStore.lotsStore.currentLot.title}
            </PanelHeader>
            {lot}
        </Panel>
    );
};
