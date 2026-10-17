// Research (horizontal scroll), impact cards and the activity log.
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ACTIVITIES, RESEARCH, VENTURES } from '../data/profile'
import type { Activity } from '../data/types'
import { prefersReducedMotion } from '../lib/motion'
import { Rich } from '../lib/Rich'
import { useInView } from '../lib/useInView'
import { Kicker, Reveal, SectionHead } from './ui'

const STACK_BELOW = 860 // px: research cards stack vertically below this width

export function Research() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLElement>(null)

  useEffect(() => {
    const sec = section.current!
    const tr = track.current!
    let dist = 0
    const onScroll = () => {
      if (innerWidth <= STACK_BELOW || dist <= 0) return
      const p = Math.min(1, Math.max(0, (scrollY - sec.offsetTop) / dist))
      tr.style.transform = `translate3d(${-p * dist}px,0,0)`
      if (bar.current) bar.current.style.width = `${p * 100}%`
    }
    const size = () => {
      if (innerWidth <= STACK_BELOW) {
        sec.style.height = ''
        tr.style.transform = ''
        return
      }
      dist = tr.scrollWidth - innerWidth
      sec.style.height = `${dist + innerHeight}px`
      onScroll()
    }
    size()
    document.fonts?.ready.then(size)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', size)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', size)
    }
  }, [])

  return (
    <section className="hs" id="research" ref={section}>
      <div className="hs-sticky">
        <div className="hs-track" ref={track}>
          <article className="rc intro">
            <Kicker>[02] — RESEARCH</Kicker>
            <h3 style={{ marginTop: 18 }}>
              Six
              <br />
              lines of
              <br />
              <span className="it" style={{ color: 'var(--acid)', textTransform: 'none' }}>
                inquiry
              </span>
            </h3>
            <p>Theoretical CS, machine learning, spatial modelling and cyber law: two CREST Golds, one published paper, three manuscripts under review. Scroll →</p>
          </article>
          {RESEARCH.map((r, i) => (
            <article className="rc" key={r.code}>
              <div className="n">
                <span>{r.code}</span>
                <b>{r.meta}</b>
              </div>
              <h3>{r.title}</h3>
              <div className="org">{r.org}</div>
              <ul>
                {r.bullets.map((b) => (
                  <li key={b}>
                    <Rich text={b} />
                  </li>
                ))}
              </ul>
              <div className="foot">
                {r.pills.map((p, j) => (
                  <span key={p} className={`pill${j === 0 ? ' on' : ''}`}>
                    {p}
                  </span>
                ))}
              </div>
              <div className="big">{String(i + 1).padStart(2, '0')}</div>
            </article>
          ))}
        </div>
        <div className="hs-prog">
          <i ref={bar} />
        </div>
      </div>
    </section>
  )
}

function tilt(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget
  const r = card.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  card.parentElement?.style.setProperty('--mx', `${x}px`)
  card.parentElement?.style.setProperty('--my', `${y}px`)
  if (!prefersReducedMotion()) {
    card.style.transform = `perspective(900px) rotateX(${(y / r.height - 0.5) * -4}deg) rotateY(${(x / r.width - 0.5) * 4}deg)`
  }
}

export function Impact() {
  return (
    <section className="wrap" id="impact">
      <SectionHead index="[03] — IMPACT" title="Code that" accent="ships">
        Products and programmes used outside the classroom: screening eyes, auditing privacy policies and teaching digital safety across India.
      </SectionHead>
      <div className="impact">
        {VENTURES.map((v) => (
          <Reveal key={v.name} className={`ic${v.wide ? ' w3' : ''}${v.featured ? ' feat' : ''}`}>
            <div className="ic-in" onMouseMove={tilt} onMouseLeave={(e) => (e.currentTarget.style.transform = '')}>
              <div className="k">{v.kicker}</div>
              <h4>{v.name}</h4>
              <div className="role">{v.role}</div>
              <p>{v.body}</p>
              <div className="num">
                <b>{v.stat}</b>
                <span>{v.statLabel}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const MAX_HOURS = 400
type Sort = 'priority' | 'hours' | 'type'

function ActivityRow({ a, index }: { a: Activity; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const [open, setOpen] = useState(false)
  return (
    <div ref={ref} className={`act rv${inView ? ' in' : ''}${open ? ' open' : ''}`}>
      <button className="act-h" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="i">{String(index + 1).padStart(2, '0')}</span>
        <span>
          <span className="ty">{a.type}</span>
          <span className="ttl">{a.org}</span>
        </span>
        <span className="pos">{a.position}</span>
        <span className="hbar">
          {a.totalHours} hrs
          <span className="tr">
            <span className="fl" style={{ width: inView ? `${(a.totalHours / MAX_HOURS) * 100}%` : 0 }} />
          </span>
        </span>
        <span className="pm">+</span>
      </button>
      <div className="act-b">
        <div>
          <div className="act-in">
            <span />
            <p>{a.description}</p>
            <div className="facts">
              <div>Grades<b>{a.grades}</b></div>
              <div>Timing<b>{a.timing}</b></div>
              <div>Hrs / week<b>{a.hoursPerWeek}</b></div>
              <div>Weeks / yr<b>{a.weeksPerYear}</b></div>
              <div>Total<b>{a.totalHours} hrs</b></div>
              <div>Continue in college<b>Yes</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ActivityLog() {
  const [sort, setSort] = useState<Sort>('priority')
  const rows = ACTIVITIES.map((a, index) => ({ a, index }))
  if (sort === 'hours') rows.sort((x, y) => y.a.totalHours - x.a.totalHours)
  if (sort === 'type') rows.sort((x, y) => x.a.type.localeCompare(y.a.type))
  const total = ACTIVITIES.reduce((s, a) => s + a.totalHours, 0)

  return (
    <section className="wrap" id="log">
      <SectionHead index="[04] — ACTIVITY LOG" title="The" accent="full ledger">
        All ten activities, with roles, grade levels and the hours behind them. Click any row to expand it.
      </SectionHead>
      <div className="log-ctrl">
        <div className="seg" role="group" aria-label="Sort activities">
          {(['priority', 'hours', 'type'] as const).map((s) => (
            <button key={s} className={sort === s ? 'on' : ''} onClick={() => setSort(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="total">
          Total hours logged<b>{total.toLocaleString('en-US')}</b>
        </div>
      </div>
      <div>
        {rows.map(({ a, index }) => (
          <ActivityRow key={a.org} a={a} index={index} />
        ))}
      </div>
    </section>
  )
}
