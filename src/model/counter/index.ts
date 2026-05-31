import { createEvent, createStore } from 'effector'

/**
 * Store ($) — реактивное хранилище состояния.
 * Имя с $ — общепринятое соглашение в Effector.
 */
export const $count = createStore(0)

/**
 * Event — сигнал о намерении что-то изменить.
 * События не хранят данные, они только «запускают» обновления.
 */
export const incremented = createEvent()
export const decremented = createEvent()
export const reset = createEvent()

/**
 * .on(event, reducer) — связывает событие со store.
 * Reducer получает текущее состояние и возвращает новое (иммутабельно).
 */
$count
  .on(incremented, (count) => count + 1)
  .on(decremented, (count) => count - 1)
  .reset(reset)

/**
 * Производный store — вычисляется из другого store.
 * Обновляется автоматически при изменении $count.
 */
export const $isEven = $count.map((count) => count % 2 === 0)

export const $label = $count.map((count) =>
  count === 0 ? 'ноль' : count > 0 ? 'положительное' : 'отрицательное',
)
