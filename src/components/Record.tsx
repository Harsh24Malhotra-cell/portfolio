// Academics, honours and life beyond the lab.
import { AP_SCORES, BEYOND, GRADES, HONOURS } from '../data/profile'
import { Reveal, SectionHead } from './ui'

export function Academics() {
  return (
    <section className="wrap" id="grades">
      <SectionHead index="[05] — ACADEMICS" title="Straight" accent="to the top">
        Top scorer in the Year 12 cohort in Mathematics AA, Computer Science, Economics, English and French. Director's Award for Academic
        Excellence in Years 10, 11 and 12.
      </SectionHead>
      <div className="gm">
        {GRADES.map((col) => (
          <Reveal className="gcol" key={col.title}>
            <h4>{col.title}</h4>
            <div className="sub">
              {col.summary} · <b>{col.highlight}</b>
            </div>
            {col.rows.map(([subject, grade]) => (
              <div className="cell" key={subject}>
                <span>{subject}</span>
                <span className={`g${col.top.includes(grade) ? ' top' : ''}`}>{grade}</span>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
      <div className="tests">
        <Reveal className="tbox">
          <div className="k">SAT · single attempt</div>
          <div className="sat">
            <div className="big">1560</div>
            <div className="parts">
              <span>MATH <b>800</b></span>
              <span>EBRW <b>760</b></span>
              <span>PSAT 10 <b>1500</b>/1520</span>
            </div>
          </div>
          <p className="note">
            IB Theory of Knowledge: <b>A</b>. CAS/TOK bonus predicted: <b>3</b>.
          </p>
        </Reveal>
        <Reveal className="tbox">
          <div className="k">Advanced Placement</div>
          <div className="aps">
            {AP_SCORES.map(([course, score]) => (
              <div key={course} className={`ap${score === 5 ? ' five' : ''}`}>
                <b>{score}</b>
                <span>{course}</span>
              </div>
            ))}
          </div>
          <p className="note">
            <b>IGCSE 2025:</b> the only student in the school to score A* in all ten subjects. Subject Awards in all ten in Year 10.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export function Honours() {
  return (
    <section className="wrap" id="honours">
      <SectionHead index="[06] — HONOURS" title="Wall of" accent="recognition" />
      <div className="hon">
        {HONOURS.map((h) => (
          <div className="hr" key={h.title + h.when}>
            <span className="y">{h.when}</span>
            <span className="t">{h.title}</span>
            <span className="d">{h.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Beyond() {
  return (
    <section className="wrap" id="beyond">
      <SectionHead index="[07] — BEYOND THE LAB" title="Breath" accent="control">
        Wind instruments and freestyle sprints both run on breath control.
      </SectionHead>
      <div className="bey">
        {BEYOND.map((b) => (
          <Reveal className="bc" key={b.title}>
            <h3>
              {b.title}
              <span className="it">.</span>
            </h3>
            <div className="bnums">
              {b.stats.map(([value, label]) => (
                <div key={label}>
                  <b>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            {b.items.map((item) => (
              <div className="bi" key={item.title}>
                <b>
                  {item.title} <em>{item.since}</em>
                </b>
                {item.body}
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
