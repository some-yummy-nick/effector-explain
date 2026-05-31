import { useUnit } from 'effector-react'
import {
  $count,
  $isEven,
  $label,
  decremented,
  incremented,
  reset,
} from '../../model/counter'
import './CounterDemo.css'

export function CounterDemo() {
  const [count, isEven, label, onIncrement, onDecrement, onReset] = useUnit([
    $count,
    $isEven,
    $label,
    incremented,
    decremented,
    reset,
  ])

  return (
    <div className="counter-demo">
      <p className="counter-demo__value">Счётчик: {count}</p>
      <p className="counter-demo__meta">
        {isEven ? 'Чётное' : 'Нечётное'} · {label}
      </p>
      <div className="counter-demo__actions">
        <button
          type="button"
          className="counter-demo__button"
          onClick={onDecrement}
        >
          −
        </button>
        <button
          type="button"
          className="counter-demo__button counter-demo__button_primary"
          onClick={onIncrement}
        >
          +
        </button>
        <button
          type="button"
          className="counter-demo__button counter-demo__button_reset"
          onClick={onReset}
        >
          Сброс
        </button>
      </div>
    </div>
  )
}
