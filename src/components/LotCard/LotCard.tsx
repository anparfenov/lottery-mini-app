import { Card, Div } from '@vkontakte/vkui';
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
    return (
        <Card onClick={() => rootStore.uiStore.go(RouteName.JUST_LOT, rootStore.lotsStore.setCurrentLot(lot))}>
            <div className={style.LotCard}>
                <MyImage src={lot.images?.[0]?.url} alt={lot.title}></MyImage>
                <Div>{lot.title}</Div>
                <Div>{lot.priceStart}</Div>
                <Div>осталось: {lot.biddingEnd}</Div>
            </div>
        </Card>
    );
});
