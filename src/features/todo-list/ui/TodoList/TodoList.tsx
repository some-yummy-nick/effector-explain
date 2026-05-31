import { useUnit } from 'effector-react'
import {
  $filteredTodos,
  $stats,
  todoRemoved,
  todoToggled,
  TodoItem,
} from '@/entities/todo'
import './TodoList.css'

export function TodoList() {
  const { todos, stats, toggleTodo, removeTodo } = useUnit({
    todos: $filteredTodos,
    stats: $stats,
    toggleTodo: todoToggled,
    removeTodo: todoRemoved,
  })

  return (
    <div className="todo-list">
      <ul className="todo-list__items">
        {todos.length === 0 ? (
          <li className="todo-list__empty">Список пуст</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          ))
        )}
      </ul>

      <p className="todo-list__stats">
        Всего: {stats.total} · Активных: {stats.active} · Готово: {stats.done}
      </p>
    </div>
  )
}
