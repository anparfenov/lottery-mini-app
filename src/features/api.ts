import { Lot } from './lot';

export const API_URL = 'https://lottery-api.adv2ls.ru';

export function apiCreateLot({ userHeaders, lot }: any) {
    const body = JSON.stringify(lot);
    console.log('apiCreateLot', body);
    return fetch(`${API_URL}/lots`, {
        method: 'POST',
        headers: {
            ...userHeaders,
            'Content-Type': 'application/json',
        },
        body,
    }).then((res) => {
        console.log('created!!!', res);
    });
}

export function apiUpdateLot({ userHeaders, lot, id }: any) {
    const body = JSON.stringify(lot);
    console.log('apiCreateLot', body);
    return fetch(`${API_URL}/lots/${id}`, {
        method: 'PATCH',
        headers: {
            ...userHeaders,
            'Content-Type': 'application/json',
        },
        body,
    }).then((res) => {
        console.log('created!!!', res);
    });
}

export type LotStatus = 'open' | 'sales' | 'closed' | 'draft';

export type GetLotsProps = {
    page: number;
    limit: number;
    order?: 'id' | 'priceStart';
    dest?: 'ASC' | 'DESC';
    isMy?: boolean;
    status?: LotStatus;
    userHeaders: any;
};

export function apiGetLots({
    userHeaders,
    page,
    limit,
    isMy,
    order,
    dest,
    status,
}: GetLotsProps) {
    const params = {
        page: String(page),
        limit: String(limit),
        order,
        dest,
        status,
        isMy: isMy ? String(isMy) : undefined,
    }
    var filteredParams = Object.keys(params).reduce((p, c) => {
        // @ts-ignore
        if (params[c]) p[c] = params[c];
        return p;
      }, {});
    const searchParams = new URLSearchParams(filteredParams);
    return fetch(`${API_URL}/lots?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
            ...userHeaders,
        },
    }).then((res) => res.json());
}

export function apiGetCounters() {
    return fetch(`${API_URL}/lots/counters`).then(res => res.json());
}
