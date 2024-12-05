# Ознакомление с кодом проекта

## Функциональность Mesto
- Загрузка фотографий.
- Удаление фотографий.
- Сбор и учет лайков под фото.
- Создание профиля и его редактирование.

## Структура проекта
- Посмотрите, как организованы директории и файлы в проекте.
- Обратите внимание на ключевые директории, такие как `src`, `components`, `styles`, `utils`.

## Компоненты и модули
- Найдите основные компоненты проекта и посмотрите, как они организованы.
- Обратите внимание на компоненты высшего уровня, такие как `App.js`, и посмотрите, как они взаимодействуют с дочерними компонентами.

## Маршрутизация
- Проверьте, как настроены маршруты в проекте.
- Посмотрите, какие страницы и компоненты связаны с определёнными маршрутами.

## Зависимости проекта
- Проверьте файл `package.json`, чтобы узнать, какие библиотеки (а также их версии) и пакеты используются в проекте.
- Обратите внимание на библиотеки, которые управляют состояниями.

## Утилиты и вспомогательные функции
- Найдите файлы с утилитами и вспомогательными функциями, например, `utils.js`.
- Посмотрите, как эти утилиты используются в компонентах и какие общие функции они выполняют.

## Стили и их организация
- Проверьте, как организованы стили в проекте.
- Обратите внимание на файлы стилей, которые могут быть связаны с конкретными компонентами.

