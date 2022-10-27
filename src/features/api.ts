import { Lot, LotDto } from "./lot";

export const API_URL = 'https://lottery-api.adv2ls.ru';

export function apiCreateLot(lot: LotDto) {
    const body = JSON.stringify(lot);
    console.log('apiCreateLot', body);
    fetch(`${API_URL}/lots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => {
        console.log('created!!!', res);
    })
}