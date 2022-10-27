import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import { Button, IconButton, Panel, PanelHeader } from '@vkontakte/vkui';
import React, { FC } from 'react';
import { RootStore } from '../stores/rootStore';

type Props = {
    id: any;
    rootStore: RootStore;
};

export const UserLots: FC<Props> = ({ id, rootStore }) => {
    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <IconButton onClick={() => rootStore.uiStore.back()}>
                        <Icon28ArrowLeftOutline />
                    </IconButton>
                }
            ></PanelHeader>
            UserLots
        </Panel>
    );
};
