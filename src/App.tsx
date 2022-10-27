import {
    AppRoot,
    PanelHeader,
    SplitCol,
    SplitLayout,
    useAdaptivity,
    View,
    ViewWidth,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { AllLots } from './panels/AllLots';
import { UserLots } from './panels/UserLots';
import { JustLot } from './panels/JustLot';
import { sortItems } from './components/SortModal/SortModal';
import { RootModal } from './widgets/Modal/RootModal';
import { rootStore } from './stores/rootStore';
import { observer } from 'mobx-react-lite';
import { LotCreator } from './panels/LotCreator';
import { SnackBarList } from './widgets/SnackBarList/SnackBarList';
import { RouteName } from './stores/uiStore';

export const App = observer(() => {
    const { viewWidth } = useAdaptivity();
    const [modal, setModal] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState(null);
    function openSortModal() {
        setModal('sortmodal');
    }
    useEffect(() => {
        bridge
            .send('VKWebAppGetLaunchParams')
            .then((data: any) => {
                if (data.vk_app_id) {
                    console.log('data');
                }
            })
            .catch((error) => {
                // Ошибка
                console.log(error);
            });
    }, []);
    return (
        <AppRoot>
            <SplitLayout
                modal={
                    <RootModal
                        onClose={() => setModal(null)}
                        activeModal={modal}
                        sortItems={sortItems}
                        uiStore={rootStore.uiStore}
                    />
                }
                header={<PanelHeader separator={false}>Auction</PanelHeader>}
            >
                <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
                    <View activePanel={rootStore.uiStore.currentPanel}>
                        <AllLots
                            rootStore={rootStore}
                            openSortModal={openSortModal}
                            id={RouteName.ALL_LOTS}
                        />
                        <UserLots
                            rootStore={rootStore}
                            id={RouteName.USER_LOTS}
                        />
                        <JustLot
                            rootStore={rootStore}
                            id={RouteName.JUST_LOT}
                        />
                        <LotCreator
                            id={RouteName.LOT_CREATOR}
                            rootStore={rootStore}
                            onCreated={() => setSnackbar('newlot')}
                        />
                    </View>
                    {snackbar && (
                        <SnackBarList
                            name={snackbar}
                            onClose={() => setSnackbar(null)}
                        />
                    )}
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
});
