import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { JOURNAL_ARTICLES } from '../data/articles'

const img = (id: string, w = 700, h = 480) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function LatestGridSection({ navigate }: { navigate: (state: NavState) => void }) {
  const mainArticles = JOURNAL_ARTICLES.slice(0, 4)
  const sidebarArticles = JOURNAL_ARTICLES.slice(4)

  return (
    <section className="py-14 lg:py-20 border-b border-navy/10 bg-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-navy/15">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-semibold text-blue uppercase block mb-1">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-navy">
              Latest Stories & Essays
            </h2>
          </div>
          <button
            onClick={() => navigate({ page: 'journal' })}
            className="hidden sm:flex items-center gap-2 text-xs tracking-[0.2em] font-bold text-navy/70 hover:text-blue transition-colors uppercase font-mono"
          >
            <span>VIEW ALL JOURNAL ({JOURNAL_ARTICLES.length})</span>
            <span>→</span>
          </button>
        </div>

        {/* Structured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT / MAIN: 2-Column Article Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] tracking-[0.25em] font-bold text-blue uppercase">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-navy/40 font-mono">{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-navy leading-snug group-hover:text-blue transition-colors mb-2.5">
                    {article.title}
                  </h3>
                  <p className="text-xs text-navy/65 leading-relaxed line-clamp-3 mb-4 font-sans">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-navy/10">
                  <span className="text-[10px] text-navy/40 font-mono">{article.date}</span>
                  <span className="text-xs text-navy/40 group-hover:text-blue group-hover:translate-x-1 transition-all duration-200 font-mono">
                    →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* RIGHT: Compact "LATEST" / "DISCUSSIONS" Sidebar */}
          <div className="lg:col-span-4 bg-[#EEF4F8] border border-navy/15 p-6 rounded-xs shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy/15">
              <span className="text-[10px] tracking-[0.25em] font-bold text-navy uppercase">
                FRESH REFLECTIONS
              </span>
              <span className="w-2 h-2 rounded-full bg-blue" />
            </div>

            <div className="flex flex-col divide-y divide-navy/10">
              {sidebarArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => navigate({ page: 'article', article })}
                  className="py-4 first:pt-0 last:pb-0 group cursor-pointer"
                >
                  <span className="text-[9px] tracking-[0.2em] font-bold text-blue uppercase block mb-1">
                    {article.category}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-navy leading-snug group-hover:text-blue transition-colors mb-1.5">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-navy/60 line-clamp-2 mb-2 font-sans">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-navy/40 font-mono">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Box */}
            <div className="mt-6 pt-5 border-t border-navy/15 bg-[#D6E4F0]/40 p-4 rounded-xs border border-blue/20">
              <span className="text-[9px] tracking-[0.2em] font-bold text-primary uppercase block mb-1">
                WEEKLY ESSAY DIGEST
              </span>
              <p className="text-xs text-navy/70 mb-3">
                Get new reflections and podcast releases delivered directly to your inbox every Sunday.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[#EEF4F8] border border-navy/20 px-2.5 py-1.5 text-xs text-navy outline-none focus:border-blue placeholder-navy/40 rounded-2xs"
                />
                <button
                  onClick={() => alert('Thank you for subscribing to Elegant Echoes!')}
                  className="bg-[#EEF4F8] hover:bg-blue text-navy text-[10px] font-bold tracking-widest uppercase px-3 py-2 rounded-2xs transition-colors whitespace-nowrap"
                >
                  JOIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
