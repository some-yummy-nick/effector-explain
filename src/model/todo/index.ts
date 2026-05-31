import { combine, createEvent, createStore } from 'effector'

export type Todo = {
  id: string
  text: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

export const todoAdded = createEvent<string>()
export const todoToggled = createEvent<string>()
export const todoRemoved = createEvent<string>()
export const filterChanged = createEvent<Filter>()

export const $todos = createStore<Todo[]>([])
export const $filter = createStore<Filter>('all')

$todos
  .on(todoAdded, (todos, text) => [
    ...todos,
    { id: crypto.randomUUID(), text, done: false },
  ])
  .on(todoToggled, (todos, id) =>
    todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    ),
  )
  .on(todoRemoved, (todos, id) => todos.filter((todo) => todo.id !== id))

$filter.on(filterChanged, (_, filter) => filter)

/**
 * combine — объединяет несколько stores в один объект.
 * Удобно для производных вычислений из нескольких источников.
 */
export const $filteredTodos = combine($todos, $filter, (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.done)
    case 'done':
      return todos.filter((todo) => todo.done)
    default:
      return todos
  }
})

export const $stats = $todos.map( todos => ({
  total: todos.length,
  active: todos.filter((todo) => !todo.done).length,
  done: todos.filter((todo) => todo.done).length,
}))