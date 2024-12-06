import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import AuthApp from './AuthApp'; // Корневой компонент микрофронтенда Auth

const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: AuthApp,
    errorBoundary(err, info, props) {
        // Обработка ошибок
        return null;
    },
});

export const { bootstrap, mount, unmount } = lifecycles;
