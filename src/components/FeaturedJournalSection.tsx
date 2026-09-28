import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { HORIZONTAL_FEATURE, type Article } from '../data/articles'

const img = (id: string, w = 900, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function FeaturedJournalSection({ navigate }: { navigate: (state: NavState) => void }) {
  const article: Article = HORIZONTAL_FEATURE

  return (
    <section className="py-12 border-b border-navy/10 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={() => navigate({ page: 'article', article })}
          className="group cursor-pointer bg-[#EEF4F8] rounded-xs border border-navy/20 overflow-hidden shadow-md text-navy"
        >
          <div className="grid lg:grid-cols-12 min-h-[360px] items-stretch">
            {/* LEFT: Large Image */}
            <div className="lg:col-span-6 overflow-hidden relative min-h-[260px] lg:min-h-full">
              <motion.img
                src={img(article.image, 1000, 700)}
                alt={article.title}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent lg:hidden" />
            </div>

            {/* RIGHT: Text Content */}
            <div className="lg:col-span-6 flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 text-[9px] tracking-[0.25em] font-bold text-light-blue bg-blue/30 uppercase rounded-xs border border-light-blue/20">
                  EDITORIAL ESSAY
                </span>
                <span className="text-xs text-navy/40">•</span>
                <span className="text-xs font-mono text-navy/50">{article.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-navy leading-tight mb-4 group-hover:text-light-blue transition-colors">
                {article.title}
              </h2>

              <p className="text-navy/70 leading-relaxed text-xs sm:text-sm font-sans mb-6 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-6 pt-4 border-t border-navy/15">
                <button className="flex items-center gap-2.5 text-xs tracking-[0.2em] font-bold text-light-blue uppercase group-hover:text-navy transition-colors">
                  <span>READ ESSAY</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-mono text-sm">
                    →
                  </span>
                </button>
                <span className="text-xs text-navy/40 font-mono">{article.date}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
