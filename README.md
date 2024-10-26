## Задание 1

### Background

Mesto выходит из стадии MVP, и у стейкхолдеров есть большие планы на развитие продукта. При анализе бизнес-требований стало очевидно, что одна команда не сможет эффективно разрабатывать и быстро деплоить приложение, и принято решение разделить его на микрофронденды, поддерживаемыми независимыми узко-специализированными командами.

### Проектирование

Следуя **вертикальной нарезке**, было решено выстроить микрофронтенды вокруг следующих бизнес-функций (пользовательских маршрутов):

 1. `auth` – страница входа (login) и регистрации, с дальнейшим намёком на отделение регистрации также в отдельное приложение. Это две тесно связанные функциональности, требующие работу с персональными и чувствительными данными пользователя.
 2. `new-place-form` – добавление нового места. Сейчас это простая форма, но в будущем там ожидается интеграция с картами (локацией), сторонними хранилищами фотографий, выбор фотографии из других соц. сетей и т.д.
 3. `places-feed` – лента фотографий, включая функциональность лайков и удаления фотографий. При этом последнее требуется накодить с намёком на возможное отделение в `places-management`. Сейчас в этом явной необходимости не наблюдается.
 4. `profile` – отображение и редактирование профиля. Также возможно разделение в будущем, так как заказчик хочет внедрить сторизы, отображение числа подписчиков и пр. Сейчас же команда должна сконценрироваться на непосредственно работе с данными профиля.

> Справка. Суть вертикальной нарезки в том, чтобы спроектировать каждый микрофронтенд как самодостаточную систему, которая соответствует отдельной бизнес-функции. 


### Выбор технологии
 
Как мы видим, фронтенд Mesto в целом отвечает разным бизнес-функциям, между которыми требуется обеспечить независимость разработки/деплоя, а также изоляцию друг от друга в рантайме.

Так, например, новая фича в профиле не должна требовать пересборки страницы регистрации. А нерабочая форма добавления места не должна влиять на отображения фида мест.

Также, не нужно сразу же подгружать все зависимости в будущем тяжёлой формы добавления места или редактирования профиля, статистика показала, что 99% времени пользователи смотрят ленту и только 1% времени менеджат профиль или добавляют новое фото.

Таким образом, build time технологии нам не подходят, останавливаемся на runtime.

Между Single SPA и Module Federation мы выбираем MF по следующим соображениям:
1) У разработчиков в команде есть опыт работы с последним.
2) Приложение планируется реализовать в едином стеке (React).
3) Приложение слабо зависит от роутинга и маршрутизации в браузере, практически всё происходит на "/".

### Структура проекта

Концептуально выглядит следующим образом:

```
microfrontend
├── auth
│   ├── package.json
│   ├── src
│   │   ├── components
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   └── styles
│   └── webpack.config.js
├── main
│   ├── package.json
│   ├── src
│   │   ├── components
│   │   │   ├── App.js
│   │   │   ├── Footer.js
│   │   │   └── Header.js
│   │   └── styles
│   └── webpack.main.js
├── new-place-form
│   └── src
│       ├── components
│       │   └── AddPlacePopup.js
│       └── styles
├── places-feed
│   ├── src
│   │   ├── components
│   │   │   ├── Card.js
│   │   │   ├── ImagePopup.js
│   │   │   └── PlacesFeed.js
│   │   └── styles
│   └── webpack.config.js
├── profile
│   └── src
│       ├── components
│       │   ├── EditAvatarPopup.js
│       │   └── EditProfilePopup.js
│       └── styles
├── shared
│   ├── components
│   │   ├── InfoTooltip.js
│   │   └── PopupWithForm.js
│   ├── styles
│   │   └── popup
│   │       └── popup.css
│   ├── utils
│   │   ├── api.js
│   │   └── auth.js
│   └── webpack.config.js
└── webpack.common.js

81 directories, 47 files
```

#### Module Federation

Пример `auth/webpack.config.js`:

```js
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const common = require('../webpack.common.js');

module.exports = {
  ...common,
  entry: './src/index.js',
  plugins: [
    ...common.plugins,
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login.js',
        './Register': './src/components/Register.js',
      },
      remotes: {
        shared: 'shared@http://localhost:3005/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
};
```

Пример `main/webpack.main.js`:

```js
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const common = require('../webpack.common.js');

module.exports = {
  ...common,
  entry: './src/index.js',
  plugins: [
    ...common.plugins,
    new ModuleFederationPlugin({
      name: 'main',
      remotes: {
        auth: 'auth@http://localhost:3001/remoteEntry.js',
        placesFeed: 'placesFeed@http://localhost:3002/remoteEntry.js',
        newPlaceForm: 'newPlaceForm@http://localhost:3003/remoteEntry.js',
        profile: 'profile@http://localhost:3004/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
};
```

Мы видим, что в конфигурации хоста описаны `remote` точки с входным кодом отдельных микрофронтендов. А также есть отдельный `shared` микрофронденд с общими библиотеками и `webpack.common.js` с общими настройками WebPack для проекта.

#### Запуск приложения

Чтобы запустить приложение, нужно сначала запустить микрофронтенды:

```bash
$ cd auth
$ npm run start # 3001 port
$ cd ..
// ...
$ cd shared
$ npm run start # 3005 port
```

И потом запустит **хост** приложение:

```bash
$ cd main
$ npm run start # 3000 port
```
