# Проеткная работа спринт 1

Разбивка фронтенда на микрофронтенды

## Уровень 1. Проектирование

Для создания микрофронтендов я решил использовать Webpack Module Federation, который позволяет независимым приложениям использовать общий код во время выполнения. Фреймворк поддерживает функции lazy loading и shared dependencies. 

## Уровень 2. Планирование изменений

### Планируемая структура проекта

- `host` - Основное приложение
  - `users` - Микрофронтенд с функционало для логина, регистрации и редактирования пользователей
    - `src` - Исходный код проекта
      - `components` - Компоненты
        - ``
  - `places` - Микрофронтенд с функционалом для добавления, удаления редактирования и лайков карточек
- `src/` - Contains the main application code.
  - `main.py` - Entry point of the application.
  - `utils.py` - Helper functions for the application.
  - `config/settings.yaml` - Configuration settings for the project.
- `tests/` - Contains all test cases.
  - `test_main.py` - Tests for `main.py`.
  - `test_utils.py` - Tests for `utils.py`.
- `docs/` - Documentation files.
- `.gitignore` - Lists files ignored by Git.
- `requirements.txt` - Dependencies required to run the project.
- `README.md` - Project overview and instructions.

---




