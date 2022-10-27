import { Snackbar } from '@vkontakte/vkui';
import React, { FC } from 'react'

type Props = {
    name: string;
    onClose: any;
}

export const SnackBarList: FC<Props> = ({ name, onClose }) => {
    let text = '';
    if (name === 'newlot') {
        text = 'Лот создан';
    }
    return <Snackbar  onClose={onClose}>{text}</Snackbar>;
}
