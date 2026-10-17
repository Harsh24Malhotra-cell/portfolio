// Every figure on the site comes from Aadi's CV and activity list.
// Where the two disagreed, the CV wins (seed funding, Wolfram acceptance rate, ABRSM grade, states).
import type { Activity, BeyondBlock, Counter, GradeColumn, Honour, ResearchCard, Venture } from './types'

export const PROFILE = {
  name: ['Aadi', 'Chakraborty'],
  email: 'aadi.chakraborty@gmail.com',
  school: 'The British School, New Delhi',
  programme: 'IB Diploma · June 2027',
  major: 'Computer Science',
  citizenship: 'British · resident in India',
  wolframUrl: 'https://community.wolfram.com/groups/-/m/t/3750050',
  tagline: [
    'theorem prover',
    'data scientist',
    'cybersecurity & policy researcher',
    'clarinettist, swimmer, captain',
  ],
}

export const BOOT_LINES: [text: string, highlight: string][] = [
  ['loading tape .................. ', 'ok'],
  ['states: ', '{A, B}'],
  ['symbols: ', 'N+1'],
  ['fetching record: ', 'aadi_chakraborty.json'],
  ['compiling 2,268 hours of work ..... ', 'ok'],
]

export const MARQUEE = [
  '1 of 84 · Wolfram', '2× CREST Gold', 'SAT 1560', '45/45 predicted', '10 A*', 'COBIS Award',
  'UKMT Gold', 'MeitY Intern', 'FOBISIA Hackathon 1st', 'Wharton Semi-finalist', 'Published · IJSSRR', 'ISSO Nationals',
]

export const COUNTERS: Counter[] = [
  { to: 1560, label: 'SAT · 800 Math / 760 EBRW' },
  { to: 45, sup: '/45', label: 'IB predicted grades' },
  { to: 10, sup: 'A*', label: 'IGCSE · only student in school' },
  { to: 84, prefix: '1/', label: 'Wolfram · selected worldwide' },
  { to: 7, sup: 'M+', label: 'Chicago crime data points modelled' },
  { to: 3000, sup: '+', label: 'AIris eye screenings' },
  { to: 2268, label: 'Hours logged across 10 activities' },
  { to: 120, label: 'Team swim medals as captain' },
]

