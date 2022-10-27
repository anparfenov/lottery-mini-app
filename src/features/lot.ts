export type Lot = {
    id: any;
    name: string;
    imageSrc: string;
    price: string;
    time?: number;
    bets?: number;
    description?: string;
    dateCreated: Date;
    ownerId: string;
}