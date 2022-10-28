import { Card, Div } from '@vkontakte/vkui';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Lot } from '../../features/lot';
import { RootStore } from '../../stores/rootStore';
import { RouteName } from '../../stores/uiStore';
import { MyImage } from '../MyImage/MyImage';

// @ts-ignore
import style from './LotCard.module.css';

type Props = {
    lot: Lot;
    rootStore: RootStore;
};

export const LotCard: FC<Props> = observer(({ lot, rootStore }) => {
    function getStatusStyle(status: string) {
        if (status === 'closed') {
            return {
                backgroundColor: 'red',
                color: 'white',
            }
        } else if (status === 'sales') {
            return {
                backgroundColor: 'green',
                color: 'white'
            }
        }
        return {
            backgroundColor: 'lightgray',
            color: 'black'
        }
    }
    return (
        <Card mode="outline" onClick={() => rootStore.uiStore.go(RouteName.JUST_LOT, rootStore.lotsStore.setCurrentLot(lot))}>
            <div className={style.LotCard}>
                <MyImage src={lot.images?.[0]?.url} alt={lot.title}></MyImage>
                <h4 className={style.LotCard__title}>{lot.title}</h4>
                <div className={style.LotCard__price}>{lot.priceStart}</div>
                <div className={style.LotCard__status} style={getStatusStyle(lot.status)}>{lot.status}</div>
                {lot.currentBid && <div className={style.LotCard__bid}>{lot.currentBid}</div>}
                <div className={style.LotCard__biddingEnd}>ставки до: {format(new Date(lot.biddingEnd), 'yyyy-MM-dd')}</div>
            </div>
        </Card>
    );
});
