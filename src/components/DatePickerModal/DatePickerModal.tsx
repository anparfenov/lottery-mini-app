import {
    Button,
    Div,
    FormItem,
    FormLayout,
    Input,
    ModalPage,
} from '@vkontakte/vkui';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { FC, SyntheticEvent, useMemo, useState } from 'react';
import { RootStore } from '../../stores/rootStore';

type DatePickerModalProps = {
    rootStore: RootStore;
    id: string;
    onPick: any;
};

export const DatePickerModal: FC<DatePickerModalProps> = observer(
    ({ id, onPick, rootStore }) => {
        const [date, setDate] = useState<string>(
            rootStore.lotsStore.currentLot?.biddingEnd
                ? format(
                      new Date(rootStore.lotsStore.currentLot?.biddingEnd),
                      'yyyy-MM-dd'
                  )
                : ''
        );
        const [time, setTime] = useState<string>(
            rootStore.lotsStore.currentLot?.biddingEnd
                ? format(
                      new Date(rootStore.lotsStore.currentLot?.biddingEnd),
                      'HH:mm'
                  )
                : ''
        );
    
        const [dirty, setDirty] = useState<Record<string, boolean>>({});
    

        function handleDate(e: SyntheticEvent) {
            setDirty({ ...dirty, date: true });
            console.log('hello');
            setDate((e.target as HTMLInputElement).value);
        }
    
        function handleTime(e: SyntheticEvent) {
            setDirty({ ...dirty, date: true });
    
            setTime((e.target as HTMLInputElement).value);
        }

        function transformToDate(date: any = '2022-01-01', time: any = '00:00'): string {
            console.log('transformToDate', date, time)
            if (date === '') {
                date = '2022-01-01'
            }
            if (time === '') {
                time = '00:00'
            }
            return `${date}T${time}:00`;
        }

        const isDateValid = useMemo(() => {
            const transformedDate = transformToDate(date, time);
            if (!dirty['date']) {
                return true;
            }
            return (new Date(transformedDate)).getTime() > Date.now();
        }, [date, dirty, time]);

        function handleSubmit(e: SyntheticEvent) {
            e.preventDefault();
            onPick(transformToDate(date, time));
        }
    
        return (
            <ModalPage id={id}>
                <FormLayout onSubmit={handleSubmit}>
                    <FormItem
                        status={isDateValid ? 'default' : 'error'}
                        bottom={isDateValid ? '' : 'Пожалуйста, введите дату'}
                        top="время окончания ставки"
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
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
                        </div>
                    </FormItem>
                    <Div>
                        <Button size='m' stretched type="submit">выложить заново</Button>
                    </Div>
                </FormLayout>
            </ModalPage>
        );
    }
);
