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
import React, { FC, SyntheticEvent, useState } from 'react';
import { MyImage } from '../components/MyImage/MyImage';
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
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    function handleNameInput(e: SyntheticEvent) {
        setName((e.target as HTMLInputElement).value);
    }

    function handleDescriptionInput(e: SyntheticEvent) {
        setDescription((e.target as HTMLInputElement).value);
    }

    function handlePriceInput(e: SyntheticEvent) {
        setPrice(Number((e.target as HTMLInputElement).value));
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        rootStore.lotsStore.createLot({
            id: (Math.random() + 1).toString(36).substring(7),
            name,
            description,
            price: String(price),
            dateCreated: new Date(),
            ownerId: rootStore.userStore.currentUser.id,
            imageSrc: '',
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
                    <Input value={name} onChange={handleNameInput}></Input>
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
                        value={price}
                        onChange={handlePriceInput}
                    />
                </FormItem>
                <Button stretched size='m' type="submit">submit</Button>
            </FormLayout>
        </Panel>
    );
};
