import { Icon28ArrowLeftOutline } from '@vkontakte/icons';
import {
    Button,
    Div,
    FormItem,
    FormLayout,
    Group,
    IconButton,
    Input,
    Panel,
    PanelHeader,
    Textarea,
} from '@vkontakte/vkui';
import { format } from 'date-fns';
import React, { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { ImageInput } from '../components/ImageInput/ImageInput';
import { RootStore } from '../stores/rootStore';

type LotCreatorProps = {
    rootStore: RootStore;
    id: string;
    onCreated: any;
    isEditing: boolean;
};

export const LotCreator: FC<LotCreatorProps> = ({
    rootStore,
    id,
    isEditing,
    onCreated,
}) => {
    const [title, setTitle] = useState<string>(
        rootStore.lotsStore.currentLot?.title ?? ''
    );
    const [description, setDescription] = useState<string>(
        rootStore.lotsStore.currentLot?.description ?? ''
    );
    const [priceStart, setPriceStart] = useState<number>(
        rootStore.lotsStore.currentLot?.priceStart ?? 0
    );
    const [priceStep, setPriceStep] = useState<number>(
        rootStore.lotsStore.currentLot?.priceStep ?? 0
    );
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
    const [imageFile, setImageFile] = useState('');

    const [dirty, setDirty] = useState<Record<string, boolean>>({});

    function handleTitleInput(e: SyntheticEvent) {
        setDirty({ ...dirty, title: true });
        setTitle((e.target as HTMLInputElement).value);
    }

    function handleDescriptionInput(e: SyntheticEvent) {
        setDirty({ ...dirty, description: true });

        setDescription((e.target as HTMLInputElement).value);
    }

    function handlePriceStartInput(e: SyntheticEvent) {
        setDirty({ ...dirty, priceStart: true });

        setPriceStart(Number((e.target as HTMLInputElement).value));
    }

    function handlePriceStepInput(e: SyntheticEvent) {
        setDirty({ ...dirty, priceStep: true });

        setPriceStep(Number((e.target as HTMLInputElement).value));
    }

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

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        
        const lotDto = {
            title,
            description,
            address: '11',
            priceStart,
            priceStep,
            biddingEnd: transformToDate(date, time),
        };
        rootStore.lotsStore
            .createLot(
                lotDto,
                rootStore.lotsStore.currentLot?.id,
                Boolean(rootStore.lotsStore.currentLot)
            )
            .then((data) => {
                if (data.id && imageFile) {
                    rootStore.lotsStore.uploadImage(imageFile, data.id);
                }
            });
        onCreated();
    }

    function handleImageUpload(file: any) {
        if (file) {
            setImageFile(file);
        }
    }

    const isTitleValid = useCallback(() => {
        if (title && title.length > 0) {
            return true;
        } else if (!isEditing) {
            return !dirty['title'];
        }
        return false;
    }, [title, dirty]);

    const isDescriptionValid = useCallback(() => {
        if (description && description.length > 0) {
            return true;
        } else if (!isEditing) {
            return !dirty['description'];
        }
        return false;
    }, [title, dirty]);

    const isPriceStartValid = useCallback(() => {
        if (priceStart && typeof priceStart === 'number' && priceStart > 0) {
            return true;
        } else if (!isEditing) {
            return !dirty['priceStart'];
        }
        return false;
    }, [priceStart, dirty]);

    const isPriceStepValid = useCallback(() => {
        if (priceStep && typeof priceStep === 'number' && priceStep > 0) {
            return true;
        } else if (!isEditing) {
            return !dirty['priceStep'];
        }
        return false;
    }, [priceStep, dirty]);

    const isDateValid = useMemo(() => {
        const transformedDate = transformToDate(date, time);
        console.log('trans time', new Date(transformedDate));
        console.log('now time', Date.now());

        if ((new Date(transformedDate).getTime() > Date.now())) {
            return true;
        } else if (!isEditing) {
            return !dirty['date'];
        }
        return false;
    }, [date, dirty, time]);

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
            <Group>
                <FormLayout onSubmit={handleSubmit}>
                    <FormItem top="image">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ImageInput onUpload={handleImageUpload} />
                        </div>
                    </FormItem>
                    <FormItem
                        status={isTitleValid ? 'default' : 'error'}
                        bottom={
                            isTitleValid ? '' : 'Пожалуйста, введите название'
                        }
                        top="название"
                    >
                        <Input
                            value={title}
                            onChange={handleTitleInput}
                        ></Input>
                    </FormItem>
                    <FormItem
                        status={isDescriptionValid ? 'default' : 'error'}
                        bottom={
                            isDescriptionValid
                                ? ''
                                : 'Пожалуйста, введите описание'
                        }
                        top="описание"
                    >
                        <Textarea
                            value={description}
                            onChange={handleDescriptionInput}
                        />
                    </FormItem>
                    <FormItem
                        status={isPriceStartValid ? 'default' : 'error'}
                        bottom={
                            isPriceStartValid ? '' : 'Пожалуйста, введите цену'
                        }
                        top="стартовая цена"
                    >
                        <Input
                            type="number"
                            value={priceStart}
                            onChange={handlePriceStartInput}
                        />
                    </FormItem>
                    <FormItem
                        status={isPriceStepValid ? 'default' : 'error'}
                        bottom={
                            isPriceStepValid
                                ? ''
                                : 'Пожалуйста, введите шаг ставки'
                        }
                        top="шаг ставки"
                    >
                        <Input
                            type="number"
                            value={priceStep}
                            onChange={handlePriceStepInput}
                        />
                    </FormItem>
                    <FormItem
                        status={isDateValid ? 'default' : 'error'}
                        bottom={
                            isDateValid
                                ? ''
                                : 'Пожалуйста, введите дату'
                        }
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
                        <Button stretched size="m" type="submit">
                            {rootStore.lotsStore.currentLot
                                ? 'изменить'
                                : 'создать'}
                        </Button>
                    </Div>
                </FormLayout>
            </Group>
        </Panel>
    );
};
