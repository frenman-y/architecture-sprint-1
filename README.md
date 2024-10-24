# Задание 1

## Уровень 1. Проектирование
Для создания микрофронтендов был выбран "Webpack Module Federation". 
Являясь плагином для webpack, через Module Federation можно подключить любой модуль, сборку которого поддерживает webpack. Что подходит для текущего проекта.
В случае же с Single SPA, который является фреймворком, для его работы необходимо использовать importMaps, root-config, плагины для фреймворков и всю систему для Single SPA. Что избыточно и нецелесообразно в данной ситуации. Одним из плюсов Single SPA так же является возможность использовать в одном приложении несколько фреймворков. Данный проект реализован на React, необходимости использования прочих фреймворков нет.

## Уровень 2. Планирование изменений
В качестве стратегии проектирования была выбрана вертикальная нарезка, основанная на предметно-ориентированном проектировании, таким образом микрофронтенды будут выстроены вокруг бизнес-функций приложения,

При декомпозиции исходного приложения выделены такие микрофронтенды:

|||
|-|-|
|auth|микрофронтенд управления регистрацией и авторизацией пользователя|
|profile|микрофронтенд управления профилем пользователя|
|cards|микрофронтенд управления карточками|
|host|главный микрофронтенд, объединяет остальные микрофронтенды воедино|
```
/auth                        
  /src
    /blocks
      auth-form   
      login   
    /components
      InfoTooltip.js
      Login.js    
      ProtectedRoute.js
      Register.js      
    /images
      error-icon.svg
      success-icon.svg
    /utils
      auth.js               
    index.js                 
  package.json               
  webpack.config.js
```
```
/cards
  /src
    /blocks
      card
    /components
      Card.js             
      ImagePopup.js  
    /images 
      delete-icon.svg 
      like-active.svg 
      like-inactive.svg            
    /utils
      api.js              
    index.js                 
  package.json               
  webpack.config.js
```
```
/host
  /src
    /blocks
      content
      footer
      header
      page
      places
    /components
      App.js  
      Footer.js      
      Header.js        
      Main.js   
    /contexts
      CurrentUserContext.js  
    /images
      logo.svg                  
    index.js                 
  package.json               
  webpack.config.js
```
```
/profile
  /src
    /blocks
      popup
      profile
    /components
      AddPlacePopup.js
      EditAvatarPopup.js
      EditProfilePopup.js
      PopupWithForm.js     
    /images
      add-icon.svg
      avatar.jpg
      edit-icon.svg              
    index.js                 
  package.json               
  webpack.config.js
```

# Задание 2
https://drive.google.com/file/d/1Xiqz6-TGHSciFTfgl31BHFo_WEhUbqjq/view?usp=sharing
