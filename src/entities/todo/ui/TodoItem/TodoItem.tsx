import type { Todo } from '../../model'
import './TodoItem.css'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <li className="todo-item">
      <label className="todo-item__label">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={
            todo.done ? 'todo-item__text todo-item__text_done' : 'todo-item__text'
          }
        >
          {todo.text}
        </span>
      </label>
      <button
        type="button"
        className="todo-item__remove"
        onClick={() => onRemove(todo.id)}
        aria-label="Удалить"
      >
        ×
      </button>
    </li>
  )
}
