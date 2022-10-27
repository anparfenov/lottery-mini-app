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
                <MyImage src={lot.imageSrc} alt={lot.name}></MyImage>
                <Div>{lot.name}</Div>
                <Div>{lot.price}</Div>
                <Div>осталось: {lot.time}</Div>
            </div>
        </Card>
    );
});
