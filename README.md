Почему выбран module federation?

- легкость подключения
- хорошая документация
- сборка происходит в режиме runtime
- легкость подключения  css, шкрифта или любого компонетнта через webpack "из коробки". Т.е. гибкость в том что можно поместть во отдельный микрофронтенд

Проект разделен на микрофронтенды:
- auth-microfrontend. Модуль авторизации и регистрации
- profile-microfrontend. Модуль для работы с профилем пользователя
- cards-microfrontend. Модуль для карточек.



Структура profile-microfrontend.

/profile-microfrontend
  /src
    /components
      EditAvatarPopup.js      // Компонент редактирования аватара
      EditProfilePopup.js     // Компонент редактирования профиля пользователя
      PopupWithForm.js
    /styles
      popup.css              // Стили для компонента аватара
      profile.css           // Стили для компонента профиля пользователя
    /utils
      api.js                // Утилиты для профиля
    index.js                // Точка входа микрофронтенда
  package.json          // Зависимости и скрипты микрофронтенда
  webpack.config.js

Структура auth-microfrontend.

/auth-microfrontend
  /src
    /components
      Login.js               // Компонент входа пользователя
      Register.js            // Компонент регистрации пользователя
    /styles
      login.css              // Стили для компонента входа
      register.css           // Стили для компонента регистрации
    /utils
      auth.js                // Утилиты для аутентификации
    index.js                 // Точка входа микрофронтенда
  package.json               // Зависимости и скрипты микрофронтенда
  webpack.config.js


Структура cards-microfrontend.

/cards-microfrontend
  /src
    /components
      AddPlacePopup.js         // Компонент для добавления места 
      Card.js                  // Компонент карточки и лайков 
     
    /styles
      cards.css              
      appPlace.css           
    /utils
      auth.js                // Утилиты для аутентификации
    index.js                 // Точка входа микрофронтенда
  package.json               // Зависимости и скрипты микрофронтенда
  webpack.config.js

  Запуск

  Запустить можно командами yarn start_host:live из папки frontend. Также запустить все три микрофронтенда из соответствующих папок командами  yarn start:live

  УРОВЕНЬ 3 НЕ СДЕЛАН!!!!!

Задание 2
https://app.diagrams.net/#G1c4svJdILC3jM_gKPOHBuBy-e1ZRd7f7y#%7B%22pageId%22%3A%22mwhRzsweAF-Pb1T0WD_E%22%7D

Если ссылка не открыватеся то в корне лежит файл arch_template_task2_complete.drawio