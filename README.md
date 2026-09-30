# Генератор паролей

Веб-приложение на React + Vite: настройка длины и наборов символов, генерация через `crypto.getRandomValues`, индикатор надёжности и копирование в буфер обмена.

## Запуск

```bash
npm install
npm run dev
```

Откройте URL из вывода команды (обычно http://localhost:5173).

## Сборка

```bash
npm run build
npm run preview
```

Сборка для GitHub Pages (базовый путь `/password-generator/`):

```bash
npm run build:pages
```

## Публикация

Сайт деплоится через GitHub Actions при push в `main`.

- Репозиторий: [github.com/ars000/password-generator](https://github.com/ars000/password-generator)
- Сайт: [ars000.github.io/password-generator](https://ars000.github.io/password-generator/)

В настройках репозитория (**Settings → Pages → Build and deployment**) источник должен быть **GitHub Actions** (обычно включается после первого успешного workflow).

## Тесты

```bash
npm test
```

## Стек

- Vite 6
- React 19
- TypeScript
- Sass (SCSS)

Акцентный цвет интерфейса: `#FCA30C`.
