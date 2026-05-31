import { useUnit } from 'effector-react'
import { type FormEvent, useState } from 'react'
import {
  $filteredTodos,
  $filter,
  $stats,
  filterChanged,
  todoAdded,
  todoRemoved,
  todoToggled,
  type Filter,
} from '../../model/todo'
import './TodoDemo.css'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Готовые' },
]

export function TodoDemo() {
  const [text, setText] = useState('')

  const { todos, filter, stats, addTodo, toggleTodo, removeTodo, setFilter } =
    useUnit({
      todos: $filteredTodos,
      filter: $filter,
      stats: $stats,
      addTodo: todoAdded,
      toggleTodo: todoToggled,
      removeTodo: todoRemoved,
      setFilter: filterChanged,
    })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (text.trim()) {
      addTodo(text.trim())
      setText('')
    }
  }

  return (
    <div className="todo-demo">
      <form className="todo-demo__form" onSubmit={handleSubmit}>
        <input
          className="todo-demo__input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Новая задача..."
        />
        <button type="submit" className="todo-demo__submit">
          Добавить
        </button>
      </form>

      <div className="todo-demo__filters">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`todo-demo__filter${filter === value ? ' todo-demo__filter_active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="todo-demo__list">
        {todos.length === 0 ? (
          <li className="todo-demo__empty">Список пуст</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="todo-demo__item">
              <label className="todo-demo__label">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={
                    todo.done ? 'todo-demo__text todo-demo__text_done' : 'todo-demo__text'
                  }
                >
                  {todo.text}
                </span>
              </label>
              <button
                type="button"
                className="todo-demo__remove"
                onClick={() => removeTodo(todo.id)}
                aria-label="Удалить"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      <p className="todo-demo__stats">
        Всего: {stats.total} · Активных: {stats.active} · Готово: {stats.done}
      </p>
    </div>
  )
}
