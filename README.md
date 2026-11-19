# Каталог фильмов на React

**Демо:** https://zorin21.github.io/movie-catalog-react/

React-версия моего [каталога фильмов на TypeScript](https://github.com/zOrIN21/movie-catalog-ts). Переношу проект с ручной работы с DOM на компоненты, хуки и роутинг.

## Что уже работает

- Поиск фильмов через [OMDb API](https://www.omdbapi.com/) с фильтрами по типу и году
- Страница фильма по адресу `/movie/:id` (React Router): сюжет, рейтинг, режиссёр, актёры
- Возврат к поиску без потери результатов и заполненной формы
- Состояния загрузки, ошибки с кнопкой «Повторить» и пустой выдачи
- Отмена устаревшего запроса через AbortController
- Заглушка, если постер не загрузился
- Адаптивная вёрстка
- Автодеплой на GitHub Pages через GitHub Actions

## Стек

React, TypeScript, React Router, Vite, GitHub Actions

## Как запустить

1. `npm install`
2. Скопируйте `.env.example` в `.env.local` и вставьте свой ключ OMDb (получить бесплатно: https://www.omdbapi.com/apikey.aspx)
3. `npm run dev` и откройте адрес из терминала

## Планы

- [x] Страница фильма через React Router
- [x] Деплой на GitHub Pages
- [ ] Избранное через Context с сохранением в localStorage
- [ ] Поиск при вводе с debounce
- [ ] Пагинация
