import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { NavState } from '../App'
import {
  FEATURED_ARTICLE,
  JOURNAL_ARTICLES,
  HORIZONTAL_FEATURE,
  PODCAST_EPISODE,
  type Article,
} from '../data/articles'

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface HomeProps {
  navigate: (state: NavState) => void
  scrollTo?: string
}

// ─── Journal Article Card ───────────────────────────────────────────────────

function ArticleCard({
  article,
  navigate,
  delay = 0,
}: {
  article: Article
  navigate: (state: NavState) => void
  delay?: number
}) {
  return (
    <motion.article
      variants={reveal}
      className="group cursor-pointer"
      onClick={() => navigate({ page: 'article', article })}
    >
      <div className="overflow-hidden bg-navy/5 mb-4 aspect-[4/3]">
        <motion.img
          src={img(article.image, 600, 450)}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          loading="lazy"
        />
      </div>
      <div className="border-t border-navy/15 pt-4">
        <span className="text-[10px] tracking-[0.25em] font-medium text-blue uppercase">
          {article.category}
        </span>
        <h3 className="font-serif text-lg font-semibold text-navy mt-1.5 mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-sm text-navy/60 leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-navy/40 tracking-wide">
            {article.date} · {article.readTime}
          </span>
          <span className="text-navy/40 group-hover:text-blue group-hover:translate-x-1 transition-all duration-200 text-sm">
            →
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Hero Section ───────────────────────────────────────────────────────────

function HeroSection({ navigate }: { navigate: (state: NavState) => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="pt-16 border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.div
          className="py-6 border-b border-navy/10 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] tracking-[0.3em] font-medium text-navy/40 uppercase">
            Featured Story
          </span>
          <span className="text-[10px] tracking-[0.3em] font-medium text-navy/40 uppercase">
            {FEATURED_ARTICLE.date}
          </span>
        </motion.div>

        {/* Hero grid */}
        <div className="grid lg:grid-cols-5 gap-0 min-h-[520px] lg:min-h-[600px]">
          {/* Image */}
          <motion.div
            className="lg:col-span-3 overflow-hidden bg-navy/10 order-2 lg:order-1"
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={inView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="w-full h-full min-h-[300px] lg:min-h-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={img(FEATURED_ARTICLE.image, 1200, 900)}
                alt={FEATURED_ARTICLE.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-center py-12 lg:py-16 lg:pl-14 order-1 lg:order-2"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.span
              variants={reveal}
              className="text-[10px] tracking-[0.3em] font-medium text-blue uppercase mb-6"
            >
              {FEATURED_ARTICLE.category}
            </motion.span>
            <motion.h1
              variants={reveal}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-6"
            >
              {FEATURED_ARTICLE.title}
            </motion.h1>
            <motion.p
              variants={reveal}
              className="text-navy/60 leading-relaxed mb-8 text-sm lg:text-base"
            >
              {FEATURED_ARTICLE.excerpt}
            </motion.p>
            <motion.div variants={reveal}>
              <button
                onClick={() => navigate({ page: 'article', article: FEATURED_ARTICLE })}
                className="group flex items-center gap-3 text-xs tracking-[0.2em] font-medium text-primary uppercase"
              >
                Read Story
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-base">
                  →
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Latest Journal ─────────────────────────────────────────────────────────

function LatestJournalSection({
  navigate,
  sectionRef,
}: {
  navigate: (state: NavState) => void
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="journal" ref={sectionRef} className="py-20 lg:py-28 border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.3em] font-medium text-navy/40 uppercase block mb-2"
            >
              Latest
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-2xl lg:text-3xl font-semibold text-navy"
            >
              From the Journal
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] text-navy/50 hover:text-navy transition-colors duration-200 uppercase"
          >
            All entries
            <span>→</span>
          </motion.button>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {JOURNAL_ARTICLES.map((article, i) => (
            <ArticleCard key={article.id} article={article} navigate={navigate} delay={i * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Horizontal Feature ─────────────────────────────────────────────────────

function HorizontalFeature({ navigate }: { navigate: (state: NavState) => void }) {
  return (
    <motion.section
      className="bg-navy border-b border-navy/20 cursor-pointer group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      onClick={() => navigate({ page: 'article', article: HORIZONTAL_FEATURE })}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 min-h-[420px]">
          {/* Image */}
          <div className="overflow-hidden bg-primary/30 order-2 lg:order-1">
            <motion.img
              src={img(HORIZONTAL_FEATURE.image, 900, 600)}
              alt={HORIZONTAL_FEATURE.title}
              className="w-full h-full min-h-[280px] object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center py-14 lg:py-20 lg:pl-16 order-1 lg:order-2">
            <span className="text-[10px] tracking-[0.3em] font-medium text-light-blue/70 uppercase mb-5">
              {HORIZONTAL_FEATURE.category}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-cream leading-tight mb-5">
              {HORIZONTAL_FEATURE.title}
            </h2>
            <p className="text-cream/50 leading-relaxed mb-8 text-sm">
              {HORIZONTAL_FEATURE.subtitle}
            </p>
            <div className="flex items-center gap-6">
              <button className="group/btn flex items-center gap-3 text-xs tracking-[0.2em] font-medium text-light-blue uppercase">
                Read Essay
                <span className="group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
              </button>
              <span className="text-cream/30 text-xs">{HORIZONTAL_FEATURE.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// ─── Waveform ───────────────────────────────────────────────────────────────

function Waveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = [0.35, 0.65, 0.9, 0.55, 0.8, 0.4, 0.95, 0.5, 0.75, 0.3, 0.85, 0.6, 0.45, 0.7, 0.9, 0.4, 0.65, 0.3, 0.8, 0.5, 0.7, 0.35, 0.6, 0.85, 0.45, 0.75, 0.55, 0.9, 0.4, 0.65]

  return (
    <div className="flex items-center gap-[3px] h-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-blue rounded-full origin-center"
          animate={
            isPlaying
              ? {
                  scaleY: [h, h * 0.25, h * 1.1, h * 0.5, h],
                }
              : { scaleY: h * 0.25 }
          }
          style={{ height: '40px' }}
          transition={{
            duration: 0.7 + (i % 5) * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  )
}

// ─── Voices Section ─────────────────────────────────────────────────────────

function VoicesSection({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const DURATION_SECS = 42 * 60 + 18

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false)
            return 0
          }
          return p + 100 / (DURATION_SECS * 10)
        })
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const progressSecs = (progress / 100) * DURATION_SECS
  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <section id="podcast" ref={sectionRef} className="py-20 lg:py-28 bg-light-blue border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.3em] font-medium text-primary/50 uppercase block mb-2"
          >
            Podcast
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-navy">Voices</h2>
            <p className="text-navy/50 text-sm mt-1 italic font-serif">
              "Some thoughts are better heard."
            </p>
          </motion.div>
        </div>

        {/* Episode card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-center"
        >
          {/* Artwork */}
          <div className="lg:col-span-2">
            <div className="aspect-square overflow-hidden bg-primary/20 max-w-xs mx-auto lg:max-w-none">
              <img
                src={img(PODCAST_EPISODE.image, 600, 600)}
                alt={PODCAST_EPISODE.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Episode info + player */}
          <div className="lg:col-span-3">
            <span className="text-[10px] tracking-[0.3em] font-medium text-blue uppercase">
              {PODCAST_EPISODE.number}
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-navy mt-3 mb-4 leading-snug">
              {PODCAST_EPISODE.title}
            </h3>
            <p className="text-navy/60 leading-relaxed text-sm mb-8">
              {PODCAST_EPISODE.description}
            </p>

            {/* Waveform */}
            <div className="mb-6">
              <Waveform isPlaying={isPlaying} />
            </div>

            {/* Progress bar */}
            <div className="relative h-px bg-navy/15 mb-3 cursor-pointer group/bar">
              <div
                className="absolute left-0 top-0 h-full bg-blue transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue border-2 border-light-blue opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-navy/40 font-mono mb-6">
              <span>{fmt(progressSecs)}</span>
              <span>{PODCAST_EPISODE.duration}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-navy text-cream hover:bg-primary transition-colors duration-200"
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setProgress(0)}
                className="text-navy/40 hover:text-navy transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <span className="text-[11px] tracking-wide text-navy/40 ml-auto">
                Subscribe on Spotify · Apple Podcasts
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── About Section ──────────────────────────────────────────────────────────

function AboutSection({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-28 border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-14 items-center">
          {/* Portrait */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-navy/10 max-w-xs">
              <img
                src={img('photo-1534528741775-53994a69daeb', 600, 800)}
                alt="Author portrait"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-[10px] tracking-[0.3em] font-medium text-navy/40 uppercase block mb-5">
              About
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-navy mb-6">
              Elena Marín
            </h2>
            <p className="text-navy/65 leading-relaxed mb-6">
              Writer, podcaster, and chronic over-thinker. I write about solitude, memory, travel,
              and the small moments that quietly reshape who we are. Elegant Echoes began as a
              private journal in 2021 and somehow became something I share.
            </p>
            <p className="text-navy/65 leading-relaxed mb-8">
              I host the Voices podcast, where I have long conversations about authenticity and what
              it costs to be honest. I live between Lisbon and Barcelona, usually near a window with
              good light.
            </p>

            {/* Quote */}
            <blockquote className="border-l-2 border-blue pl-5 mb-8">
              <p className="font-serif text-lg italic text-navy/80 leading-relaxed">
                "I write to find out what I think. The essay is the most honest form I know."
              </p>
            </blockquote>

            {/* Social links */}
            <div className="flex items-center gap-6">
              {[
                { label: 'Twitter / X', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Newsletter', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[11px] tracking-[0.15em] text-navy/50 hover:text-blue transition-colors duration-200 uppercase"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (state: NavState) => void }) {
  return (
    <footer className="bg-navy py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <button
            onClick={() => navigate({ page: 'home' })}
            className="font-serif text-cream tracking-[0.15em] text-base font-semibold uppercase hover:text-light-blue transition-colors duration-200"
          >
            Elegant Echoes
          </button>
          <div className="flex flex-wrap gap-8">
            {['JOURNAL', 'PODCAST', 'ABOUT', 'NEWSLETTER'].map((label) => (
              <span key={label} className="text-[10px] tracking-[0.2em] text-cream/30 cursor-pointer hover:text-cream/70 transition-colors duration-200">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-cream/25 tracking-wide">
            © 2026 Elegant Echoes. All rights reserved.
          </p>
          <p className="text-xs text-cream/25 tracking-wide italic font-serif">
            Written with care. Published with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Home Page ──────────────────────────────────────────────────────────────

export default function Home({ navigate, scrollTo }: HomeProps) {
  const journalRef = useRef<HTMLElement>(null)
  const podcastRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!scrollTo) return
    const map: Record<string, React.RefObject<HTMLElement | null>> = {
      journal: journalRef,
      podcast: podcastRef,
      about: aboutRef,
    }
    const ref = map[scrollTo]
    if (ref?.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [scrollTo])

  return (
    <main>
      <HeroSection navigate={navigate} />
      <LatestJournalSection navigate={navigate} sectionRef={journalRef} />
      <HorizontalFeature navigate={navigate} />
      <VoicesSection sectionRef={podcastRef} />
      <AboutSection sectionRef={aboutRef} />
      <Footer navigate={navigate} />
    </main>
  )
}
