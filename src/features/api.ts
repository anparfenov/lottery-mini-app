export const API_URL = 'https://lottery-api.adv2ls.ru';

export function apiCreateLot({userHeaders, lot }: any) {
    const body = JSON.stringify(lot);
    console.log('apiCreateLot', body);
    return fetch(`${API_URL}/lots`, {
        method: 'POST',
        headers: {
            ...userHeaders,
            'Content-Type': 'application/json',
        },
        body
    })
    .then(res => {
        console.log('created!!!', res);
    })
}

export function apiUpdateLot({userHeaders, lot, id }: any) {
    const body = JSON.stringify(lot);
    console.log('apiCreateLot', body);
    return fetch(`${API_URL}/lots/${lot.id}`, {
        method: 'PATCH',
        headers: {
            ...userHeaders,
            'Content-Type': 'application/json',
        },
        body
    })
    .then(res => {
        console.log('created!!!', res);
    })
}

export function apiGetLotsByPage({userHeaders, page, limit }: any) {
    const searchParams = new URLSearchParams({ page, limit });
    return fetch(`${API_URL}/lots?${searchParams.toString()}`, {
        method: "GET",
        headers: {
            ...userHeaders
        }
    })
            .then(res => res.json());
}