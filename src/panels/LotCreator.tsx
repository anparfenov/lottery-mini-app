import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import {
    Button,
    FormItem,
    FormLayout,
    IconButton,
    Input,
    Panel,
    PanelHeader,
    Textarea,
} from '@vkontakte/vkui';
import { format, formatDistance } from 'date-fns';
import React, { FC, SyntheticEvent, useState } from 'react';
import { RootStore } from '../stores/rootStore';

type LotCreatorProps = {
    rootStore: RootStore;
    id: string;
    onCreated: any;
};

export const LotCreator: FC<LotCreatorProps> = ({
    rootStore,
    id,
    onCreated,
}) => {
    const [title, setTitle] = useState<string>(rootStore.lotsStore.currentLot?.title ?? '');
    const [description, setDescription] = useState<string>(rootStore.lotsStore.currentLot?.description ?? '');
    const [priceStart, setPriceStart] = useState<number>(rootStore.lotsStore.currentLot?.priceStart ?? 0);
    const [priceStep, setPriceStep] = useState<number>(rootStore.lotsStore.currentLot?.priceStep ?? 0);
    const [date, setDate] = useState<string>(rootStore.lotsStore.currentLot?.biddingEnd ? format(new Date(rootStore.lotsStore.currentLot?.biddingEnd), 'yyyy-MM-dd') : '');
    const [time, setTime] = useState<string>(rootStore.lotsStore.currentLot?.biddingEnd ? format(new Date(rootStore.lotsStore.currentLot?.biddingEnd), 'HH:mm') : '');

    function handleTitleInput(e: SyntheticEvent) {
        setTitle((e.target as HTMLInputElement).value);
    }

    function handleDescriptionInput(e: SyntheticEvent) {
        setDescription((e.target as HTMLInputElement).value);
    }

    function handlePriceStartInput(e: SyntheticEvent) {
        setPriceStart(Number((e.target as HTMLInputElement).value));
    }
    
    function handlePriceStepInput(e: SyntheticEvent) {
        setPriceStep(Number((e.target as HTMLInputElement).value));
    }

    function handleDate(e: SyntheticEvent) {
        console.log('date', (e.target as HTMLInputElement).value)
        setDate((e.target as HTMLInputElement).value);
    }

    function handleTime(e: SyntheticEvent) {
        console.log('time', (e.target as HTMLInputElement).value)
        setTime((e.target as HTMLInputElement).value);
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        function transformToDate(date: any, time: any): string {
            return `${date}T${time}:00`;
        }
        rootStore.lotsStore.createLot({
            title,
            description,
            address: '11',
            priceStart,
            priceStep,
            biddingEnd: transformToDate(date, time),
        });

        onCreated();
    }

    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <IconButton onClick={() => rootStore.uiStore.back()}>
                        <Icon28ArrowLeftOutline />
                    </IconButton>
                }
            >
                Создание лота
            </PanelHeader>
            <FormLayout onSubmit={handleSubmit}>
                <FormItem top="название">
                    <Input value={title} onChange={handleTitleInput}></Input>
                </FormItem>
                <FormItem top="описание">
                    <Textarea
                        value={description}
                        onChange={handleDescriptionInput}
                    />
                </FormItem>
                <FormItem top="стартовая цена">
                    <Input
                        type="number"
                        value={priceStart}
                        onChange={handlePriceStartInput}
                    />
                </FormItem>
                <FormItem top="шаг ставки">
                    <Input
                        type="number"
                        value={priceStep}
                        onChange={handlePriceStepInput}
                    />
                </FormItem>
                <FormItem top="время окончания ставки">
                    <Input
                        type="date"
                        value={date}
                        onChange={handleDate}
                    />
                    <Input
                        type="time"
                        value={time}
                        onChange={handleTime}
                    />
                </FormItem>
                <Button stretched size='m' type="submit">submit</Button>
            </FormLayout>
        </Panel>
    );
};
