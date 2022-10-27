import { Panel } from '@vkontakte/vkui';
import React, { FC } from 'react'

type Props = {
    id: string;
    go: any;
}

export const JustLot: FC<Props> = ({ id, go }) => {
  return (
    <Panel id={id}>
        JustLot
    </Panel>
  )
}
