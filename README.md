# Aadi Chakraborty · Portfolio

Interactive portfolio for Aadi Chakraborty (IB Diploma, The British School, New Delhi, Class of 2027).

Vite + React 19 + TypeScript, plain CSS. Same setup as GeneMap.

## Commands
- `npm install`
- `npm run dev`: start the dev server
- `npm run build`: type-check and build to `dist/`
- `npm run lint`: run ESLint

## Layout
- `src/data/profile.ts`: all content (research, ventures, activity list, grades, honours, music and sport, skills). Edit text here.
- `src/data/shell.ts`: output for the interactive terminal.
- `src/components/`: one file per page area (`Hero`, `Theorem`, `Work`, `Record`, `Shell`, `Footer`, plus `Chrome` for boot screen, cursor and nav).
- `src/lib/tree.ts`: N-ary tree helpers behind the hero canvas and the theorem visualisation.
- `src/index.css`: design tokens and all styles.

Content comes from Aadi's CV and activity list. Where they disagreed, the CV was used.
