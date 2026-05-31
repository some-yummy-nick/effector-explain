import { useUnit } from 'effector-react'
import { $filter, filterChanged, type Filter } from '@/entities/todo'
import './TodoFilter.css'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Готовые' },
]

export function TodoFilter() {
  const [filter, setFilter] = useUnit([$filter, filterChanged])

  return (
    <div className="todo-filter">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`todo-filter__button${filter === value ? ' todo-filter__button_active' : ''}`}
          onClick={() => setFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
