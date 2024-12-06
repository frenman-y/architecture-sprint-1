import { registerApplication, start } from 'single-spa';

// Регистрация микрофронтенда Auth
registerApplication({
    name: '@mesto/auth',
    app: () => System.import('@mesto/auth'),
    activeWhen: ['/signin', '/signup'],
});

// Регистрация микрофронтенда Profile
registerApplication({
    name: '@mesto/profile',
    app: () => System.import('@mesto/profile'),
    activeWhen: ['/profile'],
});

// Регистрация микрофронтенда Gallery
registerApplication({
    name: '@mesto/gallery',
    app: () => System.import('@mesto/gallery'),
    activeWhen: (location) => location.pathname === '/' || location.pathname.startsWith('/gallery'),
});

// Запуск Single SPA
start();
