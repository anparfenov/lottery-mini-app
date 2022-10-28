import { ModalRoot } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { DatePickerModal } from '../../components/DatePickerModal/DatePickerModal';
import { SortModal } from '../../components/SortModal/SortModal'
import { RootStore, rootStore } from '../../stores/rootStore';
import { Sort, UiStore } from '../../stores/uiStore';

type Props = {
    activeModal: string | null;
    uiStore: UiStore;
    sortItems: Sort[];
    onClose: any;
    rootStore: RootStore;
    onDatePick: any;
}

export const RootModal: FC<Props> = observer(({ activeModal, rootStore, uiStore, sortItems, onClose, onDatePick }) => {
  return (
    <ModalRoot onClose={onClose} activeModal={activeModal}>
        <SortModal onPick={onClose} sortItems={sortItems} uiStore={uiStore} id="sortmodal" />
        <DatePickerModal onPick={onDatePick} rootStore={rootStore} id="datepicker" />
    </ModalRoot>
  )
})
