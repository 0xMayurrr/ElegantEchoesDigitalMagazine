import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState, Page } from '../App'
import { ALL_ARTICLES } from '../data/articles'

interface HeaderProps {
  navigate: (state: NavState) => void
  currentPage: Page
}

export default function Header({ navigate, currentPage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedToast, setCopiedToast] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const searchResults = searchQuery.trim()
    ? ALL_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : []

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedToast(true)
    setTimeout(() => setCopiedToast(false), 2500)
    setShareOpen(false)
  }

  const navItems: { label: string; page: Page }[] = [
    { label: 'JOURNAL', page: 'journal' },
    { label: 'PODCAST', page: 'podcast' },
    { label: 'ABOUT', page: 'about' },
  ]

  return (
    <>
      {/* Primary Sticky Header (Compact & Professional) */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#EEF4F8]/95 backdrop-blur-md border-b border-navy/15 shadow-2xs'
            : 'bg-[#EEF4F8]/90 backdrop-blur-sm border-b border-navy/10'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* LEFT: Wordmark */}
            <button
              onClick={() => {
                setMenuOpen(false)
                navigate({ page: 'home' })
              }}
              className="font-serif text-navy tracking-[0.18em] text-base font-bold hover:text-blue transition-colors duration-200 uppercase flex items-center gap-2"
            >
              <span>ELEGANT ECHOES</span>
            </button>

            {/* CENTER: Navigation Links to SEPARATE PAGES */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = currentPage === item.page
                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      setMenuOpen(false)
                      navigate({ page: item.page })
                    }}
                    className={`relative group text-xs tracking-[0.2em] font-semibold transition-colors duration-200 uppercase ${
                      isActive ? 'text-blue' : 'text-navy/70 hover:text-navy'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-blue transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                )
              })}
            </nav>

            {/* RIGHT: Search & Share */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen)
                  setShareOpen(false)
                }}
                className="flex items-center gap-1.5 text-xs tracking-[0.15em] font-semibold text-navy/70 hover:text-blue transition-colors duration-200 p-1 uppercase"
                aria-label="Search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span className="hidden sm:inline">SEARCH</span>
              </button>

              <button
                onClick={() => {
                  setShareOpen(!shareOpen)
                  setSearchOpen(false)
                }}
                className="flex items-center gap-1.5 text-xs tracking-[0.15em] font-semibold text-navy/70 hover:text-blue transition-colors duration-200 p-1 uppercase"
                aria-label="Share"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span className="hidden sm:inline">SHARE</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-1 ml-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="block w-5 h-0.5 bg-navy"
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-0.5 bg-navy"
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-0.5 bg-navy"
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-b border-navy/15 bg-[#EEF4F8]/98 shadow-sm overflow-hidden"
            >
              <div className="max-w-4xl mx-auto px-6 py-4">
                <div className="relative flex items-center border-b border-navy/20 pb-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-navy/40 mr-3"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stories, essays, podcasts, reflections..."
                    className="w-full bg-transparent text-sm text-navy placeholder-navy/40 outline-none font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-navy/40 hover:text-navy ml-2 uppercase font-mono"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Instant Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2.5 pb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-navy/40">
                      Search Results ({searchResults.length})
                    </span>
                    {searchResults.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => {
                          setSearchOpen(false)
                          setSearchQuery('')
                          navigate({ page: 'article', article: res })
                        }}
                        className="p-2.5 rounded-2xs hover:bg-[#D6E4F0]/60 cursor-pointer flex items-center justify-between border-b border-navy/10 transition-colors"
                      >
                        <div>
                          <span className="text-[9px] tracking-[0.2em] font-bold text-blue uppercase block">
                            {res.category}
                          </span>
                          <h4 className="font-serif text-sm font-semibold text-navy">
                            {res.title}
                          </h4>
                        </div>
                        <span className="text-xs text-navy/40 font-mono">{res.readTime}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Popover */}
        <AnimatePresence>
          {shareOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-6 top-16 w-64 bg-[#EEF4F8] border border-navy/20 shadow-lg rounded-xs p-4 z-50"
            >
              <div className="text-[10px] tracking-[0.25em] font-mono text-navy/50 uppercase mb-3 border-b border-navy/10 pb-2">
                Share Publication
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full text-left text-xs text-navy hover:text-blue py-1.5 px-2 hover:bg-[#D6E4F0]/60 rounded transition-colors flex items-center justify-between"
                >
                  <span>Copy Page Link</span>
                  <span className="text-[10px] font-mono text-navy/40">🔗</span>
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    window.location.href
                  )}&text=${encodeURIComponent('Discovering Elegant Echoes — A digital publication on solitude, stories, and reflection.')}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShareOpen(false)}
                  className="w-full text-left text-xs text-navy hover:text-blue py-1.5 px-2 hover:bg-[#D6E4F0]/60 rounded transition-colors flex items-center justify-between"
                >
                  <span>Share on Twitter / X</span>
                  <span className="text-[10px] font-mono text-navy/40">↗</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#EEF4F8] border-b border-navy/15 shadow-md md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setMenuOpen(false)
                    navigate({ page: item.page })
                  }}
                  className={`text-left text-xs tracking-[0.25em] font-bold uppercase transition-colors ${
                    currentPage === item.page ? 'text-blue' : 'text-navy hover:text-blue'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#EEF4F8] text-navy text-xs font-mono px-4 py-2.5 rounded shadow-lg flex items-center gap-2 border border-blue/40"
          >
            <span className="text-blue">✓</span> Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Height Spacer */}
      <div className="h-16" />
    </>
  )
}
