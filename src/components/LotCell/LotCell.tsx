import { Avatar, SimpleCell } from '@vkontakte/vkui';
import { format } from 'date-fns';
import React, { FC } from 'react';
import { Lot } from '../../features/lot';

type Props = {
    lot: Lot;
    goToLot: any;
};

export const LotCell: FC<Props> = ({ lot, goToLot }) => {
    return (
        <SimpleCell
            before={
                <Avatar
                    mode="image"
                    size={40}
                    src={lot.images?.[0]?.url}
                    alt={lot.title}
                />
            }
            after={<div>{lot.priceStart}</div>}
            subtitle={`ставки до: ${format(new Date(lot.biddingEnd), 'yyyy-MM-dd')}`}
            onClick={goToLot}
        >
            {lot.title}
        </SimpleCell>
    );
};
