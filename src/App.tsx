import { useCallback, useEffect, useState } from 'react'
import { Boot, Cursor, Nav } from './components/Chrome'
import { Footer } from './components/Footer'
import { Counters, Hero, Marquee } from './components/Hero'
import { Academics, Beyond, Honours } from './components/Record'
import { Shell } from './components/Shell'
import { Theorem } from './components/Theorem'
import { ActivityLog, Impact, Research } from './components/Work'

export default function App() {
  const [ready, setReady] = useState(false)
  const onBooted = useCallback(() => setReady(true), [])

  // Body classes drive the scroll lock during boot and the hero letter reveal.
  useEffect(() => {
    document.body.classList.toggle('loading', !ready)
    document.body.classList.toggle('ready', ready)
  }, [ready])

  return (
    <>
      <Boot onDone={onBooted} />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Counters />
      <Theorem />
      <Research />
      <Impact />
      <ActivityLog />
      <Academics />
      <Honours />
      <Beyond />
      <Shell />
      <Footer />
    </>
  )
}
