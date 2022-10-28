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
import React, { FC, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
    const [priceStart, setPriceStart] = useState<string>(
        String(rootStore.lotsStore.currentLot?.priceStart) ?? ''
    );
    const [priceStep, setPriceStep] = useState<string>(
        String(rootStore.lotsStore.currentLot?.priceStep) ?? ''
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

    const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);

    const [isPriceStartValid, setIsPriceStartValid] = useState<boolean>(true);

    const [isPriceStepValid, setIsPriceStepValid] = useState<boolean>(true);

    const [isDateValid, setIsDateValid] = useState<boolean>(true);


    const [imageError, setImageError] = useState<boolean>(false);

    function handleTitleInput(e: SyntheticEvent) {
        setDirty({ ...dirty, title: true });
        setTitle((e.target as HTMLInputElement).value);
    }

    function handleDescriptionInput(e: SyntheticEvent) {
        setDirty({ ...dirty, description: true });

        setDescription((e.target as HTMLInputElement).value);
    }

    function handlePriceStartInput(e: SyntheticEvent) {
        console.log('price start', (e.target as HTMLInputElement).value);
        setDirty({ ...dirty, priceStart: true });

        setPriceStart((e.target as HTMLInputElement).value);
    }

    function handlePriceStepInput(e: SyntheticEvent) {
        setDirty({ ...dirty, priceStep: true });

        setPriceStep((e.target as HTMLInputElement).value);
    }

    function handleDate(e: SyntheticEvent) {
        setDirty({ ...dirty, date: true });
        setDate((e.target as HTMLInputElement).value);
    }

    function handleTime(e: SyntheticEvent) {
        setDirty({ ...dirty, date: true });

        setTime((e.target as HTMLInputElement).value);
    }

    function transformToDate(date: any = '2022-01-01', time: any = '00:00'): string {
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
            priceStart: Number(priceStart),
            priceStep: Number(priceStep),
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
            setImageError(false);
            setImageFile(file);
        }
    }

    function handleImageError() {
        setImageError(true);
    }

    useEffect(() => {
        if (!isEditing && !dirty['title']) {
            setIsTitleValid(true);
        } else if (title && title.length > 0) {
            setIsTitleValid(true);
        } else if (!isEditing) {
            setIsTitleValid(!dirty['title']);
        } else {
            setIsTitleValid(false);
        }
    }, [title])

    useEffect(() => {
        if (!isEditing && !dirty['description']) {
            setIsDescriptionValid(true);
        } else if (description && description.length > 0) {
            setIsDescriptionValid(true);
        } else if (!isEditing) {
            setIsDescriptionValid(!dirty['description']);
        } else {
            setIsDescriptionValid(false);
        }
    }, [description])

    useEffect(() => {
        console.log('ps', parseInt(priceStart, 10))
        if (!isEditing && !dirty['priceStart']) {
            setIsPriceStartValid(true);
        } else if (priceStart && parseInt(priceStart, 10) > 0) {
            setIsPriceStartValid(true);
        } else if (!isEditing) {
            setIsPriceStartValid(!dirty['priceStart']);
        } else {
            setIsPriceStartValid(false);
        }
    }, [priceStart])

    useEffect(() => {
        if (!isEditing && !dirty['priceStep']) {
            setIsPriceStepValid(true);
        } else if (priceStep && parseInt(priceStep, 10) > 0) {
            setIsPriceStepValid(true);
        } else if (!isEditing) {
            setIsPriceStepValid(!dirty['priceStep']);
        } else {
            setIsPriceStepValid(false);
        }
    }, [priceStep])

    useEffect(() => {
        if (!isEditing && !dirty['date']) {
            setIsDateValid(true);
        } 
        const transformedDate = transformToDate(date, time);

        if ((new Date(transformedDate).getTime() > Date.now())) {
            setIsDateValid(true);
        } else if (!isEditing) {
            setIsDateValid(!dirty['date']);
        } else {
            setIsDateValid(false);
        }
    }, [date])

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
                    <FormItem 
                    status={!imageError ? 'default' : 'error'}
                    bottom={
                        !imageError ? '' : 'Изображение невалидно, возможно превышен лимит размера 200KB'
                    }
                    top="image">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ImageInput onError={handleImageError} onUpload={handleImageUpload} />
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
                                : 'Пожалуйста, введите верную дату (должна быть больше нынешней)'
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
