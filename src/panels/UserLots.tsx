import { Button, Panel } from '@vkontakte/vkui';
import React, { FC } from 'react';

type Props = {
    id: any;
};

export const UserLots: FC<Props> = ({ id }) => {
    return (
        <Panel id={id}>
            UserLots
        </Panel>
    );
};
