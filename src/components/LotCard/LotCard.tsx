import { Card, Div } from '@vkontakte/vkui';
import React, { FC } from 'react';
import { Lot } from '../../features/lot';
import { MyImage } from '../MyImage/MyImage';

// @ts-ignore
import style from './LotCard.module.css';

type Props = {
    lot: Lot;
};

export const LotCard: FC<Props> = ({ lot }) => {
    return (
        <Card>
            <div className={style.LotCard}>
                <MyImage src={lot.imageSrc} alt={lot.name}></MyImage>
                <Div>{lot.name}</Div>
                <Div>{lot.price}</Div>
                <Div>осталось: {lot.time}</Div>
            </div>
        </Card>
    );
};
