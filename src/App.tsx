import { Section } from './shared/ui/Section/Section'
import { CounterDemo } from './widgets/CounterDemo/CounterDemo'
import { TodoDemo } from './widgets/TodoDemo/TodoDemo'
import { UserDemo } from './widgets/UserDemo/UserDemo'
import './App.css'

const SECTIONS = [
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
      'combine объединяет несколько stores. Компонент подписан только на $filteredTodos — при смене фильтра или списка UI обновится автоматически. Бизнес-логика живёт отдельно от React.',
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
] as const

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Effector + React</h1>
        <p className="app__subtitle">
          Интерактивное руководство по управлению состоянием. Логика в{' '}
          <code>src/model/</code>, UI в <code>src/widgets/</code>.
        </p>
        <nav className="app__nav">
          {SECTIONS.map(({ id, title }) => (
            <a key={id} className="app__nav-link" href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
      </header>

      <main className="app__main">
        {SECTIONS.map(({ id, title, description, concepts, code, Demo }) => (
          <Section
            key={id}
            id={id}
            title={title}
            description={description}
            concepts={concepts}
            code={code}
          >
            <Demo />
          </Section>
        ))}
      </main>

      <footer className="app__footer">
        <a href="https://effector.dev" target="_blank" rel="noreferrer">
          Документация Effector
        </a>
      </footer>
    </div>
  )
}

export default App
