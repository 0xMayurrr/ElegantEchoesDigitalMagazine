import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavState } from '../App'
import { PODCAST_EPISODES, type PodcastEpisode } from '../data/articles'

const img = (id: string, w = 600, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

function Waveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = [
    0.35, 0.65, 0.9, 0.55, 0.8, 0.4, 0.95, 0.5, 0.75, 0.3, 0.85, 0.6, 0.45, 0.7, 0.9, 0.4, 0.65,
    0.3, 0.8, 0.5, 0.7, 0.35, 0.6, 0.85, 0.45, 0.75, 0.55, 0.9, 0.4, 0.65,
  ]

  return (
    <div className="flex items-center gap-[3px] h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-blue rounded-full origin-center"
          animate={
            isPlaying
              ? {
                  scaleY: [h, h * 0.2, h * 1.2, h * 0.4, h],
                }
              : { scaleY: h * 0.3 }
          }
          style={{ height: '32px' }}
          transition={{
            duration: 0.6 + (i % 5) * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.03,
          }}
        />
      ))}
    </div>
  )
}

export default function PodcastPage({ navigate }: { navigate: (state: NavState) => void }) {
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCAST_EPISODES[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const categories = ['ALL', 'AUTHENTICITY', 'SOLITUDE', 'CREATIVITY', 'TRAVEL']

  const parseDuration = (durStr: string) => {
    const parts = durStr.split(':')
    if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1])
    return 2400
  }

  const totalSecs = parseDuration(activeEpisode.duration)
  const currentSecs = Math.floor((progress / 100) * totalSecs)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = Math.floor(s % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const filteredEpisodes = PODCAST_EPISODES.filter((ep) => {
    const matchesCat = selectedCategory === 'ALL' || ep.category.toUpperCase() === selectedCategory.toUpperCase()
    const matchesQ =
      !searchQuery.trim() ||
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesQ
  })

  return (
    <main className="min-h-screen bg-[#EEF4F8] pb-24">
      {/* Top Banner Header */}
      <section className="pt-10 pb-12 bg-[#D6E4F0]/40 border-b border-navy/15">
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
                DIGITAL AUDIO ARCHIVE
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-navy">
                VOICES PODCAST
              </h1>
              <p className="text-sm sm:text-base font-serif italic text-navy/60 mt-2">
                "Conversations on quiet living, creativity, and the art of restraint."
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-navy/60 bg-[#EEF4F8] px-4 py-2.5 rounded-xs border border-navy/15">
              <span>Host: Elena Marín</span>
              <span>•</span>
              <span>Spotify · Apple Podcasts</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        {/* Featured Episode Player Card */}
        <section className="mb-14">
          <div className="bg-[#EEF4F8] border border-navy/15 p-6 lg:p-10 rounded-xs shadow-xs">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Artwork */}
              <div className="lg:col-span-4">
                <div className="aspect-square overflow-hidden bg-[#EEF4F8]/10 rounded-xs border border-navy/15 shadow-2xs relative">
                  <img
                    src={img(activeEpisode.image, 600, 600)}
                    alt={activeEpisode.title}
                    className="w-full h-full object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute top-3 right-3 bg-blue text-navy text-[9px] font-mono font-bold px-2 py-1 rounded-2xs shadow-sm uppercase tracking-widest animate-pulse">
                      PLAYING
                    </div>
                  )}
                </div>
              </div>

              {/* Episode Info & Controls */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.25em] font-bold text-blue font-mono uppercase">
                      {activeEpisode.number}
                    </span>
                    <span className="text-xs text-navy/30">•</span>
                    <span className="text-[10px] tracking-[0.2em] font-bold text-navy/60 font-mono uppercase">
                      {activeEpisode.category}
                    </span>
                    <span className="text-xs text-navy/30">•</span>
                    <span className="text-[10px] text-navy/40 font-mono">{activeEpisode.date}</span>
                  </div>

                  <h2 className="font-serif text-3xl font-semibold text-navy leading-snug mb-3">
                    {activeEpisode.title}
                  </h2>

                  <p className="text-sm text-navy/70 leading-relaxed font-sans mb-6">
                    {activeEpisode.description}
                  </p>
                </div>

                {/* Custom Audio Player */}
                <div className="bg-[#D6E4F0]/50 border border-blue/20 p-5 rounded-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-[#EEF4F8] text-navy hover:bg-blue transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                      >
                        {isPlaying ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                            <path d="M8 5.14v14l11-7-11-7z" />
                          </svg>
                        )}
                      </button>
                      <div>
                        <span className="text-xs font-semibold text-navy block">
                          {isPlaying ? 'Playing Episode Stream' : 'Click Play to Listen'}
                        </span>
                        <span className="text-[10px] text-navy/50 font-mono">
                          Duration: {activeEpisode.duration}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:block">
                      <Waveform isPlaying={isPlaying} />
                    </div>
                  </div>

                  {/* Scrub Bar */}
                  <div
                    className="relative h-2 bg-[#EEF4F8]/10 rounded-full cursor-pointer overflow-hidden mb-2"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
                      setProgress(pct)
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-blue transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-navy/50">
                    <span>{formatTime(currentSecs)}</span>
                    <span>{activeEpisode.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="mb-10 pb-4 border-b border-navy/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-[11px] tracking-[0.15em] font-bold uppercase rounded-xs border transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue text-navy border-blue'
                    : 'bg-[#EEF4F8] text-navy/70 border-navy/15 hover:border-navy/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search episodes..."
              className="w-full bg-[#EEF4F8] border border-navy/20 pl-8 pr-8 py-1.5 text-xs text-navy outline-none focus:border-blue rounded-xs"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-navy/40"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </section>

        {/* Episodes Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map((ep) => {
            const isCurrent = activeEpisode.id === ep.id
            return (
              <motion.article
                key={ep.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`group cursor-pointer p-5 bg-[#EEF4F8] border rounded-xs transition-all duration-300 flex flex-col justify-between ${
                  isCurrent
                    ? 'border-blue shadow-xs ring-1 ring-blue/20'
                    : 'border-navy/15 hover:border-navy/30 hover:shadow-2xs'
                }`}
                onClick={() => {
                  setActiveEpisode(ep)
                  setProgress(0)
                  setIsPlaying(true)
                  window.scrollTo({ top: 120, behavior: 'smooth' })
                }}
              >
                <div>
                  <div className="overflow-hidden bg-[#EEF4F8]/10 aspect-video mb-4 rounded-2xs border border-navy/10 relative">
                    <img src={img(ep.image, 600, 350)} alt={ep.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#EEF4F8]/20 group-hover:bg-blue/30 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-cream/90 text-navy group-hover:bg-blue group-hover:text-navy transition-colors flex items-center justify-center shadow-md">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-blue font-bold uppercase mb-1">
                    <span>{ep.number}</span>
                    <span>{ep.duration}</span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-navy leading-snug group-hover:text-blue transition-colors mb-2">
                    {ep.title}
                  </h3>

                  <p className="text-xs text-navy/65 leading-relaxed font-sans line-clamp-3 mb-4">
                    {ep.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-navy/10 text-[10px] font-mono text-navy/40">
                  <span>{ep.date}</span>
                  <span className="group-hover:text-blue font-bold uppercase tracking-wider">
                    LISTEN NOW →
                  </span>
                </div>
              </motion.article>
            )
          })}
        </section>
      </div>

      {/* Sticky Mini Player Bar */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#EEF4F8] text-navy border-t border-blue/40 shadow-xl py-3 px-6"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-blue text-navy hover:bg-[#D6E4F0] hover:text-navy transition-colors flex items-center justify-center shrink-0"
                >
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  )}
                </button>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-[#D6E4F0] uppercase font-bold block">
                    {activeEpisode.number} · NOW PLAYING
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-navy truncate">
                    {activeEpisode.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono text-navy/60">
                <span>{formatTime(currentSecs)} / {activeEpisode.duration}</span>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="hover:text-navy text-xs font-mono uppercase"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
