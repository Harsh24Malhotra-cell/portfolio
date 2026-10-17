// Output for the interactive shell. Values are trusted HTML (static, authored here).
// Classes: .h highlight, .p accent, .e error.
import { PROFILE } from './profile'

const SUDO = 'Verifying record ......... ok\nChecking theorem ......... QED\nChecking impact .......... 3,000+ screenings\n<span class="p">✔ Recommendation: admit.</span>'

export const SHELL: Record<string, string> = {
  help: [
    'Available commands:',
    '  <span class="h">whoami</span>      who is this',
    '  <span class="h">theorem</span>     the Wolfram result',
    '  <span class="h">ls research</span> list research projects',
    '  <span class="h">scores</span>      SAT, AP, IB',
    '  <span class="h">awards</span>      honours, condensed',
    '  <span class="h">ventures</span>    things built for people',
    '  <span class="h">hobbies</span>     music and sport',
    '  <span class="h">contact</span>     get in touch',
    '  <span class="h">sudo admit</span>  ;)',
    '  <span class="h">clear</span>       clear the screen',
  ].join('\n'),
  whoami: 'Aadi Chakraborty\nIB Diploma, The British School, New Delhi · Class of 2027\nBritish citizen, resident in India · Intended major: Computer Science\nWorks across theoretical CS, ML/data science and cybersecurity policy.',
  theorem: 'THEOREM (Chakraborty, 2026)\n  Any N-ary tree can be traversed by a two-state Turing machine\n  using at most N+1 tape symbols.\n\n  v1 bound: 2N  →  v2 bound: N+1\n  Mentor: Lyman Hurd · Wolfram High School Research Program\n  Status: Wolfram Community Staff Pick · submitted to MIT URTC',
  'ls research': 'drwx  wolfram/          N-ary tree traversal theorem      [Staff Pick]\ndrwx  meity/            lip-to-speech smart glasses       [ongoing]\ndrwx  chicago-crime/    7M+ points, boosting models       [CREST Gold]\ndrwx  air-quality/      built-environment AQI model       [CREST Gold · under review]\ndrwx  password-entropy/ ensemble beats baselines by 25%   [under review]\ndrwx  cybersquatting/   India · US · Canada, 25 cases     [published, IJSSRR]',
  scores: 'SAT ........ 1560  (Math 800 · EBRW 760)\nPSAT 10 .... 1500 / 1520\nAP ......... Calc BC 5 · Calc AB 5 · Physics C E&amp;M 5 · Stats 5 · Env Sci 4\nIGCSE ...... 10 A* (only student in school)\nIB Y12 ..... 40/42 subject points · predicted 45/45',
  awards: "★ CREST Gold ×2 (British Science Association)\n★ COBIS Student Achievement Award: 1 of 30 globally\n★ UKMT Senior Mathematical Challenge: Gold\n★ Canadian Math Contests: Distinction &amp; Honour Roll\n★ Wharton Data Science: Global semi-finalist (~20 / 600+)\n★ FOBISIA Hackathon: 1st, Advanced Coding\n★ TISB Hackathon: 2nd (2024, 2025)\n★ Director's Award for Academic Excellence ×3",
  ventures: 'AIris ........... 3,000+ eye screenings, VisionSpring partner\nProject SafeNet . digital-rights workshops, COBIS award\nPoliscope ....... privacy-policy scoring extension, 500 installs\nOneStage ........ cybersecurity modules across 40+ offices, 17 states\nAnnapoorna ...... life skills for 20–30 women every week',
  hobbies: 'clarinet ....... first chair ×4 yrs, 20+ solos\nchoir .......... tenor, 1 of 8 from India at FOBISIA\nsonata ensemble  founder, 10 members\nswimming ....... captain, ISSO nationals, 12 ISACI golds, 200m free record\ntable tennis ... captain ×4, MVP 2024–26',
  contact: `email → <a href="mailto:${PROFILE.email}" class="p">${PROFILE.email}</a>\nwolfram → <a href="${PROFILE.wolframUrl}" target="_blank" rel="noopener" class="p">community.wolfram.com/…/3750050</a>`,
  'sudo admit': `[sudo] password for admissions: ********\n${SUDO}`,
}
SHELL.ls = SHELL['ls research']
SHELL['sudo hire'] = SHELL['sudo admit']

export const SHELL_SHORTCUTS = ['whoami', 'theorem', 'ls research', 'scores', 'awards', 'ventures', 'hobbies', 'sudo admit']
