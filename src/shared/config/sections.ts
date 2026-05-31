import type { ComponentType } from 'react'
import { CounterDemo } from '@/widgets/counter-demo'
import { TodoDemo } from '@/widgets/todo-demo'
import { UserDemo } from '@/widgets/user-demo'

export type SectionConfig = {
  id: string
  title: string
  description: string
  concepts: readonly string[]
  code: string
  Demo: ComponentType
}

export const SECTIONS: readonly SectionConfig[] = [
  {
    id: 'stores-events',
    title: '1. Store и Event',
    description:
      'Store ($count) хранит состояние. Event (incremented) — сигнал об изменении. Reducer в .on() описывает, как обновлять store. Производные stores через .map() пересчитываются автоматически.',
    concepts: ['createStore', 'createEvent', '.on()', '.map()', 'useUnit'],
    code: `
const $count = createStore(0)
const incremented = createEvent()

$count.on(incremented, (n) => n + 1)
const $isEven = $count.map((n) => n % 2 === 0)

// React: useUnit подписывает компонент на stores и events
const [count, onIncrement] = useUnit([$count, incremented])
    `,
    Demo: CounterDemo,
  },
  {
    id: 'combine',
    title: '2. Combine и производное состояние',
    description:
      'combine объединяет несколько stores. Компонент подписан только на $filteredTodos — при смене фильтра или списка UI обновится автоматически. Бизнес-логика живёт в entities, UI — в features и widgets.',
    concepts: ['combine', 'createStore', 'immutability'],
    code: `
const $filteredTodos = combine($todos, $filter, (todos, filter) => {
  if (filter === 'active') return todos.filter(t => !t.done)
  if (filter === 'done') return todos.filter(t => t.done)
  return todos
})

const { todos, setFilter } = useUnit({
  todos: $filteredTodos,
  setFilter: filterChanged,
})
    `,
    Demo: TodoDemo,
  },
  {
    id: 'effects',
    title: '3. Effect и sample',
    description:
      'Effect оборачивает асинхронную логику. У него есть .pending, .doneData, .failData. sample связывает событие с effect декларативно — без useEffect в компоненте.',
    concepts: ['createEffect', 'sample', '.pending', 'side effects'],
    code: `
const fetchUserFx = createEffect(async (id) => {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json()
})

sample({ clock: userIdChanged, target: fetchUserFx })

const { user, pending, loadUser } = useUnit({
  user: $user,
  pending: fetchUserFx.pending,
  loadUser: userIdChanged,
})
    `,
    Demo: UserDemo,
  },
]
