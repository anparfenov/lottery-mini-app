import { CardGrid } from '@vkontakte/vkui'
import React, { FC } from 'react'
import { LotCard } from '../../components/LotCard/LotCard';
import { Lot } from '../../features/lot';

type Props = {
    lotsList: Lot[];
}

export const LotsList: FC<Props> = ({ lotsList }) => {
  return (
    <CardGrid size='m'>
        {lotsList.map((lot) => {
            return (<LotCard key={lot.id} lot={lot} />)
        })}
    </CardGrid>
  )
}
