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
import { AllLots } from './panels/AllLots';
import { UserLots } from './panels/UserLots';
import { JustLot } from './panels/JustLot';
import { sortItems } from './components/SortModal/SortModal';
import { RootModal } from './widgets/Modal/RootModal';
import { rootStore } from './stores/rootStore';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
    const { viewWidth } = useAdaptivity();
    const [modal, setModal] = useState<string | null>(null);
    const [greet, setGreet] = useState<string>('Auction');
    function openSortModal() {
        setModal('sortmodal');
    }
    useEffect(() => {
        fetch('https://lottery-api.adv2ls.ru/').then((res) => res.json()).then((res) => {setGreet(res.greetings)})
    }, [])
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
                header={<PanelHeader separator={false}>{greet}</PanelHeader>}
            >
                <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
                    <View activePanel={rootStore.uiStore.currentPanel}>
                        <AllLots
                            greet={greet}
                            rootStore={rootStore}
                            openSortModal={openSortModal}
                            id="alllots"
                        />
                        <UserLots id="userlots" />
                        <JustLot id="justlot" />
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
});
