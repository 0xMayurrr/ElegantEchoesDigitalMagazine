import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import JournalPage from './pages/JournalPage'
import PodcastPage from './pages/PodcastPage'
import AboutPage from './pages/AboutPage'
import Article from './pages/Article'
import LoadingScreen from './components/LoadingScreen'
import MascotPet from './components/MascotPet'
import type { Article as ArticleType } from './data/articles'

export type Page = 'home' | 'journal' | 'podcast' | 'about' | 'article'

export interface NavState {
  page: Page
  article?: ArticleType
}

export default function App() {
  const [nav, setNav] = useState<NavState>({ page: 'home' })
  const [isLoading, setIsLoading] = useState(true)

  const navigate = (state: NavState) => {
    setNav(state)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-screen bg-[#EEF4F8] selection:bg-[#D6E4F0] selection:text-primary relative">
      {/* 1. Initial Cute Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Interactive Mascot Pet Companion (Header sit, bottom walk, corner peek) */}
      {!isLoading && <MascotPet />}

      {/* Main App Content */}
      <Header navigate={navigate} currentPage={nav.page} />

      <AnimatePresence mode="wait">
        {nav.page === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Home navigate={navigate} />
          </motion.div>
        )}

        {nav.page === 'journal' && (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <JournalPage navigate={navigate} />
          </motion.div>
        )}

        {nav.page === 'podcast' && (
          <motion.div
            key="podcast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <PodcastPage navigate={navigate} />
          </motion.div>
        )}

        {nav.page === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AboutPage navigate={navigate} />
          </motion.div>
        )}

        {nav.page === 'article' && (
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Article article={nav.article!} navigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
