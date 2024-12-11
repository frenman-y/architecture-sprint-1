Задание 1
===========


Описание структуры исходного кода
------------------------
1.BackEnd 
1.1 scripts  настройка переменных окружения
1.2 src - код проекта
1.2.1 controllers реализация обработчиков запросов к API
- cards, api: 
    -CRUD Cards-               -Likes-
    getCards,                  dislikeCard
    createCard,                likeCard
    deleteCard, 
- users
    -CRUD Users-               -Profole-          -Auth-
    getUsers                   updateUserInfo     login
    getUser                    updateUserAvatar
    getCurrentUser
    createUser
1.2.2 errors - справочник кода и текста ошибок
1.2.3 middlewares - универсальные алгоритмы
1.2.4 models - структура интерфейса 
    - card - структура интерфейса карточки в режиме добавления
    - user - структура интерфейса профиля в режиме редактирования
1.2.5 routs - сигнатура методов API, роутинг
- cards, api: 
    -CRUD Cards-               -Likes-
    getCards,                  dislikeCard
    createCard,                likeCard
    deleteCard, 
- users
    -CRUD Users-               -Profole-          -Auth-
    getUsers                   updateUserInfo     login
    getUser                    updateUserAvatar
    getCurrentUser
    createUser
- index.ts - список всех url api
    - /signup
    - /signin - /signin - ввод логина пароля, регистрация (POST, OPTIONS)
    - /middlewares - 
    - /auth
    - /users  - /users/me - редактирование профиля (PATCH, OPTIONS)
              - /users/me/avatar - редактирование аватора (PATCH, OPTIONS)
    - /cards  - создание (OPTIONS,POST,GET)
              - /cards/like/ - постановка лайков (PUT, OpTIONS)
              - /cards/like/ - снятие лайков (DELETE, OpTIONS)
2.Frontend
2.1 Public
2.1.1 index.html
2.1.2 manifest.json
2.2 src - код проекта фронта
2.2.1 blocks - папки со стилями
2.2.2 components - код интерфейсов фронта
    - AddPlacePopup.js - popup добавления места
    - App.js - код главной страницы 
        -- api.js (GET /cards;)
        -- api.js (GET /users/me)
        -- auth.js (GET users.me)
        -- api.js (PATCH /usrs/me) - обновление профиля
        -- api.js (PATCH /users/me/avatar) - обновление аватора
        -- api.js (PUT /cards/like/${cardID}) - постановка лайка
        -- api.js (DELETE /cards/${cardID}) - удаление карточки
        -- api.js (POST /cards) - добавление карточки
        -- auth.js (POST /signup) - авторизация
        -- auth.js (POST /signin) - регистрация 
    - Card.js - код отображения карточки
    - Register.js - окно регистрации
    - EditProfilePopup.js - редактирование профиля
    - EditAvatarPopup.js - окно редактирования картинки
    - Register.js - поля ввода учетных данных
    - Main.js, Footer.js, Header.js, ImagePopup.js, InfoTooltip.js, PopupWithForm.js, ProtectedRoute.js - главная страница
2.2.3 context
2.2.4 images
2.2.4 utils - интеграция с back-ом
2.2.5 vendor
2.2.6 index.css, index.js - точка входа в приложение
2.2.7 serviceWorker.js - вероятно, слушатель запросов
2.2.8 setupTests.js, index.spec.js - файлы для тестирования 
2.3 package.json - список зависимостей приложения


Разбиение на микрофронтенды, структура директорий
-------------------------------------------------
Обоснование: выделены микрофронтенды:
- auth (авторизация, регистрация)
- cards(CRUD картинок) 
- profile(просмотр/редактирование профиля и аватора). 
- host(фронтовая интеграция микрофронтендов)

Микрофронтенды интегрируются на базе module federation. Фреймворк выбран как наиболее простой в реализации (т к есть пример в материалах), а также не противорячащий цели задания - объединяет части сайта на базе единого технологического стека.

Структура директорий:
frontend/microfrontend
|--|auth
|----|src
|------|blocks
|--------|auth-form
|--------|login
|------|components
|--------|AuthTestControl.js
|--------|InfoTooltip.js
|--------|Login.js
|--------|Register.js
|------|images
|--------|error-icon.svg
|--------|success-icon.svg
|------|utils
|---------|auth.js
|--|cards
|----|src
|------|blocks
|--------|card
|--------|places
|--------|popup
|------|components
|--------|AddPlacePopup.js
|--------|Card.js
|--------|CardsTestControl.js
|--------|ImagePopup.js
|------|contexts
|--------|CurrentUserContext.js
|------|images
|--------|close.svg
|--------|delete-icon.svg
|--------|like-active.svg
|--------|like-inactive.svg
|------|utils
|---------|app.js
|--|host
|----|src
|------|blocks
|--------|footer
|--------|header
|--------|page
|--------|content
|------|components
|--------|App.js
|--------|Footer.js
|--------|Header.js
|--------|Main.js
|--------|ProtectedRoute.js
|------|contexts
|--------|CurrentUserContext.js
|------|images
|--------|logo.svg
|--|profile
|------|blocks
|--------|profile
|------|components
|--------|EditAvatarPopup.js
|--------|EditProfilePopup.js
|--------|PopupWithForm.js
|--------|ProfileTestControl.js
|------|contexts
|--------|CurrentUserContext.js
|------|images
|--------|add-icon.svg
|--------|close.svg
|--------|edit-icon.svg
|------|utils
|---------|app.js

Задание 2
===========
architecture-sprint-1\Task2\arch_template_task2.jpg





