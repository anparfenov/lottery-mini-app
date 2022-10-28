// enum LotStatus {
//     BUY = 'buy',
//     SELL = 'sell',
//     COMPLETED = 'completed',
// }

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
