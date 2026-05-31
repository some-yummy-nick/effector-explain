import { useUnit } from 'effector-react'
import {
  $error,
  $user,
  fetchUserFx,
  userCleared,
  userIdChanged,
  UserCard,
} from '@/entities/user'
import './UserLoader.css'

export function UserLoader() {
  const { user, error, pending, loadUser, clearUser } = useUnit({
    user: $user,
    error: $error,
    pending: fetchUserFx.pending,
    loadUser: userIdChanged,
    clearUser: userCleared,
  })

  return (
    <div className="user-loader">
      <div className="user-loader__controls">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            type="button"
            className="user-loader__button"
            disabled={pending}
            onClick={() => loadUser(id)}
          >
            Загрузить #{id}
          </button>
        ))}
        <button
          type="button"
          className="user-loader__button user-loader__button_error"
          disabled={pending}
          onClick={() => loadUser(0)}
        >
          Ошибка
        </button>
        <button
          type="button"
          className="user-loader__button user-loader__button_clear"
          onClick={clearUser}
        >
          Очистить
        </button>
      </div>

      <div className="user-loader__result">
        {pending && <p className="user-loader__status">Загрузка...</p>}
        {error && !pending && (
          <p className="user-loader__error">Ошибка: {error}</p>
        )}
        {user && !pending && <UserCard user={user} />}
        {!user && !pending && !error && (
          <p className="user-loader__hint">Выберите пользователя для загрузки</p>
        )}
      </div>
    </div>
  )
}
