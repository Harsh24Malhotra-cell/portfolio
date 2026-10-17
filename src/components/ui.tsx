import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import { useInView } from '../lib/useInView'

export function Reveal({ className = '', style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className={`rv${inView ? ' in' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}

export function CountUp({ to, prefix = '' }: { to: number; prefix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const duration = prefersReducedMotion() ? 1 : 1600
    let raf = 0
    let start = 0
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('en-US')}
    </span>
  )
}

export function SectionHead({ index, title, accent, children }: { index: string; title: string; accent: string; children?: ReactNode }) {
  return (
    <div className="sh">
      <div>
        <span className="idx">{index}</span>
        <h2>
          {title}
          <br />
          <span className="it">{accent}</span>
        </h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="idx mono acid" style={{ fontSize: 12, letterSpacing: '.08em', display: 'block' }}>
      {children}
    </span>
  )
}
