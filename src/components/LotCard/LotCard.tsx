import { Card, Div } from '@vkontakte/vkui';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { getStatusStyle, Lot, makeBetsUntil } from '../../features/lot';
import { RootStore } from '../../stores/rootStore';
import { transformToDate, useTimer } from '../../stores/timer';
import { RouteName } from '../../stores/uiStore';
import { MyImage } from '../MyImage/MyImage';

// @ts-ignore
import style from './LotCard.module.css';

type Props = {
    lot: Lot;
    rootStore: RootStore;
};

export const LotCard: FC<Props> = observer(({ lot, rootStore }) => {
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
    return (
        <Card mode="outline" onClick={() => rootStore.uiStore.go(RouteName.JUST_LOT, rootStore.lotsStore.setCurrentLot(lot))}>
            <div className={style.LotCard}>
                <MyImage src={lot.images?.[0]?.url} alt={lot.title}></MyImage>
                <h4 className={style.LotCard__title}>{lot.title}</h4>
                <div className={style.LotCard__price}>{lot.priceStart}</div>
                <div className={style.LotCard__status} style={getStatusStyle(lot.status)}>{lot.status}</div>
                {lot.currentBid && <div className={style.LotCard__bid}>ставка: {lot.currentBid}</div>}
                {time === 0 && <div className={style.LotCard__biddingEnd}>{makeBetsUntil(lot.biddingEnd, 'ставки до:')}</div>}
                {time > 0 && <div className={style.LotCard__biddingEnd}>осталось: {transformToDate(time)}</div>}
            </div>
        </Card>
    );
});
