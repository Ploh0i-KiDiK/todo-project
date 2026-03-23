# Документация проекта: Доказательство компетенций (Internship Requirements)

В данном файле описано, как каждое требование стажировки реализовано в коде проекта To-Do List.

## Обязательные требования

### 1. Знает JavaScript
*   **Чистые функции**: Реализованы в директории `src/lib/logic/`.
    *   `taskFilters.js`: Фильтрация массива задач (Active, Completed, All).
    *   `taskStats.js`: Подсчет количества активных задач.
*   **Работа с данными**: Интенсивное использование методов массивов (`map`, `filter`, `reduce`), деструктуризации и spread-операторов во всем проекте.
*   **Синтаксис ES6+**: Модульная система, стрелочные функции, шаблонные строки.

### 2. Верстает по макетам (HTML и CSS)
*   **Pixel Perfect**: UI полностью соответствует предоставленному Figma-макету.
*   **CSS Modules**: Используются для изоляции стилей (например, `Sidebar.module.css`, `TasksPage.module.css`).
*   **Адаптивность и Стили**: Реализованы отступы, типографика (Inter/Roboto), тени и скругления 1 к 1 с макетом.
*   **Темы**: Полноценная поддержка **Light** и **Dark** тем через CSS-переменные в `index.css` и атрибут `data-theme`.

### 3. Простые приложения на React
*   **SPA Архитектура**: Использование `react-router-dom` для навигации между страницами (Tasks, Login, Register, Settings).
*   **Хуки**: 
    *   `useState` & `useEffect`: Управление состоянием и сайд-эффектами.
    *   `useContext`: Глобальный стейт пользователя (Аватар, Имя) через `UserProvider` в `src/hooks/useUser.jsx`.
    *   `useMemo`: Оптимизация фильтрации списка задач в `useTasks.js`.
*   **Компоненты**: Четкое разделение на «умные» (hooks/pages) и «глупые» (UI-библиотека в `src/components/ui/`).

### 4. DOM, события, localStorage, fetch
*   **События**: Обработка `onClick`, `onChange`, `onSubmit` (формы авторизации и настройки).
*   **localStorage**: 
    *   `src/lib/storage/themeStorage.js`: Сохранение выбранной темы.
    *   `src/lib/storage/tasksStorage.js`: Локальное хранилище задач.
    *   `src/hooks/useUser.jsx`: Сохранение профиля и Base64-аватара.
*   **fetch & Асинхронность**: 
    *   `src/lib/api/todosApi.js`: CRUD-запросы к JSONPlaceholder используя `async/await`.
    *   Обработка промисов и состояний `loading` / `error`.

---

## Бонусные требования

### 1. Тесты (Unit и Интеграционные)
*   **Unit-тесты** (Jest):
    *   `src/lib/logic/*.test.js`: Тесты на чистые функции.
    *   `src/lib/storage/*.test.js`: Тесты на работу с localStorage.
*   **Integration-тесты** (React Testing Library):
    *   `src/pages/TasksPage.test.jsx`: Тестирование пользовательского сценария (добавление, редактирование, удаление, смена темы, фильтрация).

### 2. REST API
*   Полный цикл к JSONPlaceholder:
    *   **GET**: Получение списка.
    *   **POST**: Создание (имитация).
    *   **PATCH**: Обновление статуса/текста.
    *   **DELETE**: Удаление.

### 3. Файловая структура
```text
src/
├── components/   # UI и Layout компоненты
├── hooks/        # Бизнес-логика в кастомных хуках (useTasks, useTheme, useUser)
├── lib/
│   ├── api/      # Работа с сетью
│   ├── logic/    # Чистые функции (JS)
│   └── storage/  # Работа с localStorage
└── pages/        # Страницы приложения (SPA)
```

**Проект готов к демонстрации навыков Junior Frontend Developer.**
