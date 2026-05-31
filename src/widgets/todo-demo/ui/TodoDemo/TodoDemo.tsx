import { TodoFilter } from '@/features/todo-filter'
import { TodoForm } from '@/features/todo-form'
import { TodoList } from '@/features/todo-list'
import './TodoDemo.css'

export function TodoDemo() {
  return (
    <div className="todo-demo">
      <TodoForm />
      <TodoFilter />
      <TodoList />
    </div>
  )
}
