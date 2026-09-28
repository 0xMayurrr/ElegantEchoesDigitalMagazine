import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMascotSettings } from '../lib/mascot'

export type PetMode = 'header' | 'bottom-walk' | 'corner-peek' | 'hidden'

export default function MascotPet() {
  const settings = useMascotSettings()
  const [mode, setMode] = useState<PetMode>('header')
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [showSpeech, setShowSpeech] = useState(true)
  const [clickCount, setClickCount] = useState(0)
  const [isDancing, setIsDancing] = useState(false)
  const [walkFrame, setWalkFrame] = useState(0)
  const [walkDirection, setWalkDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right')

  const activeQuotes = settings.quotes.length > 0 ? settings.quotes : ['Welcome to Elegant Echoes! 💙']

  if (!settings.enabled) return null

  // Ticker for stepping bounce frame
  useEffect(() => {
    if (mode === 'bottom-walk') {
      const stepInterval = setInterval(() => {
        setWalkFrame((prev) => (prev + 1) % 2)
      }, 200)
      return () => clearInterval(stepInterval)
    }
  }, [mode])

  // Automatic behavior rotator every 20 seconds
  useEffect(() => {
    const modes: PetMode[] = ['header', 'corner-peek', 'bottom-walk']
    const interval = setInterval(() => {
      setMode((prev) => {
        if (prev === 'hidden') return 'hidden'
        const currentIndex = modes.indexOf(prev)
        const nextIndex = (currentIndex + 1) % modes.length
        
        // Alternate walking direction when switching to bottom-walk
        if (modes[nextIndex] === 'bottom-walk') {
          setWalkDirection((d) => (d === 'left-to-right' ? 'right-to-left' : 'left-to-right'))
        }

        return modes[nextIndex]
      })
      setQuoteIndex((prev) => (prev + 1) % activeQuotes.length)
      setShowSpeech(true)
    }, 20000)

    return () => clearInterval(interval)
  }, [activeQuotes.length])

  // Auto-hide speech bubble after 6s
  useEffect(() => {
    if (showSpeech) {
      const timer = setTimeout(() => setShowSpeech(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [showSpeech, mode, quoteIndex])

  const handleMascotClick = () => {
    setIsDancing(true)
    setClickCount((prev) => prev + 1)
    setQuoteIndex((prev) => (prev + 1) % activeQuotes.length)
    setShowSpeech(true)
    setTimeout(() => setIsDancing(false), 1200)
  }

  if (mode === 'hidden') {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setMode('header')}
        className="fixed bottom-4 left-4 z-[60] bg-white/90 backdrop-blur-md text-navy text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-full border border-blue/40 shadow-md hover:bg-blue hover:text-white transition-all flex items-center gap-1.5 uppercase"
        title="Summon Mascot Companion"
      >
        <span>💙 Summon Pet</span>
      </motion.button>
    )
  }

  return (
    <>
      {/* Quick Hide / Toggle Controller in bottom left */}
      <div className="fixed bottom-3 left-4 z-[60] flex items-center gap-2">
        <button
          onClick={() => {
            const modes: PetMode[] = ['header', 'corner-peek', 'bottom-walk']
            const next = modes[(modes.indexOf(mode) + 1) % modes.length]
            if (next === 'bottom-walk') {
              setWalkDirection((d) => (d === 'left-to-right' ? 'right-to-left' : 'left-to-right'))
            }
            setMode(next)
            setShowSpeech(true)
          }}
          className="bg-white/90 hover:bg-white text-navy/80 hover:text-blue text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full border border-navy/20 shadow-md transition-colors uppercase flex items-center gap-1"
          title="Change Mascot Pose"
        >
          <span>✨ Mascot: <strong className="text-blue font-bold">{mode.toUpperCase()}</strong></span>
        </button>
        <button
          onClick={() => setMode('hidden')}
          className="bg-white/90 hover:bg-white text-navy/50 hover:text-red-500 text-[10px] font-mono px-2 py-1 rounded-full border border-navy/20 shadow-md transition-colors"
          title="Hide mascot"
        >
          ✕
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* MODE 1: SITTING ON THE STICKY HEADER WITH COFFEE */}
        {mode === 'header' && (
          <motion.div
            key="mode-header"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 right-32 md:right-48 z-[60] pointer-events-auto cursor-pointer group"
            onClick={handleMascotClick}
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {showSpeech && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-14 -left-20 md:-left-28 whitespace-nowrap bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-blue/30 shadow-lg text-[11px] font-serif text-navy flex items-center gap-1.5 z-20"
                >
                  <span>{activeQuotes[quoteIndex]}</span>
                  <div className="absolute -top-1.5 right-6 w-2.5 h-2.5 bg-white/95 border-l border-t border-blue/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cartoon Girl Sitting on Top of Header Bar */}
            <motion.div
              animate={
                isDancing
                  ? { y: [0, -20, 0], rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }
                  : { y: [0, -3, 0], rotate: [-1, 1, -1] }
              }
              transition={
                isDancing
                  ? { duration: 0.6 }
                  : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
              }
              className="relative w-12 h-16 md:w-14 md:h-20"
            >
              <img
                src={isDancing ? '/cartoon-dance.png' : '/cartoon-sitting.png'}
                alt="Header Mascot Sitting"
                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-200"
              />
              {clickCount > 0 && (
                <motion.span
                  key={clickCount}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -25, scale: 1.4 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm pointer-events-none select-none"
                >
                  ☕✨
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* MODE 2: CORNER PEEKING / DANCING */}
        {mode === 'corner-peek' && (
          <motion.div
            key="mode-corner"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-2 right-4 md:right-10 z-[60] pointer-events-auto cursor-pointer group"
            onClick={handleMascotClick}
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {showSpeech && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-14 right-2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-blue/30 shadow-lg text-xs font-serif text-navy flex items-center gap-1.5 z-20"
                >
                  <span>{activeQuotes[quoteIndex]}</span>
                  <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-white/95 border-r border-b border-blue/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dancing or Waving Mascot in Corner */}
            <motion.div
              animate={
                isDancing
                  ? { y: [0, -25, 0], scale: [1, 1.2, 1], rotate: [-10, 10, -10, 0] }
                  : { y: [0, -4, 0], rotate: [0, 2, 0] }
              }
              transition={
                isDancing
                  ? { duration: 0.6 }
                  : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
              }
              className="relative w-22 h-30 md:w-28 md:h-36"
            >
              <img
                src={isDancing ? '/cartoon-dance.png' : '/cartoon-blue.png'}
                alt="Corner Mascot"
                className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-200"
              />
              {clickCount > 0 && (
                <motion.span
                  key={clickCount}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -30, scale: 1.4 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-base pointer-events-none select-none"
                >
                  🎉✨
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* MODE 3: REAL FORWARD-FACING WALKING ANIMATION ACROSS THE SCREEN */}
        {mode === 'bottom-walk' && (
          <motion.div
            key={`mode-walk-${walkDirection}`}
            initial={{
              left: walkDirection === 'left-to-right' ? '-10vw' : '105vw',
              opacity: 0,
            }}
            animate={{
              left: walkDirection === 'left-to-right' ? '105vw' : '-10vw',
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: settings.movementSpeed === 'fast' ? 12 : settings.movementSpeed === 'slow' ? 24 : 18,
              ease: 'linear',
            }}
            onAnimationComplete={() => {
              setMode('header')
            }}
            className="fixed bottom-6 md:bottom-8 z-[60] pointer-events-auto cursor-pointer group"
            onClick={handleMascotClick}
          >
            {/* Speech Bubble */}
            <AnimatePresence>
              {showSpeech && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue/30 shadow-lg text-xs font-serif font-medium text-navy flex items-center gap-1.5 z-20"
                >
                  <span>{activeQuotes[quoteIndex]}</span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white/95 border-r border-b border-blue/30 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* HIGH-VISIBILITY WALKING CHARACTER WITH FORWARD FACING DIRECTION */}
            <motion.div
              animate={
                isDancing
                  ? { y: [0, -30, 0], scale: [1, 1.25, 1], rotate: [0, -15, 15, 0] }
                  : {
                      y: walkFrame === 0 ? 0 : -8,
                      rotate: walkFrame === 0 ? -3 : 3,
                    }
              }
              transition={
                isDancing
                  ? { duration: 0.6 }
                  : { duration: 0.2, ease: 'easeInOut' }
              }
              className="relative w-20 h-28 md:w-24 md:h-34"
            >
              <img
                src={
                  isDancing
                    ? '/cartoon-dance.png'
                    : walkDirection === 'left-to-right'
                    ? '/cartoon-walk-right.png' // Facing RIGHT when moving left-to-right!
                    : '/cartoon-walk.png'       // Facing LEFT when moving right-to-left!
                }
                alt="Walking Mascot Forward"
                className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-200"
              />
              {clickCount > 0 && (
                <motion.span
                  key={clickCount}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -30, scale: 1.4 }}
                  transition={{ duration: 0.8 }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-base pointer-events-none select-none"
                >
                  💙✨
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
