// Portfolio data model.
// Rich strings support **bold** and *italic* (rendered by lib/Rich.tsx).

export interface Counter {
  to: number
  prefix?: string
  sup?: string
  label: string
}

export interface ResearchCard {
  code: string
  meta: string
  title: string
  org: string
  bullets: string[]
  pills: string[] // first pill is highlighted
}

export interface Venture {
  kicker: string
  name: string
  role: string
  body: string
  stat: string
  statLabel: string
  wide?: boolean
  featured?: boolean
}

export interface Activity {
  type: string
  org: string
  position: string
  description: string
  grades: string
  hoursPerWeek: number
  weeksPerYear: number
  timing: 'All year' | 'School year'
  totalHours: number
}

export interface GradeColumn {
  title: string
  summary: string
  highlight: string
  rows: [subject: string, grade: string][]
  top: string[] // grades rendered as top marks
}

export interface Honour {
  when: string
  title: string
  detail: string
}

export interface BeyondBlock {
  title: string
  stats: [value: string, label: string][]
  items: { title: string; since: string; body: string }[]
}
