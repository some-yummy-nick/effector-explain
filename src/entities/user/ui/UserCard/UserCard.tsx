import type { User } from '../../model'
import './UserCard.css'

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <p className="user-card__name">{user.name}</p>
      <p className="user-card__email">{user.email}</p>
    </div>
  )
}
