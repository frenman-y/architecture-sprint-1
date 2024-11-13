Задание 1. Приложение mesto

Подход: Webpack Module Federation

Этот подход выбрал из-за более простого перехода, в сравнении с Single SPA. Меньше править CI/CD.
Нет необходимости в полной независимости микрофронтов.

Решил разделить фронт на микрофроты по следующим бизнес-сущностям:
- auth : авторизация и создание пользователя
- user_profile : работа с профилем пользователя (изменение аватара и описания)
- pictures : отображение картинок, добавление и их удаление, учет лайков.
- host : основной фронт, который взаимодействет со всеми мирофронтами.  

/frontend/microfrontend
    /host
        /src
            /components
                App.js                // компонент объединения микрофронтов 
                Footer.js             // компонент  
                Header.js             // компонент шапки страницы 
                PopupWithForm.js      // компонент информирования о авторизации
            /blocks
                auth-form             // стили окна авторизации
            /utils
                auth.js               // Утилиты для аутентификации
                serviceWorker.js      // Утилиты для регистрации 

    /auth
        /src
            /components
                Login.js              // компонент авторизации
                ProtectedRoute.js     // компонент проверки авторизации  
                Register.js           // компонент регистрации пользователя
                InfoTooltip.js        // компонент информирования о авторизации
            /blocks
                auth-form             // стили окна авторизации
            /utils
                auth.js               // Утилиты для аутентификации
                serviceWorker.js      // Утилиты для регистрации 

    /user_profile
        /src
            /components
                EditAvatarPopup.js    // компонент изменения аватара       
                EditProfilePopup.js   // компонент изменения профиля        
                PopupWithForm.js      // компонент всплывающего окна     
            /blocks
                popup                 // стили всплывающего окна
                profile               // стили окна профиля 
            /utils
                api.js                // Утилиты api для работы с backend профиля

    /cards
        /src
            /components
                Main.js               // компонент отображения списка картинок   
                Card.js               // компонент отображения картинки и лайков  
                AddPlacePopup.js      // компонент добавления картинки           
                ImagePopup.js         // компонент просмотра картинки        
                PopupWithForm.js      // компонент всплывающего окна              
            /blocks
                popup                 // стили всплывающего окна
                places                // стили отображения картинки  
            /utils
                api.js                // Утилиты api для работы с backend картинок


Задание 2. Ссылка на решение https://disk.yandex.ru/d/gzGutVPAebEUJA