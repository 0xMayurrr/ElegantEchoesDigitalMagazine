import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { TRENDING_ARTICLES } from '../data/articles'

const img = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function TrendingSection({ navigate }: { navigate: (state: NavState) => void }) {
  return (
    <section className="py-10 border-b border-navy/10 bg-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] tracking-[0.25em] font-semibold text-navy/70 uppercase">
            TRENDING —
          </span>
          <div className="h-[1px] flex-1 bg-[#EEF4F8]/15" />
        </div>

        {/* 3 Horizontal Compact Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRENDING_ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate({ page: 'article', article })}
              className="group cursor-pointer flex flex-col justify-between p-4 rounded-xs border border-navy/15 bg-[#EEF4F8] hover:bg-[#D6E4F0]/40 hover:border-blue/40 transition-all duration-300 shadow-2xs"
            >
              <div>
                <div className="overflow-hidden bg-[#EEF4F8]/5 aspect-[16/9] mb-3.5 rounded-2xs border border-navy/10">
                  <motion.img
                    src={img(article.image, 600, 350)}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] tracking-[0.2em] font-bold text-blue uppercase">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-navy/30">•</span>
                  <span className="text-[10px] font-mono text-navy/40">{article.readTime}</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-navy leading-snug group-hover:text-blue transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-navy/10">
                <span className="text-[10px] text-navy/40 font-mono">{article.date}</span>
                <span className="text-xs text-navy/40 group-hover:text-blue group-hover:translate-x-1 transition-all duration-200 font-mono">
                  →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
