import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState } from '../App'
import { ALL_ARTICLES, MOST_READ_ARTICLES, type Article } from '../data/articles'

const img = (id: string, w = 700, h = 500) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface JournalPageProps {
  navigate: (state: NavState) => void
}

export default function JournalPage({ navigate }: JournalPageProps) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['ALL', 'REFLECTIONS', 'PERSONAL', 'STORIES', 'POETRY', 'LIFE', 'VOICES']

  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const catMatch =
        activeCategory === 'ALL' ||
        article.category.toUpperCase() === activeCategory.toUpperCase() ||
        (activeCategory === 'REFLECTIONS' && article.category.toUpperCase() === 'REFLECTION')

      const q = searchQuery.trim().toLowerCase()
      const queryMatch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)

      return catMatch && queryMatch
    })
  }, [activeCategory, searchQuery])

  return (
    <main className="min-h-screen bg-[#EEF4F8] pb-24">
      {/* Top Banner Header */}
      <section className="pt-12 pb-14 bg-[#D6E4F0]/40 border-b border-navy/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <button
                onClick={() => navigate({ page: 'home' })}
                className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-mono text-navy/50 hover:text-blue uppercase mb-4"
              >
                <span>←</span> Back to Homepage
              </button>
              <span className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase block mb-1">
                PUBLICATION ARCHIVE
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-navy">
                THE JOURNAL
              </h1>
              <p className="text-sm sm:text-base font-serif italic text-navy/60 mt-2">
                "Curated essays, quiet reflections, and notes on memory, solitude & living."
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-navy/60 bg-[#EEF4F8] px-4 py-2.5 rounded-xs border border-navy/15">
              <span>Total Articles: {ALL_ARTICLES.length}</span>
              <span>•</span>
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        {/* Controls: Categories & Search */}
        <section className="mb-10 pb-6 border-b border-navy/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-[11px] tracking-[0.15em] font-bold uppercase rounded-xs border transition-all ${
                    isActive
                      ? 'bg-blue text-navy border-blue shadow-2xs'
                      : 'bg-[#EEF4F8] text-navy/70 border-navy/15 hover:border-navy/30 hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] md:min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search journal archive..."
              className="w-full bg-[#EEF4F8] border border-navy/20 pl-9 pr-8 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-sans"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-navy/40 hover:text-navy font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </section>

        {/* Content Layout: Articles Grid + Most Read Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Articles Area (8 columns) */}
          <div className="lg:col-span-8">
            {filteredArticles.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredArticles.map((article) => (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => navigate({ page: 'article', article })}
                      className="group cursor-pointer flex flex-col justify-between p-4 bg-[#EEF4F8] border border-navy/15 rounded-xs hover:border-blue/40 hover:shadow-xs transition-all duration-300"
                    >
                      <div>
                        <div className="overflow-hidden bg-[#EEF4F8]/5 aspect-[4/3] mb-4 rounded-2xs border border-navy/10">
                          <motion.img
                            src={img(article.image, 700, 525)}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] tracking-[0.25em] font-bold text-blue uppercase">
                            {article.category}
                          </span>
                          <span className="text-[10px] font-mono text-navy/40">{article.readTime}</span>
                        </div>

                        <h2 className="font-serif text-lg font-semibold text-navy leading-snug group-hover:text-blue transition-colors mb-2">
                          {article.title}
                        </h2>

                        <p className="text-xs text-navy/65 leading-relaxed line-clamp-3 mb-4 font-sans">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-navy/10 text-[10px] font-mono text-navy/40">
                        <span>{article.date}</span>
                        <span className="group-hover:text-blue group-hover:translate-x-1 transition-all duration-200">
                          READ STORY →
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="py-20 text-center border border-dashed border-navy/20 rounded-xs bg-[#EEF4F8]">
                <p className="font-serif text-lg text-navy/70 mb-2">No journal entries found</p>
                <p className="text-xs text-navy/40 font-sans mb-4">
                  No articles matched your filter or search query.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('ALL')
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-[#EEF4F8] text-navy text-xs font-mono font-bold uppercase tracking-widest rounded-2xs hover:bg-blue transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar: Most Read & Newsletter (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Most Read Box */}
            <div className="bg-[#EEF4F8] border border-navy/15 p-6 rounded-xs shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy/15">
                <span className="text-[10px] tracking-[0.25em] font-bold text-navy uppercase">
                  MOST READ ESSAYS
                </span>
                <span className="w-2 h-2 rounded-full bg-blue" />
              </div>

              <div className="flex flex-col divide-y divide-navy/10">
                {MOST_READ_ARTICLES.map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => navigate({ page: 'article', article: art })}
                    className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer flex gap-3 items-start"
                  >
                    <span className="font-serif font-bold text-blue text-base font-mono leading-none pt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <span className="text-[9px] font-mono text-blue font-bold uppercase block mb-0.5">
                        {art.category}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-navy leading-snug group-hover:text-blue transition-colors">
                        {art.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div className="bg-[#D6E4F0]/40 border border-blue/20 p-6 rounded-xs">
              <span className="text-[9px] tracking-[0.2em] font-bold text-primary uppercase block mb-1">
                WEEKLY ESSAY DIGEST
              </span>
              <h3 className="font-serif text-lg font-semibold text-navy mb-2">
                Delivered every Sunday
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed mb-4">
                Join over 4,000 readers who receive Elena's weekly reflections on solitude and creative living.
              </p>

              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-[#EEF4F8] border border-navy/20 px-3 py-2 text-xs text-navy outline-none focus:border-blue placeholder-navy/40 rounded-2xs"
                />
                <button
                  onClick={() => alert('Thank you for subscribing to Elegant Echoes!')}
                  className="bg-[#EEF4F8] hover:bg-blue text-navy text-xs font-mono font-bold tracking-widest uppercase py-2.5 rounded-2xs transition-colors"
                >
                  SUBSCRIBE NOW →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
