# Effector + React — обучающий проект (FSD)

Интерактивное руководство по [Effector](https://effector.dev) с React, TypeScript и [Feature-Sliced Design](https://feature-sliced.design).

## Запуск

```bash
npm install
npm run dev
```

## Структура (FSD)

```
src/
├── app/                    # Инициализация приложения, глобальные стили
├── pages/home/             # Главная страница
├── widgets/                # Композитные блоки (демо-секции)
│   ├── counter-demo/
│   ├── todo-demo/
│   └── user-demo/
├── features/               # Пользовательские действия
│   ├── counter-controls/
│   ├── todo-form/
│   ├── todo-filter/
│   ├── todo-list/
│   └── user-loader/
├── entities/               # Бизнес-сущности + Effector-модели
│   ├── counter/model/
│   ├── todo/model/ + ui/TodoItem
│   └── user/model/ + ui/UserCard
└── shared/                 # Переиспользуемый код
    ├── ui/section/
    └── config/sections.ts
```

## Правила импортов FSD

Слой может импортировать только из слоёв **ниже**:

```
app → pages → widgets → features → entities → shared
```

## Effector в FSD

| Слой | Что хранит |
|------|------------|
| **entities** | stores, events, effects сущности |
| **features** | UI + `useUnit` для действий пользователя |
| **widgets** | композиция features |
| **pages** | композиция widgets |

## Полезные ссылки

- [Документация Effector](https://effector.dev)
- [Feature-Sliced Design](https://feature-sliced.design)
