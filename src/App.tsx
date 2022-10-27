import {
    AppRoot,
    PanelHeader,
    SplitCol,
    SplitLayout,
    useAdaptivity,
    View,
    ViewWidth,
} from '@vkontakte/vkui';
import React, { useState } from 'react';
import { AllLots } from './panels/AllLots';
import { UserLots } from './panels/UserLots';
import { JustLot } from './panels/JustLot';
import { sortItems } from './components/SortModal/SortModal';
import { RootModal } from './widgets/Modal/RootModal';
import { rootStore } from './stores/rootStore';

export const App = () => {
    const { viewWidth } = useAdaptivity();
    const [view, setView] = useState<string>('alllots');
    const [modal, setModal] = useState<string | null>(null)
    function openSortModal() {
        setModal('sortmodal');
    }
    return (
        <AppRoot>
            <SplitLayout modal={<RootModal onClose={() => setModal(null)} activeModal={modal} sortItems={sortItems} uiStore={rootStore.uiStore} />} header={<PanelHeader separator={false} />}>
                <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
                    <View activePanel={view}>
                        <AllLots rootStore={rootStore} openSortModal={openSortModal} id="alllots" go={setView} />
                        <UserLots id="stats" go={setView} />
                        <JustLot id="lot" go={setView} />
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};
