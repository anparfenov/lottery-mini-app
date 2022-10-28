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
import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { MyImage } from '../components/MyImage/MyImage';
import { Lot } from '../features/lot';
import { RootStore } from '../stores/rootStore';
import { RouteName } from '../stores/uiStore';
import { format as dateFnsFormat } from 'date-fns';

// @ts-ignore
import style from './JustLot.module.css';
import { transformToDate, useTimer } from '../stores/timer';

type LotProps = {
    lot: Lot;
    rootStore: RootStore;
    openDatePickerModal?: any;
};

const LotComponent: FC<LotProps> = ({ lot, rootStore }) => {
    const [bet, setBet] = useState<string>(
        String(rootStore.lotsStore.currentLot.bets) ?? ''
    );
    const [dirty, setDirty] = useState<Record<string, boolean>>({});

    const { start, time, stop} = useTimer()
    useEffect(() => {
        const biddingDate = (new Date(lot.biddingEnd)).getTime();
        const minutesLeft = Math.round((biddingDate - Date.now()) / 1000 / 60);    
        const endDate = minutesLeft && minutesLeft < 60 && minutesLeft > 0 ? biddingDate - Date.now() : 0;
        if (minutesLeft < 60 && minutesLeft > 0) {
            start(endDate)
        }

        return () => {
            stop()
        }
    }, []) 

    function isTimeOver() {
        return new Date(lot.biddingEnd).getTime() < new Date().getTime();
    }

    const isBetCorrect = useMemo(() => {
        if (!dirty['bet']) {
            return true;
        }
        if (lot.currentBid) {
            return parseInt(bet, 10) >= lot.currentBid + lot.priceStep;
        }
        return parseInt(bet, 10) >= lot.priceStart + lot.priceStep;
    }, [bet, dirty]);

    const isUserWinner = useMemo(() => {
        return (
            isTimeOver() &&
            lot.lastBidder === rootStore.appStore.appLaunchParams.vk_user_id
        );
    }, []);

    function openMessenger() {
        window.open(`https://vk.com/im?sel=${lot.authorId}`);
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
                <div className={style.Lot__priceStart}>
                    ставка: {lot.currentBid}
                </div>
                <div style={{ padding: '0 16px', marginTop: '6px' }}>
                    шаг: {lot.priceStep}
                </div>
                {time === 0 && <div className={style.UserLot__biddingEnd}>
                    до конца ставок:{' '}
                    {dateFnsFormat(new Date(lot.biddingEnd), 'dd/MM/yyyy HH:mm')}
                </div>}
                {time > 0 && <div className={style.UserLot__biddingEnd}>
                    до конца ставок:{' '}
                    {transformToDate(time)}
                </div>}
                {!isTimeOver() && (
                    <div>
                        <FormItem
                            top="ставка"
                            status={isBetCorrect ? 'default' : 'error'}
                            bottom={
                                isBetCorrect
                                    ? ''
                                    : `Шаг ставки ${lot.priceStep}`
                            }
                        >
                            <Input
                                type="number"
                                value={bet}
                                onChange={(e: SyntheticEvent) => {
                                    const value = (e.target as HTMLInputElement).value
                                    setDirty({ bet: true });
                                    setBet(value);
                                }}
                            />
                        </FormItem>
                    </div>
                )}
                <Div>
                    {!isTimeOver() && (
                        <Button
                            stretched
                            size="m"
                            onClick={() => {
                                if (parseInt(bet, 10) >= lot.priceStart + lot.priceStep) {
                                    rootStore.lotsStore.makeBet(parseInt(bet, 10), lot.id);
                                }
                            }}
                        >
                            сделать ставку
                        </Button>
                    )}
                    {isTimeOver() && !isUserWinner && (
                        <Button stretched disabled={true} size="m">
                            Аукцион завершен
                        </Button>
                    )}
                    {isUserWinner && (
                        <Button stretched onClick={openMessenger} size="m">
                            Связаться с продавцом
                        </Button>
                    )}
                </Div>
            </div>
        </Group>
    );
};

const UserLot: FC<LotProps> = ({ lot, rootStore, openDatePickerModal }) => {
    const { start, time, stop} = useTimer()
    useEffect(() => {
        const biddingDate = (new Date(lot.biddingEnd)).getTime();
        const minutesLeft = Math.round((biddingDate - Date.now()) / 1000 / 60);    
        const endDate = minutesLeft && minutesLeft < 60 && minutesLeft > 0 ? biddingDate - Date.now() : 0;
        if (minutesLeft < 60 && minutesLeft > 0) {
            start(endDate)
        }

        return () => {
            console.log('clean up')
            stop()
        }
    }, []) 
    function removeLot() {
        rootStore.lotsStore.closeLot().then(() => {
            rootStore.uiStore.go(RouteName.ALL_LOTS);
        });
    }
    function isTimeOver() {
        return new Date(lot.biddingEnd).getTime() < new Date().getTime();
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
                <div className={style.Lot__priceStart}>
                    ставка: {lot.currentBid}
                </div>
                {time === 0 && <div className={style.UserLot__biddingEnd}>
                    до конца ставок:{' '}
                    {dateFnsFormat(new Date(lot.biddingEnd), 'dd/MM/yyyy HH:mm')}
                </div>}
                {time > 0 && <div className={style.UserLot__biddingEnd}>
                    до конца ставок:{' '}
                    {transformToDate(time)}
                </div>}
                <Div className={style.userLot__buttons}>
                    <ButtonGroup stretched>
                        {!isTimeOver() && (
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
                        )}
                        {isTimeOver() && lot.status !== 'closed' && (
                            <Button
                                stretched
                                size="m"
                                onClick={() => {
                                    rootStore.lotsStore.currentLot = lot;
                                    openDatePickerModal();
                                }}
                            >
                                возобновить
                            </Button>
                        )}
                        <Button
                            appearance="negative"
                            stretched
                            size="m"
                            onClick={removeLot}
                        >
                            закрыть
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
    openDatePickerModal: any;
};

export const JustLot: FC<Props> = ({ id, rootStore, openDatePickerModal }) => {
    let lot = null;
    if (
        rootStore.userStore.currentUser.id ===
        rootStore.lotsStore.currentLot.authorId
    ) {
        lot = (
            <UserLot
                openDatePickerModal={openDatePickerModal}
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
