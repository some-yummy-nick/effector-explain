import { createEffect, createEvent, createStore, sample } from 'effector'

export type User = {
  id: number
  name: string
  email: string
}

/**
 * Effect — для асинхронных операций (API, таймеры и т.д.).
 * Автоматически создаёт события: .done, .fail, .finally
 * и stores: .pending, .doneData, .failData
 */
export const fetchUserFx = createEffect<number, User>(async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (userId <= 0) {
    throw new Error('Некорректный ID пользователя')
  }

  return {
    id: userId,
    name: `Пользователь #${userId}`,
    email: `user${userId}@example.com`,
  }
})

export const userIdChanged = createEvent<number>()
export const userCleared = createEvent()

export const $user = createStore<User | null>(null)
export const $error = createStore<string | null>(null)

$user
  .on(fetchUserFx.doneData, (_, user) => user)
  .reset(userCleared)

$error
  .on(fetchUserFx.failData, (_, error) =>
    error instanceof Error ? error.message : String(error),
  )
  .reset([fetchUserFx, userCleared])

/**
 * sample связывает событие с effect:
 * при изменении ID — автоматически загружаем пользователя.
 */
sample({
  clock: userIdChanged,
  target: fetchUserFx,
})
