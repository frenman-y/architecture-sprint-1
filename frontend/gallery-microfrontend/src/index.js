import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import GalleryApp from './GalleryApp'; // Корневой компонент микрофронтенда Gallery

const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: GalleryApp,
    errorBoundary(err, info, props) {
        return null;
    },
});

export const { bootstrap, mount, unmount } = lifecycles;
