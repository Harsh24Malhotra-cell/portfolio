import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../data/profile'
import { prefersReducedMotion } from '../lib/motion'
import { buildTree, setupCanvas, spreadFromLeaves } from '../lib/tree'
import { Kicker, Reveal } from './ui'

const BAR_MAX = 16 // 2N at N = 8

// Illustrative depth-first walk of an N-ary tree; the bars compare the two symbol bounds.
function TheoremLab() {
  const [n, setN] = useState(3)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const reduce = prefersReducedMotion()
    let ctx: CanvasRenderingContext2D
    let w = 0
    let h = 0
    const tree = buildTree(n, n <= 3 ? 3 : 2)
    let pos: { x: number; y: number }[] = []
    const visited = new Uint8Array(tree.nodes.length)

    const layout = () => {
      ;({ ctx, w, h } = setupCanvas(canvas))
      const pad = 24
      const xs = spreadFromLeaves(tree, (i, count) => pad + (count === 1 ? 0.5 : i / (count - 1)) * (w - pad * 2))
      pos = tree.nodes.map((node, i) => ({ x: xs[i], y: 30 + node.depth * ((h - 60) / tree.depth) }))
    }
    layout()
    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(layout, 150)
    }
    addEventListener('resize', onResize)

    let step = 0
    let frame = 0
    let raf = 0
    const r = tree.nodes.length > 60 ? 3 : 5
    if (reduce) visited.fill(1)
    const draw = () => {
      raf = requestAnimationFrame(draw)
      const { nodes, tour } = tree
      ctx.clearRect(0, 0, w, h)
      for (let i = 1; i < nodes.length; i++) {
        const a = pos[i]
        const b = pos[nodes[i].parent]
        ctx.strokeStyle = visited[i] ? 'rgba(198,255,61,.65)' : 'rgba(239,235,227,.13)'
        ctx.lineWidth = visited[i] ? 1.5 : 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      for (let i = 0; i < nodes.length; i++) {
        ctx.fillStyle = visited[i] ? '#c6ff3d' : '#0b0b0c'
        ctx.strokeStyle = visited[i] ? '#c6ff3d' : 'rgba(239,235,227,.4)'
        ctx.beginPath()
        ctx.arc(pos[i].x, pos[i].y, r, 0, 7)
        ctx.fill()
        ctx.stroke()
      }
      const from = tour[step]
      const to = tour[Math.min(step + 1, tour.length - 1)]
      const k = frame / 10
      ctx.strokeStyle = '#ff5a1f'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(pos[from].x + (pos[to].x - pos[from].x) * k, pos[from].y + (pos[to].y - pos[from].y) * k, r + 5, 0, 7)
      ctx.stroke()
      if (reduce || ++frame <= 10) return
      frame = 0
      step++
      visited[to] = 1
      const kids = nodes[to].children
      const symbol = kids.length ? kids.filter((j) => visited[j]).length % (n + 1) : n
      if (stateRef.current) stateRef.current.textContent = `state ${step % 2 ? 'B' : 'A'} · symbol ${symbol}`
      if (step >= tour.length - 1) {
        step = 0
        visited.fill(0)
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      removeEventListener('resize', onResize)
    }
  }, [n])

  return (
    <Reveal className="lab">
      <div className="lab-top">
        <span>
          <span className="dotl" />
          Live traversal
        </span>
        <span ref={stateRef}>state A · symbol 0</span>
      </div>
      <canvas id="thmCanvas" ref={canvasRef} aria-label="Animated depth-first traversal of an N-ary tree" />
      <div className="lab-ctrl">
        <div className="slider">
          <span>
            N = <b className="acid">{n}</b>
          </span>
          <input type="range" min={2} max={8} value={n} onChange={(e) => setN(+e.target.value)} aria-label="Branching factor N" />
        </div>
        <div className="bars">
          <div className="bar">
            <span>Original · 2N</span>
            <div className="tr">
              <div className="fl" style={{ width: `${((2 * n) / BAR_MAX) * 100}%` }} />
            </div>
            <span className="v">{2 * n}</span>
          </div>
          <div className="bar new">
            <span>Improved · N+1</span>
            <div className="tr">
              <div className="fl" style={{ width: `${((n + 1) / BAR_MAX) * 100}%` }} />
            </div>
            <span className="v">{n + 1}</span>
          </div>
        </div>
        <div className="lab-note">// illustrative: a depth-first walk of an N-ary tree with tape-symbol bounds. Move the slider to change N.</div>
      </div>
    </Reveal>
  )
}

export function Theorem() {
  return (
    <section className="theorem" id="theorem">
      <div className="wrap">
        <div className="thm-grid">
          <Reveal>
            <Kicker>[01] — THE THEOREM</Kicker>
            <h3 style={{ marginTop: 18 }}>
              Two states. <em>Any</em> tree.
              <br />A new upper bound.
            </h3>
            <div className="stmt">Any N-ary tree can be traversed by a two-state Turing machine using at most N + 1 tape symbols.</div>
            <div className="thm-meta">
              <div>
                First proved with a bound of <b>2N symbols</b>, the first known upper bound for this class of generalised Turing machines. Later
                tightened to <b>N + 1</b> and submitted to MIT's Undergraduate Research Technology Conference.
              </div>
              <div>
                Built during the <b>Wolfram High School Research Program</b> (Boston, Jun–Jul 2026), supervised by <b>Lyman Hurd</b>, former MIT
                professor and Google software engineer.
              </div>
              <div>
                <b>Wolfram Community Staff Pick</b> · Featured Contributor ·{' '}
                <a href={PROFILE.wolframUrl} target="_blank" rel="noopener" className="acid">
                  read the post ↗
                </a>
              </div>
            </div>
          </Reveal>
          <TheoremLab />
        </div>
      </div>
    </section>
  )
}
