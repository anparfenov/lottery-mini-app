import { Icon20SortOutline } from '@vkontakte/icons'
import { IconButton } from '@vkontakte/vkui'
import React, { FC } from 'react'
// @ts-ignore
import style from './SortButton.module.css';

type Props = {
    openSort: any;
    sortKey: any;
}

export const SortButton: FC<Props> = ({ openSort, sortKey }) => {
  return (
    <div className={style.SortButton}>
        <span>{sortKey.name}</span>
        <IconButton onClick={openSort}><Icon20SortOutline /></IconButton>
    </div>
  )
}