export const RESEARCH: ResearchCard[] = [
  {
    code: 'R/01', meta: 'Wolfram · Boston · 2026',
    title: 'Generalised Turing machines on graphs',
    org: 'Wolfram High School Research Program → Emerging Leaders',
    bullets: [
      'Selected as **1 of 84 worldwide (~8%)** to research under Wolfram mentors and Stephen Wolfram.',
      'Generalised tape models to five graph families: 1D uni- and bidirectional, 2D grid, cyclic and binary tree.',
      'Proved the **N-ary tree traversal theorem**, then tightened the bound from 2N to N+1.',
      '**Emerging Leaders Program** (Aug 2026 – Jan 2027), and invited back as a **2027 TA**, one of ten.',
    ],
    pills: ['Staff Pick', 'Computability', 'Wolfram Lang.'],
  },
  {
    code: 'R/02', meta: 'MeitY · Apr 2026 →',
    title: 'Lip-reading smart glasses',
    org: 'Ministry of Electronics & IT, Government of India',
    bullets: [
      'Interns directly under **Dr Gaurav Gupta, Scientist-F** (Director, Cyber Security R&D), as his **only high-school intern**.',
      "Works on problems that existing methods can't solve, and what solving them would require.",
      'Building software for smart glasses that convert **lip movement to speech in real time**, scoping HCI problems in current accessibility tech for speech impairment.',
    ],
    pills: ['Govt. of India', 'HCI', 'Accessibility'],
  },
  {
    code: 'R/03', meta: 'UChicago · 2025',
    title: 'Predicting crime across Chicago',
    org: 'UChicago summer programme → CREST Gold',
    bullets: [
      'Three-week residential programme applying statistics and ML to civic problems in Python.',
      'Boosting and regression models on the Chicago Data Portal: **highest grade in class, 96% (A)**.',
      'Extended independently to **7M+ data points**, earning a **CREST Gold Award** (Nov 2025).',
    ],
    pills: ['CREST Gold', 'Spatiotemporal ML', 'Python'],
  },
  {
    code: 'R/04', meta: '2026 · Under review',
    title: 'Air quality from the built environment',
    org: 'Data Science & Design Thinking Club',
    bullets: [
      'A framework that quantifies proximity relationships in the built environment, improving AQI prediction for **under-monitored regions** beyond conventional estimators.',
      '**CREST Gold Award** (Jun 2026).',
      'Submitted to the **GeoResolution Conference** (US Department of Defense). Under review at the *Journal of High School Science*.',
    ],
    pills: ['CREST Gold', 'Geospatial', 'Environment'],
  },
  {
    code: 'R/05', meta: 'Ongoing · Under review',
    title: 'The limits of Shannon entropy',
    org: 'Password strength in an Indian sociolinguistic context',
    bullets: [
      'How length, character-set cardinality and search space shape brute-force resistance.',
      'A dataset engineered around Indian user behaviour: linguistic patterns, substitutions and culturally distinctive distributions.',
      "Ensemble model benchmarked against Dropbox's zxcvbn, **outperforming existing solutions by 25%**.",
      'Under review, *National High School Journal of Science*.',
    ],
    pills: ['+25%', 'Security', 'Ensembles'],
  },
  {
    code: 'R/06', meta: '2024–25 · Published',
    title: 'Cybersquatting across three jurisdictions',
    org: 'Trilegal internship · Dr Anubhav Bishen, NLSIU',
    bullets: [
      'Month-long Trilegal programme on the IT Act, CERT-In Directions and the **DPDP Act 2023**: policy briefs and four reports.',
      'Analysed **25 cases across India, the US and Canada**, covering bad faith, remedies and parody cybersquatting.',
      'Identified **5 gaps in Indian legal practice** and proposed reforms. Published in *IJSSRR*.',
    ],
    pills: ['Published', 'Cyber law', 'Policy'],
  },
]

export const VENTURES: Venture[] = [
  {
    kicker: 'Health-tech · 2025–26', name: 'AIris', role: 'Co-Founder & Technical Lead', wide: true, featured: true,
    body: 'A free AI eye-screening app built for low-bandwidth settings, using statistical and time-series analysis with the Gemini API. Partnered with NGOs including the VisionSpring Foundation, raised INR 35,000 in seed funding, and was an Inventure Changemakers finalist (top 25 of 200+). iOS and Android release in progress.',
    stat: '3,000+', statLabel: 'screenings · 600-student pilot',
  },
  {
    kicker: 'Digital rights · 2025 →', name: 'Project SafeNet', role: 'Founder & Director', wide: true,
    body: 'A national digital-privacy rights initiative running workshops on data protection with NGO and corporate partners, commended by MeitY. Won a COBIS Student Achievement Award for significant contribution to the wider community.',
    stat: '1/30', statLabel: 'COBIS award · globally',
  },
  {
    kicker: 'Chrome Web Store · 2025', name: 'Poliscope', role: 'Builder',
    body: 'A browser extension that scores privacy policies for readability and privacy-risk exposure, with breach alerts. Published and publicly available.',
    stat: '500', statLabel: 'installs · 1,500 analyses',
  },
  {
    kicker: 'NGO · Nov 2025 – Apr 2026', name: 'OneStage', role: 'Lead Software Dev Intern',
    body: 'Low-cost cybersecurity training modules and a web platform for a Delhi non-profit serving underserved youth.',
    stat: '40+', statLabel: 'offices · 17 states',
  },
  {
    kicker: 'Student Council · 2026', name: 'Annapoorna', role: 'Community Service Leader',
    body: "Runs the school's community service initiatives, including life-skills and financial-literacy support for underprivileged women.",
    stat: '20–30', statLabel: 'women every week',
  },
  {
    kicker: 'The British School · 2024 →', name: 'Data Science & Design Thinking Club', role: 'Founder & President', wide: true,
    body: "Mentored 10+ members through 20+ sessions on advanced ML and computational modelling. The club's air-quality study won CREST Gold, and its newsletter reaches more than a thousand readers.",
    stat: '1,000+', statLabel: 'newsletter audience',
  },
  {
    kicker: 'Competitions', name: 'Hackathons & Wharton', role: 'Team Leader', wide: true,
    body: 'Led a Wharton Global High School Data Science team, building an ensemble of heuristic neural networks, XGBoost and Poisson modelling, to the semi-finals (about 20 teams from 600+ entries). 1st place in Advanced Coding at the FOBISIA Hackathon, and 2nd at TISB two years running.',
    stat: 'Top 20', statLabel: 'of 600+ · Wharton',
  },
]

