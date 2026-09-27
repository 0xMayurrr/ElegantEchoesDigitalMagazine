import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import Article from './pages/Article'
import type { Article as ArticleType } from './data/articles'

export type Page = 'home' | 'article'

export interface NavState {
  page: Page
  article?: ArticleType
  section?: string
}

export default function App() {
  const [nav, setNav] = useState<NavState>({ page: 'home' })

  const navigate = (state: NavState) => {
    setNav(state)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header navigate={navigate} currentPage={nav.page} />
      <AnimatePresence mode="wait">
        {nav.page === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Home navigate={navigate} scrollTo={nav.section} />
          </motion.div>
        ) : (
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Article article={nav.article!} navigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
