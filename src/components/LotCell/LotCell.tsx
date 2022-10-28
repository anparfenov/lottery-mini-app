import { Avatar, SimpleCell } from '@vkontakte/vkui';
import { format } from 'date-fns';
import React, { FC, useEffect } from 'react';
import { Lot, makeBetsUntil } from '../../features/lot';
import { transformToDate, useTimer } from '../../stores/timer';

type Props = {
    lot: Lot;
    goToLot: any;
    userId: number;
};

export const LotCell: FC<Props> = ({ lot, goToLot, userId }) => {
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
    }, []);
    
    function getTitleColor(status: string, isMyBid: boolean) {
        if (status === 'closed') {
            return {
                color: 'red',
            }
        } else if (status === 'sales') {
            if (isMyBid) {
                return {
                    color: 'goldenrod'
                }
            }
            return {
                color: 'green'
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
            after={<div>цена: {lot.priceStart}</div>}
            subtitle={time === 0 ? makeBetsUntil(lot.biddingEnd, 'ставки до: ') : `осталось: ${transformToDate(time)}`}
            onClick={goToLot}
        >
            <div style={getTitleColor(lot.status, lot.lastBidder === userId)}>{lot.title}</div>
        </SimpleCell>
    );
};
