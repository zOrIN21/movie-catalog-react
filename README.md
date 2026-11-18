# Каталог фильмов на React

React-версия моего [каталога фильмов на TypeScript](https://github.com/zOrIN21/movie-catalog-ts). Переношу проект с ручной работы с DOM на компоненты и хуки.

## Что уже работает

- Поиск фильмов через [OMDb API](https://www.omdbapi.com/) с фильтрами по типу и году
- Состояния загрузки, ошибки с кнопкой «Повторить» и пустой выдачи
- Отмена устаревшего запроса через AbortController, если запустить новый поиск до ответа
- Адаптивная сетка карточек

## Стек

React, TypeScript, Vite

## Как запустить

1. `npm install`
2. Скопируйте `.env.example` в `.env.local` и вставьте свой ключ OMDb (получить бесплатно: https://www.omdbapi.com/apikey.aspx)
3. `npm run dev`

## Планы

- [ ] Страница фильма через React Router
- [ ] Избранное через Context с сохранением в localStorage
- [ ] Поиск при вводе с debounce
- [ ] Пагинация
- [ ] Деплой на GitHub Pages
