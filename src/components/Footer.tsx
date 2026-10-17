import { Fragment } from 'react'
import { PROFILE, SKILLS } from '../data/profile'
import { Kicker } from './ui'

function StackRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className={`stack${reverse ? ' rev' : ''}`}>
      <div className="t">
        {doubled.map((s, i) => (
          <Fragment key={i}>
            <span className={s.startsWith('~') ? 's' : undefined}>{s.replace(/^~/, '')}</span>
            <span>/</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <>
      <section style={{ paddingTop: 140 }} aria-label="Languages and tools">
        <StackRow items={SKILLS[0]} />
        <StackRow items={SKILLS[1]} reverse />
      </section>
      <footer id="contact">
        <div className="wrap">
          <Kicker>[09] — CONTACT</Kicker>
          <div className="huge" style={{ marginTop: 24 }}>
            Let's
            <br />
            <span className="it">build</span> it.
          </div>
          <a className="mail" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <div className="fmeta">
            <div>
              School<b>{PROFILE.school}</b>
            </div>
            <div>
              Programme<b>{PROFILE.programme}</b>
            </div>
            <div>
              Intended major<b>{PROFILE.major}</b>
            </div>
            <div>
              Citizenship<b>{PROFILE.citizenship}</b>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
