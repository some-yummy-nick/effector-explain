import { useUnit } from 'effector-react'
import { type FormEvent, useState } from 'react'
import { todoAdded } from '@/entities/todo'
import './TodoForm.css'

export function TodoForm() {
  const [text, setText] = useState('')
  const addTodo = useUnit(todoAdded)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (text.trim()) {
      addTodo(text.trim())
      setText('')
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-form__input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Новая задача..."
      />
      <button type="submit" className="todo-form__submit">
        Добавить
      </button>
    </form>
  )
}
