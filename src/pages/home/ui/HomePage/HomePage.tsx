import { SECTIONS } from '@/shared/config/sections'
import { Section } from '@/shared/ui/section'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">Effector + React</h1>
        <p className="home-page__subtitle">
          Интерактивное руководство по управлению состоянием. Архитектура{' '}
          <a
            href="https://feature-sliced.design"
            target="_blank"
            rel="noreferrer"
          >
            FSD
          </a>
          : логика в <code>entities/</code>, действия в{' '}
          <code>features/</code>, композиция в <code>widgets/</code>.
        </p>
        <nav className="home-page__nav">
          {SECTIONS.map(({ id, title }) => (
            <a key={id} className="home-page__nav-link" href={`#${id}`}>
              {title}
            </a>
          ))}
        </nav>
      </header>

      <main className="home-page__main">
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

      <footer className="home-page__footer">
        <a href="https://effector.dev" target="_blank" rel="noreferrer">
          Документация Effector
        </a>
      </footer>
    </div>
  )
}
