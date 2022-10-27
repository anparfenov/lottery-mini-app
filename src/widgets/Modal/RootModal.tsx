import { ModalRoot } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { SortModal } from '../../components/SortModal/SortModal'
import { Sort, UiStore } from '../../stores/uiStore';

type Props = {
    activeModal: string | null;
    uiStore: UiStore;
    sortItems: Sort[];
    onClose: any;
}

export const RootModal: FC<Props> = observer(({ activeModal, uiStore, sortItems, onClose }) => {
  return (
    <ModalRoot onClose={onClose} activeModal={activeModal}>
        <SortModal onPick={onClose} sortItems={sortItems} uiStore={uiStore} id="sortmodal" />
    </ModalRoot>
  )
})
