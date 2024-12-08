import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import ProfileApp from './ProfileApp'; // Корневой компонент микрофронтенда Profile

const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: ProfileApp,
    errorBoundary(err, info, props) {
        return null;
    },
});

export const { bootstrap, mount, unmount } = lifecycles;
