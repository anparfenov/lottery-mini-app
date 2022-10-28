// enum LotStatus {
//     BUY = 'buy',
//     SELL = 'sell',
//     COMPLETED = 'completed',
// }

import { format } from "date-fns";

export type Image = {
    id: number,
    lotId: number,
    url: string,
}

export type Lot = {
    id: number;
    title: string;
    images: Image[];
    priceStart: number;
    priceStep: number;
    time?: number;
    bets?: number;
    description?: string;
    biddingEnd: string;
    authorId?: number;
    address?: string;
    status?: 'open' | 'sales' | 'closed' | 'draft';
    lastBidder?: number;
    currentBid?: number;
};

export type LotDto = {
    title?: string;
    description?: string;
    address?: string;
    priceStart?: number;
    priceStep?: number;
    biddingEnd?: string;
    status?: 'open' | 'sales' | 'closed' | 'draft';
};

export function getStatusStyle(status: string) {
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

export function makeBetsUntil(biddingEnd: string, appendText: string) {
    const biddingTime = (new Date(biddingEnd)).getTime();
    if (biddingTime < Date.now()) {
        return 'время вышло';
    }
    return `${appendText} ${format(new Date(biddingEnd), 'yyyy-MM-dd HH:mm')}`;
}
