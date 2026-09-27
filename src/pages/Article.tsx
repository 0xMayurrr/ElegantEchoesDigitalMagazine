import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState } from '../App'
import { JOURNAL_ARTICLES, FEATURED_ARTICLE, type Article } from '../data/articles'

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface Echo {
  id: string
  name: string
  message: string
  date: string
  liked: boolean
}

interface ArticlePageProps {
  article: Article
  navigate: (state: NavState) => void
}

export default function Article({ article, navigate }: ArticlePageProps) {
  const [readProgress, setReadProgress] = useState(0)
  const [echoes, setEchoes] = useState(128)
  const [hasEchoed, setHasEchoed] = useState(false)
  const [echoFloat, setEchoFloat] = useState(false)
  const [newEcho, setNewEcho] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [comments, setComments] = useState<Echo[]>([
    {
      id: '1',
      name: 'Maria S.',
      message:
        'This moved me deeply. I thought about the call I never made to my father last winter.',
      date: 'Sep 12, 2026',
      liked: false,
    },
    {
      id: '2',
      name: 'James T.',
      message:
        'The part about silence being active, not passive — that line stayed with me all day.',
      date: 'Sep 13, 2026',
      liked: false,
    },
    {
      id: '3',
      name: 'Nora R.',
      message:
        'I have been writing letters I will never send for three years. Didn\'t know it was a practice until now.',
      date: 'Sep 14, 2026',
      liked: false,
    },
  ])

  const related = [FEATURED_ARTICLE, ...JOURNAL_ARTICLES]
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setReadProgress(total ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleEcho = () => {
    if (!hasEchoed) {
      setEchoes((e) => e + 1)
      setHasEchoed(true)
      setEchoFloat(true)
      setTimeout(() => setEchoFloat(false), 800)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEcho.name.trim() || !newEcho.message.trim()) return
    const echo: Echo = {
      id: Date.now().toString(),
      name: newEcho.name,
      message: newEcho.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      liked: false,
    }
    setComments((c) => [echo, ...c])
    setNewEcho({ name: '', message: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const body = article.body ?? [article.excerpt]

  return (
    <main className="min-h-screen bg-cream">
      {/* Reading progress */}
      <div className="fixed top-16 left-0 right-0 z-40 h-px bg-navy/10">
        <motion.div
          className="h-full bg-blue origin-left"
          style={{ scaleX: readProgress / 100 }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Back nav */}
      <div className="pt-24 pb-0 max-w-7xl mx-auto px-6 lg:px-10">
        <button
          onClick={() => navigate({ page: 'home' })}
          className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-navy/40 hover:text-navy transition-colors duration-200 uppercase mb-10"
        >
          <span>←</span> Back
        </button>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 lg:px-10 mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.3em] font-medium text-blue uppercase block mb-6"
        >
          {article.category}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-navy leading-tight mb-6"
        >
          {article.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif italic text-navy/55 text-lg lg:text-xl leading-relaxed mb-8"
        >
          {article.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4 text-xs text-navy/40 tracking-wide border-t border-b border-navy/10 py-4"
        >
          <span>Elena Marín</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </motion.div>
      </header>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(8% 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0% 0)' }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-5xl mx-auto px-6 lg:px-10 mb-16"
      >
        <div className="aspect-[16/7] overflow-hidden bg-navy/10">
          <img
            src={img(article.image, 1400, 700)}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-6 lg:px-0 mb-20">
        {body.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i < 3 ? i * 0.1 : 0 }}
            className={`text-navy/80 leading-[1.9] mb-8 ${
              i === 0
                ? 'text-lg lg:text-xl font-light first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1 first-letter:text-navy'
                : 'text-base lg:text-[17px]'
            }`}
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Echo / reaction */}
        <div className="border-t border-navy/10 pt-10 mt-10 flex items-center gap-5">
          <div className="relative">
            <button
              onClick={handleEcho}
              className={`flex items-center gap-2 text-sm transition-all duration-200 ${
                hasEchoed ? 'text-blue' : 'text-navy/40 hover:text-navy/70'
              }`}
            >
              <motion.span
                animate={hasEchoed ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {hasEchoed ? '♥' : '♡'}
              </motion.span>
              <span className="text-xs tracking-[0.1em] uppercase font-medium">
                {echoes} Echoes
              </span>
            </button>
            <AnimatePresence>
              {echoFloat && (
                <motion.span
                  initial={{ opacity: 1, y: 0, x: '-50%' }}
                  animate={{ opacity: 0, y: -28 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute left-1/2 -top-1 text-blue text-xs font-medium pointer-events-none"
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button className="flex items-center gap-2 text-xs text-navy/40 hover:text-navy/70 transition-colors tracking-[0.1em] uppercase font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Share
          </button>
        </div>
      </article>

      {/* Related stories */}
      <section className="border-t border-navy/10 py-16 lg:py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.3em] font-medium text-navy/40 uppercase block mb-2">
              Continue reading
            </span>
            <h2 className="font-serif text-2xl font-semibold text-navy">Related Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {related.map((rel, i) => (
              <motion.article
                key={rel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => {
                  navigate({ page: 'article', article: rel })
                  window.scrollTo({ top: 0, behavior: 'instant' })
                }}
              >
                <div className="overflow-hidden bg-navy/5 mb-4 aspect-[4/3]">
                  <motion.img
                    src={img(rel.image, 600, 450)}
                    alt={rel.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.25em] font-medium text-blue uppercase">
                  {rel.category}
                </span>
                <h3 className="font-serif text-base font-semibold text-navy mt-1.5 mb-2 leading-snug group-hover:text-primary transition-colors">
                  {rel.title}
                </h3>
                <span className="text-[11px] text-navy/40">{rel.readTime}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Leave an Echo */}
      <section className="py-16 lg:py-20 border-t border-navy/10">
        <div className="max-w-2xl mx-auto px-6 lg:px-0">
          <div className="mb-10">
            <span className="text-[10px] tracking-[0.3em] font-medium text-navy/40 uppercase block mb-2">
              Join the conversation
            </span>
            <h2 className="font-serif text-2xl font-semibold text-navy">Leave an Echo</h2>
            <p className="text-sm text-navy/50 mt-2">
              No account needed. Your words are welcome here.
            </p>
          </div>

          {/* Comment form */}
          <form onSubmit={handleSubmit} className="mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[10px] tracking-[0.2em] text-navy/40 uppercase font-medium block mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={newEcho.name}
                  onChange={(e) => setNewEcho((n) => ({ ...n, name: e.target.value }))}
                  placeholder="Elena, James…"
                  className="w-full bg-transparent border-b border-navy/20 py-2 text-sm text-navy placeholder-navy/30 outline-none focus:border-blue transition-colors duration-200"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="text-[10px] tracking-[0.2em] text-navy/40 uppercase font-medium block mb-2">
                Your echo
              </label>
              <textarea
                rows={4}
                value={newEcho.message}
                onChange={(e) => setNewEcho((n) => ({ ...n, message: e.target.value }))}
                placeholder="What did this stir in you?"
                className="w-full bg-transparent border-b border-navy/20 py-2 text-sm text-navy placeholder-navy/30 outline-none focus:border-blue transition-colors duration-200 resize-none"
              />
            </div>
            <div className="flex items-center gap-5">
              <button
                type="submit"
                className="text-xs tracking-[0.2em] font-medium text-primary uppercase hover:text-blue transition-colors duration-200 flex items-center gap-2"
              >
                Send Echo →
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-blue"
                  >
                    Your echo was heard ♥
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Comments */}
          <div className="flex flex-col gap-8">
            {comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-t border-navy/10 pt-6"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-medium text-navy tracking-wide">
                    {comment.name}
                  </span>
                  <span className="text-[10px] text-navy/30">{comment.date}</span>
                </div>
                <p className="text-sm text-navy/65 leading-relaxed">{comment.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
