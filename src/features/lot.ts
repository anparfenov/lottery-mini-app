export type Lot = {
    id: any;
    name: string;
    imageSrc?: string;
    price: string;
    time?: number;
    bets?: number;
    description?: string;
    dateCreated: Date;
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
