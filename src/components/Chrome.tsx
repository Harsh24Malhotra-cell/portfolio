// Page chrome: boot screen, custom cursor and fixed nav.
import { useEffect, useRef, useState } from 'react'
import { BOOT_LINES } from '../data/profile'
import { isTouch, prefersReducedMotion } from '../lib/motion'

export function Boot({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState(0)
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    const timers: number[] = []
    const finish = () => {
      if (done.current) return
      done.current = true
      setLeaving(true)
      onDone()
      timers.push(window.setTimeout(() => setGone(true), 1000))
    }
    if (prefersReducedMotion()) {
      timers.push(window.setTimeout(finish, 0))
      return () => timers.forEach(clearTimeout)
    }
    let p = 0
    const li = window.setInterval(() => setLines((n) => Math.min(BOOT_LINES.length, n + 1)), 260)
    const pi = window.setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 9))
      setPct(p)
      if (p >= 100) {
        clearInterval(pi)
        clearInterval(li)
        timers.push(window.setTimeout(finish, 250))
      }
    }, 45)
    const skip = () => {
      clearInterval(pi)
      clearInterval(li)
      finish()
    }
    window.addEventListener('pointerdown', skip, { once: true })
    return () => {
      clearInterval(li)
      clearInterval(pi)
      timers.forEach(clearTimeout)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  if (gone) return null
  return (
    <div id="boot" className={leaving ? 'done' : ''} aria-hidden="true">
      <div>
        {BOOT_LINES.slice(0, lines).map(([text, hl]) => (
          <div className="l" key={text}>
            {'> '}
            {text}
            <b>{hl}</b>
          </div>
        ))}
      </div>
      <div className="pct">{pct}</div>
    </div>
  )
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isTouch()) return
    let x = innerWidth / 2
    let y = innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0
    const hoverable = 'a,button,input,[data-hover],.act-h'
    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`
    }
    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(hoverable)) ring.current?.classList.add('big')
    }
    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(hoverable)) ring.current?.classList.remove('big')
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])
  return (
    <>
      <div className="cur" ref={dot} />
      <div className="cur-ring" ref={ring} />
    </>
  )
}

const delhiTime = () => {
  try {
    return new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
  } catch {
    return '--:--'
  }
}

const NAV_LINKS: [href: string, label: string][] = [
  ['#theorem', 'Theorem'],
  ['#research', 'Research'],
  ['#impact', 'Impact'],
  ['#log', 'Log'],
  ['#grades', 'Grades'],
  ['#shell', 'Shell'],
]

export function Nav() {
  const [time, setTime] = useState(delhiTime)
  useEffect(() => {
    const id = setInterval(() => setTime(delhiTime()), 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <nav>
      <div className="wrap">
        <a href="#top">A—C / 2027</a>
        <div className="links">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <span className="clock">New Delhi {time}</span>
      </div>
    </nav>
  )
}
