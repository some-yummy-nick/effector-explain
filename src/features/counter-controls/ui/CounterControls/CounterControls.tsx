import { useUnit } from 'effector-react'
import {
  $count,
  $isEven,
  $label,
  decremented,
  incremented,
  reset,
} from '@/entities/counter'
import './CounterControls.css'

export function CounterControls() {
  const [count, isEven, label, onIncrement, onDecrement, onReset] = useUnit([
    $count,
    $isEven,
    $label,
    incremented,
    decremented,
    reset,
  ])

  return (
    <div className="counter-controls">
      <p className="counter-controls__value">Счётчик: {count}</p>
      <p className="counter-controls__meta">
        {isEven ? 'Чётное' : 'Нечётное'} · {label}
      </p>
      <div className="counter-controls__actions">
        <button
          type="button"
          className="counter-controls__button"
          onClick={onDecrement}
        >
          −
        </button>
        <button
          type="button"
          className="counter-controls__button counter-controls__button_primary"
          onClick={onIncrement}
        >
          +
        </button>
        <button
          type="button"
          className="counter-controls__button counter-controls__button_reset"
          onClick={onReset}
        >
          Сброс
        </button>
      </div>
    </div>
  )
}
