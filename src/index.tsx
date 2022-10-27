import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';

import './global.css';
import '@vkontakte/vkui/dist/vkui.css';

bridge
    .send('VKWebAppInit', {})
    .then((data) => {
        if (data.result) {
            console.log('data', data.result);
        } else {
            console.log('error');
        }
    })
    .catch((e) => {
        console.log('catch', e);
    });

ReactDOM.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
    document.querySelector('#app')
);
