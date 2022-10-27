import { Button, Input, Panel } from '@vkontakte/vkui';
import React, { FC } from 'react'
import { MyImage } from '../components/MyImage/MyImage';
import { Lot } from '../features/lot';
import { RootStore } from '../stores/rootStore';

type Props = {
    id: string;
}

type LotProps = {
    lot: Lot;
    rootStore: RootStore;
}

const Lot: FC<LotProps> = ({ lot, rootStore }) => {
    return (
        <div>
            <MyImage src={lot.imageSrc} alt={lot.name} />
            <h2>{lot.name}</h2>
            <div>
                {lot.price}{lot.bets}
            </div>
            <div>
                until end: {lot.time}
            </div>
            <div>
                <Input /><span>min step 100</span>
            </div>
            <div>
                {lot.description}
            </div>
            <Button onClick={() => rootStore.lotsStore.makeBet()}>make bet</Button>
        </div>
    )
}

export const JustLot: FC<Props> = ({ id }) => {
  return (
    <Panel id={id}>
    </Panel>
  )
}
