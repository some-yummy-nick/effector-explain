import { useUnit } from 'effector-react'
import {
  $error,
  $user,
  fetchUserFx,
  userCleared,
  userIdChanged,
} from '../../model/user'
import './UserDemo.css'

export function UserDemo() {
  const { user, error, pending, loadUser, clearUser } = useUnit({
    user: $user,
    error: $error,
    pending: fetchUserFx.pending,
    loadUser: userIdChanged,
    clearUser: userCleared,
  })

  return (
    <div className="user-demo">
      <div className="user-demo__controls">
        {[1, 2, 3].map((id) => (
          <button
            key={id}
            type="button"
            className="user-demo__button"
            disabled={pending}
            onClick={() => loadUser(id)}
          >
            Загрузить #{id}
          </button>
        ))}
        <button
          type="button"
          className="user-demo__button user-demo__button_error"
          disabled={pending}
          onClick={() => loadUser(0)}
        >
          Ошибка
        </button>
        <button
          type="button"
          className="user-demo__button user-demo__button_clear"
          onClick={clearUser}
        >
          Очистить
        </button>
      </div>

      <div className="user-demo__result">
        {pending && <p className="user-demo__status">Загрузка...</p>}
        {error && !pending && (
          <p className="user-demo__error">Ошибка: {error}</p>
        )}
        {user && !pending && (
          <div className="user-demo__card">
            <p className="user-demo__name">{user.name}</p>
            <p className="user-demo__email">{user.email}</p>
          </div>
        )}
        {!user && !pending && !error && (
          <p className="user-demo__hint">Выберите пользователя для загрузки</p>
        )}
      </div>
    </div>
  )
}
