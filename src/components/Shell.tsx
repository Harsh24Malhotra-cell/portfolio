import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { SHELL, SHELL_SHORTCUTS } from '../data/shell'
import { Reveal, SectionHead } from './ui'

const PROMPT = '<span class="p">aadi@delhi:~$</span> '
const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

const greeting = () => `Last login: ${new Date().toDateString()} on ttys001\nWelcome. Type <span class="h">help</span> to begin.\n`

export function Shell() {
  const [lines, setLines] = useState<string[]>(() => [greeting()])
  const [input, setInput] = useState('')
  const history = useRef<string[]>([])
  const cursor = useRef(0)
  const out = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (out.current) out.current.scrollTop = out.current.scrollHeight
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    history.current.push(cmd)
    cursor.current = history.current.length
    if (cmd === 'clear') return setLines([])
    const reply = SHELL[cmd] ?? `<span class="e">command not found: ${escape(cmd)}</span>. Try <span class="h">help</span>.`
    setLines((l) => [...l, PROMPT + escape(cmd), reply])
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = history.current
    if (e.key === 'ArrowUp' && cursor.current > 0) {
      e.preventDefault()
      setInput(h[--cursor.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      cursor.current = Math.min(h.length, cursor.current + 1)
      setInput(h[cursor.current] ?? '')
    }
  }

  return (
    <section className="wrap" id="shell">
      <SectionHead index="[08] — INTERACTIVE" title="Query" accent="the candidate">
        A tiny shell. Type <span className="mono acid">help</span>, or tap a command below.
      </SectionHead>
      <Reveal className="term">
        <div className="term-bar">
          <i />
          <i />
          <i />
          <span>aadi@delhi: ~/portfolio: zsh</span>
        </div>
        <div className="term-out" ref={out} aria-live="polite" dangerouslySetInnerHTML={{ __html: lines.join('\n') + '\n' }} />
        <form className="term-in" onSubmit={submit}>
          <label htmlFor="tin">aadi@delhi:~$</label>
          <input
            id="tin"
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
          />
        </form>
      </Reveal>
      <div className="chips">
        {SHELL_SHORTCUTS.map((c) => (
          <button key={c} onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </section>
  )
}
