import { Avatar, SimpleCell } from '@vkontakte/vkui';
import { format } from 'date-fns';
import React, { FC } from 'react';
import { Lot } from '../../features/lot';

type Props = {
    lot: Lot;
    goToLot: any;
    userId: number;
};

export const LotCell: FC<Props> = ({ lot, goToLot, userId }) => {
    function getTitleColor(status: string, isMyBid: boolean) {
        if (status === 'closed') {
            return {
                color: 'red',
            }
        } else if (status === 'sales') {
            if (isMyBid) {
                return {
                    color: 'green'
                }
            }
            return {
                color: 'yellow'
            }
        }
        return {
            color: 'black'
        }
    }
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
            <div style={getTitleColor(lot.status, lot.lastBidder === userId)}>{lot.title}</div>
        </SimpleCell>
    );
};
