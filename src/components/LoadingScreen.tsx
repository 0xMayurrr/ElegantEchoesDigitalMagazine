import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMascotSettings } from '../lib/mascot'

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const settings = useMascotSettings()
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Curating cozy stories...')

  useEffect(() => {
    const texts = [
      'Sitting cozy with coffee...',
      'Curating quiet thoughts...',
      'Preparing fresh podcast episodes...',
      'Welcome to Elegant Echoes ✨',
    ]

    let textIdx = 0
    const textInterval = setInterval(() => {
      textIdx = (textIdx + 1) % texts.length
      setLoadingText(texts[textIdx])
    }, 450)

    const startTime = Date.now()
    const duration = 1800

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100))
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(timer)
        clearInterval(textInterval)
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 300)
      }
    }, 30)

    return () => {
      clearInterval(timer)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#EEF4F8] selection:bg-[#D6E4F0] px-4 overflow-hidden"
    >
      {/* Background Subtle Radial Lighting */}
      <div className="absolute inset-0 bg-radial from-[#D6E4F0]/60 via-transparent to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-lg text-center">
        
        {/* Animated Mascot Sitting Directly On Top of Text Ledge */}
        <div className="relative flex flex-col items-center">
          
          {/* Speech Bubble Above Mascot */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-2 whitespace-nowrap bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue/30 shadow-md text-xs font-serif font-medium text-navy flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-blue animate-ping" />
            <span>{loadingText}</span>
          </motion.div>

          {/* Sparkles Floating Around */}
          <motion.span
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.9, 0.3], rotate: [0, 45, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute top-6 -left-8 text-xl pointer-events-none select-none"
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
            className="absolute top-10 -right-8 text-base pointer-events-none select-none"
          >
            ☕
          </motion.span>

          {/* SITTING MASCOT CHARACTER WITH LEGS DANGLING OVER THE TEXT */}
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: 'easeInOut',
            }}
            className="relative w-32 h-36 md:w-40 md:h-44 z-20 -mb-6 pointer-events-none"
          >
            <img
              src={settings.loaderPose === 'dancing' ? '/cartoon-dance.png' : settings.loaderPose === 'waving' ? '/cartoon-blue.png' : '/cartoon-sitting.png'}
              alt="Mascot Sitting on Text"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </motion.div>

          {/* ELEGANT ECHOES TITLE TEXT (MASCOT SITS RIGHT ON THIS HEADER TEXT LEDGE!) */}
          <div className="relative z-10 pt-2 pb-1 border-t-2 border-navy/20 px-8">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-serif text-3xl md:text-4xl font-bold tracking-[0.22em] text-navy uppercase select-none"
            >
              ELEGANT ECHOES
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-xs tracking-[0.25em] font-sans font-semibold text-navy/60 uppercase mt-2 mb-6"
        >
          Digital Magazine & Journal
        </motion.p>

        {/* Progress Bar */}
        <div className="w-60 h-1.5 bg-navy/10 rounded-full overflow-hidden p-0.5 border border-navy/10 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#063B8C] via-[#0B5ED7] to-[#3B82F6] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Counter */}
        <div className="mt-2 text-[10px] font-mono tracking-widest text-navy/50">
          {progress}%
        </div>
      </div>
    </motion.div>
  )
}
