# Effector + React — обучающий проект

Интерактивное руководство по [Effector](https://effector.dev) с React и TypeScript.

## Запуск

```bash
npm install
npm run dev
```

## Структура

```
src/
├── model/          # Бизнес-логика (stores, events, effects)
│   ├── counter/    # Store, Event, .map()
│   ├── todo/       # combine, CRUD
│   └── user/       # createEffect, sample
├── widgets/        # UI-компоненты (демо)
└── shared/ui/      # Переиспользуемые UI-блоки
```

## Ключевые концепции

| Концепция | Описание |
|-----------|----------|
| **Store** (`$name`) | Реактивное хранилище состояния |
| **Event** | Сигнал о намерении изменить состояние |
| **Effect** | Асинхронная операция (API, таймеры) |
| **sample** | Декларативная связь между units |
| **combine** | Объединение нескольких stores |
| **useUnit** | Хук для подключения stores/events к React |

## Полезные ссылки

- [Документация Effector](https://effector.dev)
- [effector-react API](https://effector.dev/en/api/effector-react/)
