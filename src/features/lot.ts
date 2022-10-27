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
};

export type LotDto = {
    title: string;
    description: string;
    address: string;
    priceStart: number;
    priceStep: number;
    biddingEnd: string;
};
