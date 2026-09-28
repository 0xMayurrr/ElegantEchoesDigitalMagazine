import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { FEATURED_ARTICLE, type Article } from '../data/articles'

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

export default function FeaturedStory({ navigate }: { navigate: (state: NavState) => void }) {
  const article: Article = FEATURED_ARTICLE

  return (
    <section className="py-10 lg:py-14 border-b border-navy/10 bg-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Section Header Divider */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-navy/15">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue" />
            <span className="text-[10px] tracking-[0.3em] font-semibold text-navy/60 uppercase">
              FEATURED STORY
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] font-mono text-navy/40 uppercase">
            ISSUE NO. 24 · {article.date}
          </span>
        </div>

        {/* 2-Column Composition */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Large featured image */}
          <div
            className="lg:col-span-7 group cursor-pointer overflow-hidden rounded-xs border border-navy/15 shadow-2xs bg-[#EEF4F8]/5"
            onClick={() => navigate({ page: 'article', article })}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <motion.img
                src={img(article.image, 1300, 850)}
                alt={article.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 text-[10px] tracking-[0.25em] font-bold text-primary bg-[#D6E4F0] uppercase rounded-xs border border-blue/20">
                {article.category}
              </span>
              <span className="text-xs text-navy/40">•</span>
              <span className="text-xs font-mono text-navy/50">{article.readTime}</span>
            </div>

            <h1
              onClick={() => navigate({ page: 'article', article })}
              className="font-serif text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-semibold text-navy leading-[1.18] mb-4 hover:text-blue transition-colors duration-200 cursor-pointer"
            >
              {article.title}
            </h1>

            <p className="text-navy/70 leading-relaxed text-sm sm:text-base font-sans mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between border-t border-navy/15 pt-5 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EEF4F8]/10 border border-navy/15">
                  <img
                    src="/rathu.png"
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-navy block leading-none">
                    Elena Marín
                  </span>
                  <span className="text-[10px] text-navy/40 font-mono">Editor & Writer</span>
                </div>
              </div>

              <button
                onClick={() => navigate({ page: 'article', article })}
                className="group flex items-center gap-2 text-xs tracking-[0.2em] font-bold text-blue hover:text-primary uppercase transition-colors"
              >
                <span>READ STORY</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-mono text-sm">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
