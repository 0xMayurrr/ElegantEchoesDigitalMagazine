import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState } from '../App'
import { JOURNAL_ARTICLES, FEATURED_ARTICLE, type Article as ArticleType } from '../data/articles'
import { useAuthorProfile } from '../lib/profile'

const img = (id: string, w = 1400, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

interface Echo {
  id: string
  name: string
  message: string
  date: string
}

interface ArticlePageProps {
  article: ArticleType
  navigate: (state: NavState) => void
}

export default function Article({ article, navigate }: ArticlePageProps) {
  const profile = useAuthorProfile()
  const [readProgress, setReadProgress] = useState(0)
  const [echoes, setEchoes] = useState(142)
  const [hasEchoed, setHasEchoed] = useState(false)
  const [echoFloat, setEchoFloat] = useState(false)
  const [newEcho, setNewEcho] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [shareToast, setShareToast] = useState(false)
  const [comments, setComments] = useState<Echo[]>([
    {
      id: '1',
      name: 'Maria S.',
      message:
        'This moved me deeply. I thought about the call I never made to my father last winter.',
      date: 'Sep 12, 2026',
    },
    {
      id: '2',
      name: 'James T.',
      message:
        'The part about silence being active, not passive — that line stayed with me all day.',
      date: 'Sep 13, 2026',
    },
    {
      id: '3',
      name: 'Nora R.',
      message:
        'I have been writing letters I will never send for three years. Didn\'t know it was a practice until now.',
      date: 'Sep 14, 2026',
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

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEcho.name.trim() || !newEcho.message.trim()) return
    const echo: Echo = {
      id: Date.now().toString(),
      name: newEcho.name,
      message: newEcho.message,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }
    setComments((c) => [echo, ...c])
    setNewEcho({ name: '', message: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  const body = article.body ?? [article.excerpt]

  return (
    <main className="min-h-screen bg-[#EEF4F8] pb-20">
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-[#EEF4F8]/10">
        <motion.div
          className="h-full bg-blue origin-left"
          style={{ scaleX: readProgress / 100 }}
          transition={{ ease: 'linear' }}
        />
      </div>

      {/* Back nav */}
      <div className="pt-10 pb-4 max-w-4xl mx-auto px-6 lg:px-10">
        <button
          onClick={() => navigate({ page: 'journal' })}
          className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-mono text-navy/50 hover:text-blue transition-colors uppercase"
        >
          <span>←</span> Back to Journal
        </button>
      </div>

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 lg:px-10 mb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase block mb-4"
        >
          {article.category}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-4"
        >
          {article.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif italic text-navy/70 text-lg lg:text-xl leading-relaxed mb-6"
        >
          {article.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between text-xs text-navy/50 tracking-wide font-mono border-t border-b border-navy/10 py-3"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-navy">{profile.name}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
          <button
            onClick={handleShare}
            className="hover:text-blue transition-colors flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold"
          >
            <span>Share</span>
            <span className="font-mono">↗</span>
          </button>
        </motion.div>
      </header>

      {/* Large Cover Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl mx-auto px-6 lg:px-10 mb-14"
      >
        <div className="aspect-[16/8] overflow-hidden bg-[#EEF4F8]/10 rounded-xs border border-navy/15 shadow-2xs">
          <img
            src={img(article.image, 1400, 700)}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Narrow Comfortable Reading Column */}
      <article className="max-w-2xl mx-auto px-6 lg:px-0 mb-16">
        {body.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i < 3 ? i * 0.08 : 0 }}
            className={`text-navy/85 leading-[1.9] mb-8 font-sans ${
              i === 0
                ? 'text-lg lg:text-xl font-light first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1 first-letter:text-navy'
                : 'text-base lg:text-[17px]'
            }`}
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Reaction & Echo Action */}
        <div className="border-t border-navy/15 pt-8 mt-12 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={handleEcho}
              className={`flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all px-4 py-2 rounded-xs border ${
                hasEchoed
                  ? 'bg-blue text-navy border-blue'
                  : 'bg-[#EEF4F8] text-navy/70 border-navy/20 hover:border-navy/40 hover:text-navy'
              }`}
            >
              <motion.span
                animate={hasEchoed ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {hasEchoed ? '♥' : '♡'}
              </motion.span>
              <span>{echoes} ECHOES</span>
            </button>
            <AnimatePresence>
              {echoFloat && (
                <motion.span
                  initial={{ opacity: 1, y: 0, x: '-50%' }}
                  animate={{ opacity: 0, y: -28 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute left-1/2 -top-2 text-blue text-xs font-mono font-bold pointer-events-none"
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-mono font-bold text-navy/60 hover:text-blue transition-colors uppercase tracking-widest"
          >
            <span>Share Story</span>
            <span>↗</span>
          </button>
        </div>
      </article>

      {/* Related Stories */}
      <section className="border-t border-navy/15 py-16 bg-[#D6E4F0]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-10 pb-3 border-b border-navy/15">
            <span className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase block mb-1">
              CONTINUE READING
            </span>
            <h2 className="font-serif text-2xl font-semibold text-navy">Related Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel, i) => (
              <motion.article
                key={rel.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer bg-[#EEF4F8] p-4 rounded-xs border border-navy/12 hover:border-navy/25 hover:shadow-xs transition-all"
                onClick={() => {
                  navigate({ page: 'article', article: rel })
                  window.scrollTo({ top: 0, behavior: 'instant' })
                }}
              >
                <div className="overflow-hidden bg-[#EEF4F8]/5 mb-3.5 aspect-[4/3] rounded-2xs border border-navy/10">
                  <motion.img
                    src={img(rel.image, 600, 450)}
                    alt={rel.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-[9px] tracking-[0.2em] font-bold text-blue uppercase">
                  {rel.category}
                </span>
                <h3 className="font-serif text-base font-semibold text-navy mt-1 mb-2 leading-snug group-hover:text-blue transition-colors">
                  {rel.title}
                </h3>
                <span className="text-[10px] font-mono text-navy/40">{rel.readTime}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Leave an Echo (Comments) */}
      <section className="py-16 border-t border-navy/10 bg-[#EEF4F8]">
        <div className="max-w-2xl mx-auto px-6 lg:px-0">
          <div className="mb-8">
            <span className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase block mb-1">
              COMMUNITY RESPONSES
            </span>
            <h2 className="font-serif text-2xl font-semibold text-navy">Leave an Echo</h2>
            <p className="text-xs text-navy/60 mt-1">
              Visitors can comment without signing up. Share your thoughts below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-12 bg-[#EEF4F8] p-6 border border-navy/15 rounded-xs shadow-2xs">
            <div className="mb-4">
              <label className="text-[10px] tracking-[0.2em] text-navy/60 font-mono uppercase font-bold block mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={newEcho.name}
                onChange={(e) => setNewEcho((n) => ({ ...n, name: e.target.value }))}
                placeholder="Elena, James, Nora…"
                className="w-full bg-[#EEF4F8] border border-navy/20 px-3 py-2 text-xs text-navy placeholder-navy/30 outline-none focus:border-blue rounded-2xs font-sans"
              />
            </div>
            <div className="mb-5">
              <label className="text-[10px] tracking-[0.2em] text-navy/60 font-mono uppercase font-bold block mb-1.5">
                Your Echo / Thoughts
              </label>
              <textarea
                rows={3}
                value={newEcho.message}
                onChange={(e) => setNewEcho((n) => ({ ...n, message: e.target.value }))}
                placeholder="What did this story stir in you?"
                className="w-full bg-[#EEF4F8] border border-navy/20 px-3 py-2 text-xs text-navy placeholder-navy/30 outline-none focus:border-blue rounded-2xs resize-none font-sans"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-[#EEF4F8] hover:bg-blue text-navy text-xs font-mono font-bold tracking-widest uppercase px-5 py-2.5 rounded-2xs transition-colors flex items-center gap-2"
              >
                <span>SEND ECHO</span>
                <span>→</span>
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-mono text-blue font-bold"
                  >
                    ✓ Your echo was published ♥
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Comments List */}
          <div className="flex flex-col gap-6">
            {comments.map((comment, i) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border-b border-navy/10 pb-5"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-xs font-bold text-navy tracking-wide">
                    {comment.name}
                  </span>
                  <span className="text-[10px] font-mono text-navy/40">{comment.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed font-sans">{comment.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#EEF4F8] text-navy text-xs font-mono px-4 py-2.5 rounded shadow-lg flex items-center gap-2 border border-blue/40"
          >
            <span className="text-blue">✓</span> Story link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
