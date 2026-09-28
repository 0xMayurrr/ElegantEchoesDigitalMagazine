import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { MOST_READ_ARTICLES } from '../data/articles'

export default function MostReadSection({ navigate }: { navigate: (state: NavState) => void }) {
  return (
    <section className="py-14 border-b border-navy/10 bg-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-navy/15">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-blue uppercase">
              POPULAR ARCHIVE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
          </div>
          <span className="text-[10px] tracking-[0.2em] font-mono text-navy/40 uppercase">
            RANKED BY READERS
          </span>
        </div>

        <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-navy mb-8">
          Most Read Stories
        </h2>

        {/* Numbered List for Content Density */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {MOST_READ_ARTICLES.map((article, idx) => {
            const numStr = (idx + 1).toString().padStart(2, '0')
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => navigate({ page: 'article', article })}
                className="group cursor-pointer p-4 rounded-xs border border-navy/15 bg-[#EEF4F8] hover:bg-[#D6E4F0]/40 hover:border-blue/40 hover:shadow-2xs transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-navy/10 pb-2">
                    <span className="font-serif text-2xl font-bold text-blue font-mono">
                      {numStr}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] font-bold text-navy/60 uppercase">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-navy leading-snug group-hover:text-blue transition-colors mb-3 line-clamp-3">
                    {article.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-navy/10 flex items-center justify-between text-[10px] text-navy/40 font-mono">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