# Структура проекта
```
/architecture
├── /src
│     ├── /blocks
│     │     ├── /auth-form
│     │     │     ├── /__button
│     │     │     │     └── auth-form__button.css
│     │     │     ├── /__form
│     │     │     │     └── auth-form__form.css
│     │     │     ├── /__input
│     │     │     │     └── auth-form__input.css
│     │     │     ├── /__link
│     │     │     │     └── auth-form__link.css
│     │     │     ├── /__text
│     │     │     │     └── auth-form__text.css
│     │     │     ├── /__textfield
│     │     │     │     └── auth-form__textfield.css
│     │     │     ├── /__title
│     │     │     │     └── auth-form__title.css
│     │     │     └── auth-form.css
│     │     ├── /card
│     │     │     ├── /__delete-button
│     │     │     │     ├── /_hidden
│     │     │     │     │     └── card__delete-button_hidden.css
│     │     │     │     ├── /_visible
│     │     │     │     │     └── card__delete-button_visible.css
│     │     │     │     └── card__delete-button.css
│     │     │     ├── /__description
│     │     │     │     └── card__description.css
│     │     │     ├── /__image
│     │     │     │     └── card__image.css
│     │     │     ├── /__like-button
│     │     │     │     └── /_is-active
│     │     │     │     │     └── card__like-button_is-active.css
│     │     │     │     └── card__like-button.css
│     │     │     ├── /__like-count
│     │     │     │     └── card__like-count.css
│     │     │     ├── /__title
│     │     │     │     └── card__title.css
│     │     │     └── card.css
│     │     ├── /content 
│     │     │     └── content .css
│     │     ├── /footer 
│     │     │     ├── /__copyright
│     │     │     │     └── footer__copyright.css
│     │     │     └── footer .css
│     │     ├── /header 
│     │     │     ├── /__auth-link
│     │     │     │     └── header__auth-link.css
│     │     │     ├── /__logo
│     │     │     │     └── header__logo.css
│     │     │     ├── /__logout
│     │     │     │     └── header__logout.css
│     │     │     ├── /__user
│     │     │     │     └── header__user.css
│     │     │     ├── /__wrapper
│     │     │     │     └── header__wrapper.css
│     │     │     └── header .css
│     │     ├── /login
│     │     │     └── login .css
│     │     ├── /page
│     │     │     ├── /__content
│     │     │     │     └── page__content.css
│     │     │     ├── /__section
│     │     │     │     └── page__section.css
│     │     │     └── page .css
│     │     ├── /places
│     │     │     ├── /__item
│     │     │     │     └── places__item.css
│     │     │     ├── /__list
│     │     │     │     └── places__list.css
│     │     │     └── places .css
│     │     ├── /popup
│     │     │     ├── /__button
│     │     │     │     ├── /_disabled
│     │     │     │     │     └── popup__button_disabled.css
│     │     │     │     └── popup__button.css
│     │     │     ├── /__caption
│     │     │     │     └── popup__caption.css
│     │     │     ├── /__close
│     │     │     │     └── popup__close.css
│     │     │     ├── /__content
│     │     │     │     ├── /_content
│     │     │     │     │     └── popup__content_content_image.css
│     │     │     │     └── popup__content.css
│     │     │     ├── /__error
│     │     │     │     ├── /_visible
│     │     │     │     │     └── popup__error_visible.css
│     │     │     │     └── popup__error.css
│     │     │     ├── /__form
│     │     │     │     └── popup__form.css
│     │     │     ├── /__icon
│     │     │     │     └── popup__icon.css
│     │     │     ├── /__image
│     │     │     │     └── popup__image.css
│     │     │     ├── /__input
│     │     │     │     ├── /_type
│     │     │     │     │     └── popup__input_type_error.css
│     │     │     │     └── popup__input.css
│     │     │     ├── /__label
│     │     │     │     └── popup__label.css
│     │     │     ├── /__status-message
│     │     │     │     └── popup__status-message.css
│     │     │     ├── /__title
│     │     │     │     └── popup__title.css
│     │     │     ├── /__is-opened
│     │     │     │     └── popup__is-opened.css
│     │     │     ├── /__type
│     │     │     │     ├── popup_type_edit-avatar.css
│     │     │     │     └── popup_type_remove-card.css
│     │     │     └── popup .css 
│     │     ├── /profile
│     │     │     ├── /__add-button
│     │     │     │     └── profile__add-button.css
│     │     │     ├── /__description
│     │     │     │     └── profile__description.css
│     │     │     ├── /__edit-button
│     │     │     │     └── profile__edit-button.css
│     │     │     ├── /__image
│     │     │     │     └── profile__image.css
│     │     │     ├── /__info
│     │     │     │     └── profile__info.css
│     │     │     ├── /__title
│     │     │     │     └── profile__title.css
│     │     │     └── profile .css     
│     ├── /components
│     │     ├── AddPlacePopup.js  
│     │     ├── App.js
│     │     ├── Card.js 
│     │     ├── EditAvatarPopup.js
│     │     ├── EditProfilePopup.js
│     │     ├── Footer.js
│     │     ├── Header.js
│     │     ├── ImagePopup.js
│     │     ├── InfoTooltip.js
│     │     ├── Login.js 
│     │     ├── Main.js
│     │     ├── PopupWithForm.js
│     │     ├── ProtectedRoute.js    
│     │     └── Register.js        
│     ├── /contexts
│     │     └── CurrentUserContext.js               
│     ├── /images
│     │     ├── add-icon.svg
│     │     ├── avatar.jpg
│     │     ├── card_1.jpg
│     │     ├── card_2.jpg
│     │     ├── card_3.jpg
│     │     ├── close.svg
│     │     ├── delete-icon.svg
│     │     ├── edit-icon.svg
│     │     ├── error-icon.svg
│     │     ├── like-active.svg
│     │     ├── like-inactive.svg
│     │     ├── logo.svg
│     │     └── success-icon.svg             
│     ├── /utils
│     │     ├── api.js
│     │     └── auth.js                  
│     ├── /vendor
│     │     ├── /fonts
│     │     │     ├── Inter-Black.woff2
│     │     │     └── Inter-Regular.woff2
│     │     ├── fonts.css     
│     │     └── normalize.css
│     ├── index.css
│     ├── index.js
│     ├── logo.svg
│     ├── serviceWorker.js
│     └── setupTests.js
├── index.spec.js                       
└── package.json                        

/profile-microfrontend
├── /src
│     ├── /components
│     │     ├── Profile.js             // Компонент профиля пользователя
│     │     └── EditProfile.js         // Компонент редактирования профиля
│     ├── /styles
│     │     ├── profile.css            // Стили для компонента профиля
│     │     └── edit-profile.css       // Стили для компонента редактирования профиля
│     ├── /utils
│     │     └── profile.js             // Утилиты для работы с профилем
│     └── index.js                     // Точка входа микрофронтенда
├── package.json                       // Зависимости и скрипты микрофронтенда
└── webpack.config.js                  // Конфигурация Webpack                

```

