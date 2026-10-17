import { Fragment, useEffect, useRef } from 'react'
import portrait from '../assets/aadi.jpg'
import { COUNTERS, MARQUEE, PROFILE } from '../data/profile'
import { prefersReducedMotion } from '../lib/motion'
import { buildTree, setupCanvas, spreadFromLeaves, type Point, type Tree } from '../lib/tree'
import { CountUp, Reveal, SectionHead } from './ui'

// A radial ternary tree with a glowing head walking its Euler tour.
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const reduce = prefersReducedMotion()
    let ctx: CanvasRenderingContext2D
    let w = 0
    let h = 0
    let tree: Tree
    let pos: Point[] = []
    let heat = new Float32Array(0)

    const layout = () => {
      ;({ ctx, w, h } = setupCanvas(canvas))
      tree = buildTree(3, 5)
      const narrow = w < 700
      // Centre the tree on the portrait so the photo sits in the middle of the circle.
      const anchor = canvas.parentElement?.querySelector('.portrait-anchor')?.getBoundingClientRect()
      const box = canvas.getBoundingClientRect()
      const cx = anchor ? anchor.left + anchor.width / 2 - box.left : w * 0.7
      const cy = anchor ? anchor.top + anchor.height / 2 - box.top : h * 0.38
      const r = (Math.min(w, h) * (narrow ? 0.55 : 0.62)) / tree.depth
      const angle = spreadFromLeaves(tree, (i, n) => (i / n) * Math.PI * 2)
      pos = tree.nodes.map((n, i) => ({ x: cx + Math.cos(angle[i]) * n.depth * r, y: cy + Math.sin(angle[i]) * n.depth * r }))
      heat = new Float32Array(tree.nodes.length)
    }
    layout()
    document.fonts?.ready.then(layout) // web fonts can shift the portrait on small screens

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(layout, 150)
    }
    let mx = -999
    let my = -999
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY + scrollY
    }
    addEventListener('resize', onResize)
    addEventListener('mousemove', onMove)

    let step = 0
    let frame = 0
    let raf = 0
    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (scrollY > h) return
      ctx.clearRect(0, 0, w, h)
      const { nodes, tour } = tree
      for (let i = 1; i < nodes.length; i++) {
        const a = pos[i]
        const b = pos[nodes[i].parent]
        const hot = heat[i] > 0.02
        ctx.strokeStyle = hot ? `rgba(198,255,61,${0.08 + heat[i] * 0.7})` : 'rgba(239,235,227,.07)'
        ctx.lineWidth = hot ? 1.2 : 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      for (let i = 0; i < nodes.length; i++) {
        const p = pos[i]
        const near = Math.max(0, 1 - Math.hypot(p.x - mx, p.y - my) / 140)
        ctx.fillStyle = heat[i] > 0.05 || near > 0 ? `rgba(198,255,61,${Math.min(1, 0.25 + heat[i] + near)})` : 'rgba(239,235,227,.22)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6 + heat[i] * 2.2 + near * 3, 0, 7)
        ctx.fill()
        heat[i] *= 0.992
      }
      const from = tour[step % tour.length]
      const to = tour[(step + 1) % tour.length]
      const k = frame / 8
      const hx = pos[from].x + (pos[to].x - pos[from].x) * k
      const hy = pos[from].y + (pos[to].y - pos[from].y) * k
      ctx.fillStyle = '#c6ff3d'
      ctx.shadowColor = '#c6ff3d'
      ctx.shadowBlur = 24
      ctx.beginPath()
      ctx.arc(hx, hy, 5, 0, 7)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.font = '10px JetBrains Mono, monospace'
      ctx.fillStyle = 'rgba(198,255,61,.85)'
      ctx.fillText(step % 2 ? 'q:B' : 'q:A', hx + 10, hy - 8)
      if (reduce) return
      if (++frame > 8) {
        frame = 0
        step++
        heat[to] = 1
        heat[nodes[from].parent === to ? from : to] = 1
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      removeEventListener('resize', onResize)
      removeEventListener('mousemove', onMove)
    }
  }, [])
  return <canvas id="heroCanvas" ref={ref} aria-hidden="true" />
}

function Split({ word, delay = 0 }: { word: string; delay?: number }) {
  return (
    <>
      {word.split('').map((c, i) => (
        <span className="ch" key={i} style={{ transitionDelay: `${(delay + i) * 0.045}s` }}>
          {c}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const [first, last] = PROFILE.name
  return (
    <header className="hero" id="top">
      <HeroCanvas />
      {/* The stage takes the space above the name, so the photo can never overlap it. */}
      <div className="hero-stage">
        <div className="portrait-anchor">
          <Reveal className="portrait">
            <img src={portrait} alt="Portrait of Aadi Chakraborty" data-hover />
            <div className="scan" />
            <div className="lbl">ID: AADI_C · 2027</div>
          </Reveal>
        </div>
      </div>
      <div className="wrap">
        <div className="hero-top">
          <p className="hero-tag">
            {PROFILE.tagline.map((t) => (
              <span key={t}>
                <b>&gt;</b> {t}
                <br />
              </span>
            ))}
            <br />
            IB Diploma · {PROFILE.school} · Intended major: {PROFILE.major}
          </p>
        </div>
        <h1 className="name" aria-label={`${first} ${last}`}>
          <span className="row">
            <Split word={first} />
            <span className="gap" />
            <Split word={last} delay={first.length + 1} />
          </span>
        </h1>
        <div className="hero-bottom">
          <span>[01] 1 of 84 · Wolfram Research</span>
          <span>[02] MeitY · Govt. of India</span>
          <span>[03] 2× CREST Gold</span>
          <span>↓ scroll</span>
        </div>
      </div>
    </header>
  )
}

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="t">
        {items.map((t, i) => (
          <Fragment key={i}>
            <span>{t}</span>
            <span>✳</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export function Counters() {
  return (
    <section className="wrap">
      <SectionHead index="[00] — BY THE NUMBERS" title="Signal," accent="not noise">
        A Year-12 record built across mathematics, computing, law, music and sport, at full intensity in each.
      </SectionHead>
      <div className="counters">
        {COUNTERS.map((c) => (
          <Reveal className="ct" key={c.label}>
            <b>
              <CountUp to={c.to} prefix={c.prefix} />
              {c.sup && <sup>{c.sup}</sup>}
            </b>
            <span>{c.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