// Activity list, in the order submitted.
export const ACTIVITIES: Activity[] = [
  {
    type: 'Community Service', org: 'Project SafeNet: National Digital Privacy Rights Initiative', position: 'Founder & Director',
    description: 'Built PoliscopeAI, a browser extension giving breach and privacy-risk alerts (500 installs; 95% accuracy across 1,500 analyses). Runs national data-protection workshops with NGO and corporate partners; commended by MeitY and recognised with a COBIS Student Achievement Award.',
    grades: '9/10/11/12', hoursPerWeek: 4, weeksPerYear: 52, timing: 'All year', totalHours: 208,
  },
  {
    type: 'Research', org: 'Wolfram High School Research Program & Emerging Leaders Program', position: 'Researcher · Emerging Leaders Fellow · Invited TA ’27',
    description: '1 of 84 selected worldwide. Proved a novel N-ary tree traversal theorem for two-state Turing machines, later tightening the bound from 2N to N+1. Selected for a six-month research extension and a Wolfram Tech Conference presentation.',
    grades: '11/12', hoursPerWeek: 40, weeksPerYear: 8, timing: 'All year', totalHours: 320,
  },
  {
    type: 'Internship', org: 'Ministry of Electronics & IT, Government of India: under Dr Gaurav Gupta (Director, Cyber Security R&D)', position: 'Research Intern (sole high-school intern)',
    description: 'Building software for smart glasses that convert lip movement to speech in real time, and scoping HCI problems in current accessibility technology for people with speech impairments.',
    grades: '11/12', hoursPerWeek: 4, weeksPerYear: 30, timing: 'All year', totalHours: 120,
  },
  {
    type: 'Research', org: 'Trilegal Internship & independent research under Dr Anubhav Bishen, NLSIU', position: 'Cyberlaw Research (Cybersquatting)',
    description: 'Presented 4 reports on the Data Privacy Act and cybersquatting laws. Analysed 25 cases across India, the US and Canada, identified 5 gaps in Indian legal practice and proposed reforms. Published in IJSSRR.',
    grades: '10/11', hoursPerWeek: 10, weeksPerYear: 40, timing: 'All year', totalHours: 400,
  },
  {
    type: 'Internship', org: 'OneStage: Delhi non-profit offering cybersecurity training for underserved youth', position: 'Lead Software Development Intern',
    description: 'Created low-cost technical training modules and a web platform for 40+ grassroots NGO offices across 17 Indian states.',
    grades: '11/12', hoursPerWeek: 6, weeksPerYear: 20, timing: 'All year', totalHours: 120,
  },
  {
    type: 'Research', org: 'Limits of Shannon entropy for password-strength estimation in an Indian sociolinguistic context', position: 'Cybersecurity Researcher (NHSJS, under review)',
    description: 'Analysed how length, character set and search space affect brute-force resistance; built a novel ensemble ML model outperforming existing solutions by 25%.',
    grades: '11/12', hoursPerWeek: 10, weeksPerYear: 30, timing: 'All year', totalHours: 300,
  },
  {
    type: 'Club', org: 'Data Science & Design Thinking Club (10+ members), The British School', position: 'Founder & President',
    description: 'Modelled AQI from the built environment for under-monitored regions (BSA CREST Gold). Taught 20+ advanced ML sessions; published a newsletter reaching 1,000+ readers.',
    grades: '10/11/12', hoursPerWeek: 4, weeksPerYear: 40, timing: 'School year', totalHours: 160,
  },
  {
    type: 'Music', org: 'The British School Music Department: Symphony Orchestra, Senior Choir, Sonata Ensemble', position: '1st Chair Clarinet · Tenor · Ensemble Founder',
    description: 'Soloist in 20+ performances. Highest ABRSM Advanced Choral mark in India; one of 8 chosen from India for FOBISIA International.',
    grades: '9/10/11/12', hoursPerWeek: 4, weeksPerYear: 40, timing: 'School year', totalHours: 160,
  },
  {
    type: 'Athletics: Swimming', org: 'The British School Panthers Swim Team (30+ members)', position: 'Varsity Captain · Age Group Champion',
    description: '120 team medals. ISSO Nationals 5× medallist (3 silver, 2 bronze) among 400+ swimmers; qualified for SGFI National Championships; 20 ISACI medals (12 gold).',
    grades: '9/10/11/12', hoursPerWeek: 4, weeksPerYear: 40, timing: 'School year', totalHours: 160,
  },
  {
    type: 'Computer / Technology', org: 'AIris: free AI eye-screening for low-bandwidth settings (iOS/Android release in progress)', position: 'Co-Founder & Technical Lead',
    description: '3,000+ screenings; 600-student pilot with NGOs including VisionSpring. Raised INR 35,000 in seed funding; Inventure Changemakers finalist (top 25 of 200+).',
    grades: '10/11/12', hoursPerWeek: 8, weeksPerYear: 40, timing: 'All year', totalHours: 320,
  },
]

