export const API_URL = 'https://lottery-api.adv2ls.ru';

export function apiCreateLot({ userHeaders, lot }: any) {
    const body = JSON.stringify(lot);
    return fetch(`${API_URL}/lots`, {
        method: 'POST',
        headers: {
            ...userHeaders,
            'Content-Type': 'application/json',
        },
        body,
    }).then((res) => {
        return res.json();
    });
}

export function apiUpdateLot({ userHeaders, lot, id }: any) {
    const body = JSON.stringify(lot);
    return fetch(`${API_URL}/lots/${id}`, {
        method: 'PATCH',
        headers: {
            ...userHeaders,
            'Content-Type': 'application/json',
        },
        body,
    }).then((res) => {
        return res.json();
    });
}

export type LotStatus = 'open' | 'sales' | 'closed' | 'draft';

export type GetLotsProps = {
    page: number;
    limit: number;
    order?: 'id' | 'priceStart' | 'createdAt';
    dest?: 'ASC' | 'DESC';
    isMy?: boolean;
    status?: LotStatus;
    userHeaders: any;
    isOnlyBet?: boolean;
};

export function apiGetLots({
    userHeaders,
    page,
    limit,
    isMy,
    order,
    dest,
    status,
    isOnlyBet,
}: GetLotsProps) {
    const params = {
        page: String(page),
        limit: String(limit),
        order,
        dest,
        status,
        isOnlyBet,
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

export function apiGetCounters({ userHeaders }: any) {
    return fetch(`${API_URL}/lots/counters`, {
        headers: { ...userHeaders }
    }).then(res => res.json());
}

export function apiMakeBet({ bet, lotId, userHeaders }: any) {
    const dto = {
        bid: bet
    }
    return fetch(`${API_URL}/lots/${lotId}/bids`, {
        method: 'POST',
        headers: {
            ...userHeaders
        },
        body: JSON.stringify(dto),
    }).then((res) => res.json());
}

export function apiUploadImage({file, id, userHeaders}: any) {
    const formData = new FormData();
    formData.append('image', file);
    return fetch(`${API_URL}/lots/${id}/image`, {
        method: 'POST',
        headers: {
            ...userHeaders
        },
        body: formData
    }).then((res) => res.json());
}

export function apiGetById({id, userHeaders}: any) {
    return fetch(`${API_URL}/lots/${id}`, {
        method: 'GET',
        headers: {
            ...userHeaders
        },
    }).then((res) => res.json());
}
