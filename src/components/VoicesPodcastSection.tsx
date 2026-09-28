import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

export default function VoicesPodcastSection({ navigate }: { navigate: (state: NavState) => void }) {
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>(PODCAST_EPISODES[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(15) // start at 15% preview
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  const handleSelectEpisode = (ep: PodcastEpisode) => {
    setActiveEpisode(ep)
    setProgress(0)
    setIsPlaying(true)
  }

  const remainingEpisodes = PODCAST_EPISODES.filter((ep) => ep.id !== activeEpisode.id).slice(0, 3)

  return (
    <section id="podcast" className="py-16 lg:py-24 bg-light-blue/40 border-b border-navy/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 pb-4 border-b border-navy/15">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-semibold text-blue uppercase block mb-1">
              AUDIO EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl font-semibold text-navy">VOICES</h2>
            <p className="text-sm font-serif italic text-navy/60 mt-1">
              "Some thoughts are better heard."
            </p>
          </div>
          <button
            onClick={() => navigate({ page: 'podcast' })}
            className="hidden sm:flex items-center gap-2 text-xs tracking-[0.2em] font-bold text-blue hover:text-primary transition-colors uppercase font-mono"
          >
            <span>BROWSE ALL EPISODES ({PODCAST_EPISODES.length})</span>
            <span>→</span>
          </button>
        </div>

        {/* Featured Podcast Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-cream border border-navy/15 p-6 lg:p-10 rounded-xs shadow-xs mb-10"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Artwork */}
            <div className="lg:col-span-4 relative group">
              <div className="aspect-square overflow-hidden bg-[#EEF4F8]/10 rounded-xs border border-navy/15 shadow-2xs">
                <img
                  src={img(activeEpisode.image, 600, 600)}
                  alt={activeEpisode.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-3 left-3 bg-[#EEF4F8] text-navy text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-2xs border border-navy/20">
                FEATURED EPISODE
              </div>
            </div>

            {/* Content & Custom Audio Player */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] tracking-[0.25em] font-bold text-blue uppercase font-mono">
                    {activeEpisode.number}
                  </span>
                  <span className="text-xs text-navy/30">•</span>
                  <span className="text-[10px] tracking-[0.2em] text-navy/50 font-mono uppercase">
                    {activeEpisode.category}
                  </span>
                  <span className="text-xs text-navy/30">•</span>
                  <span className="text-[10px] text-navy/40 font-mono">{activeEpisode.date}</span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-navy leading-snug mb-3">
                  {activeEpisode.title}
                </h3>

                <p className="text-sm text-navy/70 leading-relaxed font-sans mb-6">
                  {activeEpisode.description}
                </p>
              </div>

              {/* Minimal Custom Audio Player */}
              <div className="bg-light-blue/50 border border-blue/20 p-5 rounded-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-[#EEF4F8] text-navy hover:bg-blue transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
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
                        {isPlaying ? 'Now Playing...' : 'Click to Play Episode'}
                      </span>
                      <span className="text-[10px] text-navy/50 font-mono">
                        Host: Elena Marín
                      </span>
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="hidden sm:block">
                    <Waveform isPlaying={isPlaying} />
                  </div>
                </div>

                {/* Interactive Progress Bar */}
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
        </motion.div>

        {/* 3 Smaller Podcast Episodes Horizontally */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {remainingEpisodes.map((ep, idx) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => handleSelectEpisode(ep)}
              className="group cursor-pointer bg-cream p-4 rounded-xs border border-navy/12 hover:border-blue/50 hover:shadow-xs transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-16 h-16 shrink-0 overflow-hidden bg-[#EEF4F8]/10 rounded-2xs border border-navy/10 relative">
                <img src={img(ep.image, 200, 200)} alt={ep.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#EEF4F8]/30 group-hover:bg-blue/40 transition-colors flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[9px] font-mono text-blue font-bold uppercase mb-0.5">
                  <span>{ep.number}</span>
                  <span>•</span>
                  <span>{ep.duration}</span>
                </div>
                <h4 className="font-serif text-sm font-semibold text-navy truncate group-hover:text-blue transition-colors">
                  {ep.title}
                </h4>
                <p className="text-[11px] text-navy/60 truncate font-sans">{ep.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
