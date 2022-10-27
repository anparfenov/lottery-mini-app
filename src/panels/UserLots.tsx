import { Button, Panel } from '@vkontakte/vkui';
import React, { FC } from 'react';

type Props = {
    go: any;
    id: any;
};

export const UserLots: FC<Props> = ({ go, id }) => {
    return (
        <Panel id={id}>
            UserLots
        </Panel>
    );
};
