import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id: string
  title: string
  description: string
  concepts: readonly string[]
  code: string
  children: ReactNode
}

export function Section({
  id,
  title,
  description,
  concepts,
  code,
  children,
}: SectionProps) {
  return (
    <section className="section" id={id}>
      <header className="section__header">
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
        <ul className="section__concepts">
          {concepts.map((concept) => (
            <li key={concept} className="section__concept">
              {concept}
            </li>
          ))}
        </ul>
      </header>

      <div className="section__content">
        <div className="section__demo">{children}</div>
        <pre className="section__code">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </section>
  )
}
