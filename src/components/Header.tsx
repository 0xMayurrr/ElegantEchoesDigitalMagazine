import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState } from '../App'

interface HeaderProps {
  navigate: (state: NavState) => void
  currentPage: string
}

export default function Header({ navigate, currentPage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = () => {
    setMenuOpen(false)
    navigate({ page: 'home' })
  }

  const goToSection = (section: string) => {
    setMenuOpen(false)
    navigate({ page: 'home', section })
  }

  const navLinks = [
    { label: 'JOURNAL', section: 'journal' },
    { label: 'PODCAST', section: 'podcast' },
    { label: 'ABOUT', section: 'about' },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream border-b border-navy/10 shadow-sm' : 'bg-cream/90 backdrop-blur-sm'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <button
              onClick={goHome}
              className="font-serif text-navy tracking-[0.15em] text-base font-semibold hover:text-primary transition-colors duration-200 uppercase"
            >
              Elegant Echoes
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map(({ label, section }) => (
                <button
                  key={label}
                  onClick={() => goToSection(section)}
                  className="relative group text-xs tracking-[0.2em] font-medium text-navy/70 hover:text-navy transition-colors duration-200"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-navy/60 hover:text-navy transition-colors duration-200 p-1"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <motion.span
                  className="block w-5 h-px bg-navy"
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-px bg-navy"
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-px bg-navy"
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-navy/10 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search essays, episodes, reflections…"
                  className="w-full bg-transparent text-sm text-navy placeholder-navy/40 outline-none font-light tracking-wide"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-cream border-b border-navy/10 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {navLinks.map(({ label, section }) => (
                <button
                  key={label}
                  onClick={() => goToSection(section)}
                  className="text-left text-xs tracking-[0.25em] font-medium text-navy/70 hover:text-navy transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