export const GRADES: GradeColumn[] = [
  {
    title: 'Grade 9', summary: 'Year 9', highlight: '6 A* · 3 A', top: ['A*'],
    rows: [['International Math', 'A*'], ['Computer Science', 'A*'], ['Economics', 'A*'], ['Physics', 'A*'], ['Chemistry', 'A*'], ['English First Lang.', 'A*'], ['English Literature', 'A'], ['History', 'A'], ['French', 'A']],
  },
  {
    title: 'Grade 10', summary: 'IGCSE', highlight: '10 A*', top: ['A*'],
    rows: [['Additional Math', 'A*'], ['International Math', 'A*'], ['Computer Science', 'A*'], ['Economics', 'A*'], ['Physics', 'A*'], ['Chemistry', 'A*'], ['English First Lang.', 'A*'], ['History', 'A*'], ['English Literature', 'A*'], ['French', 'A*']],
  },
  {
    title: 'Grade 11', summary: 'IB Year 1', highlight: '40 / 42', top: ['7', 'A'],
    rows: [['HL Physics', '7'], ['HL Mathematics AA', '7'], ['HL Computer Science', '7'], ['SL Eng. Lang & Lit', '6'], ['SL French B', '6'], ['SL Economics', '7'], ['Theory of Knowledge', 'A']],
  },
  {
    title: 'Grade 12', summary: 'Predicted', highlight: '45 / 45', top: ['7', '3'],
    rows: [['HL Physics', '7'], ['HL Mathematics AA', '7'], ['HL Computer Science', '7'], ['SL Eng. Lang & Lit', '7'], ['SL French B', '7'], ['SL Economics', '7'], ['CAS / TOK', '3']],
  },
]

