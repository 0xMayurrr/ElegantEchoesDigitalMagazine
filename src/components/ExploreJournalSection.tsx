import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState } from '../App'
import { ALL_ARTICLES } from '../data/articles'

const img = (id: string, w = 600, h = 450) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface ExploreJournalProps {
  navigate: (state: NavState) => void
}

export default function ExploreJournalSection({ navigate }: ExploreJournalProps) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [query, setQuery] = useState('')

  const categories = ['ALL', 'REFLECTIONS', 'PERSONAL', 'STORIES', 'POETRY', 'LIFE']

  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === 'ALL' ||
        article.category.toUpperCase() === activeCategory.toUpperCase() ||
        (activeCategory === 'REFLECTIONS' && article.category.toUpperCase() === 'REFLECTION')

      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q)

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <section id="explore" className="py-16 lg:py-24 border-b border-navy/10 bg-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-navy/15">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-semibold text-blue uppercase block mb-1">
              ARCHIVE & EXPLORATION
            </span>
            <h2 className="font-serif text-3xl font-semibold text-navy">Explore Journal</h2>
          </div>
          <button
            onClick={() => navigate({ page: 'journal' })}
            className="hidden sm:flex items-center gap-2 text-xs tracking-[0.2em] font-bold text-blue hover:text-primary transition-colors uppercase font-mono"
          >
            <span>FULL JOURNAL ARCHIVE</span>
            <span>→</span>
          </button>
        </div>

        {/* Filter Bar & Search Field */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-navy/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-[11px] tracking-[0.15em] font-bold uppercase rounded-xs border transition-all duration-200 ${
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in archive..."
              className="w-full bg-[#EEF4F8] border border-navy/20 pl-9 pr-8 py-1.5 text-xs text-navy placeholder-navy/40 rounded-xs outline-none focus:border-blue transition-colors font-sans"
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
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-navy/40 hover:text-navy font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Smooth Grid */}
        {filteredArticles.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => navigate({ page: 'article', article })}
                  className="group cursor-pointer flex flex-col justify-between p-4 bg-[#EEF4F8] border border-navy/15 hover:border-blue/40 rounded-xs hover:shadow-xs transition-all duration-300"
                >
                  <div>
                    <div className="overflow-hidden bg-[#EEF4F8]/5 aspect-[4/3] mb-4 rounded-2xs border border-navy/10">
                      <motion.img
                        src={img(article.image, 600, 450)}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] tracking-[0.2em] font-bold text-blue uppercase">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-navy/40 font-mono">{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-navy leading-snug group-hover:text-blue transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-navy/65 leading-relaxed line-clamp-2 mb-4 font-sans">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-navy/10 text-[10px] font-mono text-navy/40">
                    <span>{article.date}</span>
                    <span className="group-hover:text-blue group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-16 text-center border border-dashed border-navy/20 rounded-xs bg-[#EEF4F8]">
            <p className="font-serif text-lg text-navy/70 mb-2">No matching stories found</p>
            <p className="text-xs text-navy/40 font-sans">
              Try adjusting your category filter or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL')
                setQuery('')
              }}
              className="mt-4 px-4 py-1.5 bg-[#EEF4F8] text-navy text-xs font-mono font-bold tracking-widest uppercase rounded-2xs hover:bg-blue transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
