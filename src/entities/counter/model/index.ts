import { createEvent, createStore } from 'effector'

export const $count = createStore(0)

export const incremented = createEvent()
export const decremented = createEvent()
export const reset = createEvent()

$count
  .on(incremented, (count) => count + 1)
  .on(decremented, (count) => count - 1)
  .reset(reset)

export const $isEven = $count.map((count) => count % 2 === 0)

export const $label = $count.map((count) =>
  count === 0 ? 'ноль' : count > 0 ? 'положительное' : 'отрицательное',
)