export const AP_SCORES: [course: string, score: number][] = [
  ['Calculus BC', 5], ['Calculus AB', 5], ['Physics C E&M', 5], ['Statistics', 5], ['Env. Science', 4],
]

export const HONOURS: Honour[] = [
  { when: 'JUN 2026', title: 'CREST Gold Award', detail: 'British Science Association: air quality in the built environment' },
  { when: 'NOV 2025', title: 'CREST Gold Award', detail: 'British Science Association: spatiotemporal analysis of Chicago crime' },
  { when: '2026', title: 'COBIS Student Achievement Award', detail: 'Project SafeNet: one of 30 students globally' },
  { when: '2026', title: 'Wolfram Community Staff Pick', detail: 'Featured Contributor, N-ary tree traversal theorem' },
  { when: '2026', title: 'Wharton Data Science Semi-finalist', detail: 'Team Leader: ~20 teams from 600+ entries' },
  { when: '2025', title: 'UKMT Senior Mathematical Challenge Gold', detail: 'UK Mathematics Trust' },
  { when: '2024–26', title: 'Distinction · International Honour Roll', detail: 'Canadian Intermediate (2024) & Senior (2024, 2025) Math Contests; Cayley (2026)' },
  { when: '2025', title: '1st Place, FOBISIA Hackathon', detail: 'Advanced Coding, 200+ participants' },
  { when: '2024, 2025', title: '2nd Place, TISB Hackathon', detail: '~100 teams each year' },
  { when: '2025–26', title: 'Inventure Changemakers Finalist', detail: 'AIris: top 25 of 200+ national teams' },
  { when: 'Y10–Y12', title: "Director's Award for Academic Excellence", detail: 'The British School, three consecutive years' },
]

export const BEYOND: BeyondBlock[] = [
  {
    title: 'Music',
    stats: [['4', 'yrs first chair'], ['20+', 'solo performances'], ['1/8', 'India · FOBISIA']],
    items: [
      { title: 'Clarinet: First Chair, Symphony Orchestra', since: '2021 →', body: 'Four consecutive years as first chair; soloist in 20+ performances. ABRSM Grade 6 with Merit, preparing for Grade 8.' },
      { title: 'Senior Choir: Tenor', since: '2023 →', body: 'One of eight students from India selected for the FOBISIA International Music Festival. ABRSM Advanced Choral Examination: Merit, the highest mark in India.' },
      { title: 'Founder, Sonata Ensemble', since: '2026 →', body: 'A ten-member chamber group performing advanced repertoire.' },
    ],
  },
  {
    title: 'Sport',
    stats: [['120', 'team medals'], ['12', 'ISACI golds'], ['MVP', 'table tennis 24–26']],
    items: [
      { title: 'Swimming: Varsity Captain, Panthers Swim Team', since: '2017 →', body: 'Three years as captain of 30 swimmers. ISSO National Games for three years, 5× medallist (3 silver, 2 bronze) against 400+ swimmers. Qualified for SGFI Nationals. 20 ISACI medals, 12 of them gold. School record holder in the 200m freestyle; Age Group Champion 2023–26.' },
      { title: 'Table Tennis: Varsity Captain', since: '2017 →', body: 'Captain for four years; voted MVP 2024–26. District bronze medallist and Haryana State qualifier (2024).' },
    ],
  },
]

// Skills strip: entries starting with "~" render in the italic accent style.
export const SKILLS: string[][] = [
  ['Python', '~Julia', 'Mathematica', 'MATLAB', 'SQL', '~LaTeX', 'C++', 'x86 Assembly', '~C#', 'Bash', 'Kali Linux', '~Ubuntu'],
  ['TypeScript', '~JavaScript', 'React', 'Flutter', '~Dart', 'Kotlin', 'Swift', '~HTML5', 'CSS3', '~XGBoost', 'Gemini API', '~Wolfram Lang.'],
]
