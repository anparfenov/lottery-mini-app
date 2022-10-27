enum LotStatus {
    BUY = 'buy',
    SELL = 'sell',
    COMPLETED = 'completed',
}

export type Lot = {
    id: any;
    title: string;
    imageSrc?: string;
    priceStart: number;
    priceStep: number;
    time?: number;
    bets?: number;
    description?: string;
    biddingEnd: string;
    ownerId: string;
    address?: string;
    status?: LotStatus;
};

export type LotDto = {
    title: string;
    description: string;
    address: string;
    priceStart: number;
    priceStep: number;
    biddingEnd: string;
};
