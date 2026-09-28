import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { useAuthorProfile } from '../lib/profile'

interface AboutPageProps {
  navigate: (state: NavState) => void
}

export default function AboutPage({ navigate }: AboutPageProps) {
  const profile = useAuthorProfile()

  return (
    <main className="min-h-screen bg-[#EEF4F8] pb-24">
      {/* Top Banner Header */}
      <section className="pt-12 pb-14 bg-[#D6E4F0]/40 border-b border-navy/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <button
            onClick={() => navigate({ page: 'home' })}
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] font-mono text-navy/50 hover:text-blue uppercase mb-4"
          >
            <span>←</span> Back to Homepage
          </button>
          <span className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase block mb-1">
            ABOUT THE PUBLICATION
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-navy uppercase">
            {profile.name} & ELEGANT ECHOES
          </h1>
          <p className="text-sm sm:text-base font-serif italic text-navy/60 mt-2 max-w-2xl">
            "A personal digital publication dedicated to unhurried essays, quiet reflections, and authentic audio conversations."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Portrait Photo & Quick Stats (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#EEF4F8]/10 rounded-xs border border-navy/15 shadow-sm">
              <img
                src={profile.imageUrl || '/rathu.png'}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = '/rathu.png'
                }}
              />
            </div>

            <div className="bg-[#EEF4F8] border border-navy/15 p-5 rounded-xs space-y-3 text-xs font-mono text-navy/70">
              <div className="flex justify-between border-b border-navy/10 pb-2">
                <span>LOCATION:</span>
                <span className="font-bold text-navy">{profile.location || 'Lisbon, Portugal'}</span>
              </div>
              <div className="flex justify-between border-b border-navy/10 pb-2">
                <span>AUTHOR:</span>
                <span className="font-bold text-navy">{profile.name}</span>
              </div>
              <div className="flex justify-between border-b border-navy/10 pb-2">
                <span>ROLE:</span>
                <span className="font-bold text-navy">{profile.title}</span>
              </div>
              <div className="flex justify-between">
                <span>PODCAST:</span>
                <span className="font-bold text-blue">Voices Podcast</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Detailed Bio & Manifesto (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase block mb-2">
              HER STORY & MANIFESTO
            </span>

            <h2 className="font-serif text-3xl font-semibold text-navy mb-6">
              Writing as an act of attention.
            </h2>

            <div className="prose prose-navy max-w-none space-y-5 text-navy/80 text-sm sm:text-base leading-relaxed font-sans">
              <p>{profile.bio1}</p>
              {profile.bio2 && <p>{profile.bio2}</p>}
            </div>

            {/* Quote Block */}
            {profile.quote && (
              <blockquote className="my-8 border-l-3 border-blue pl-5 py-2 bg-[#D6E4F0]/30 rounded-r-xs">
                <p className="font-serif text-lg italic text-navy leading-relaxed">
                  {profile.quote}
                </p>
                <span className="text-xs font-mono text-navy/50 mt-2 block">— {profile.name}</span>
              </blockquote>
            )}

            {/* Core Writing Principles */}
            <div className="mb-10">
              <h3 className="font-serif text-xl font-semibold text-navy mb-4 border-b border-navy/15 pb-2">
                Core Publication Principles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#EEF4F8] border border-navy/15 rounded-xs">
                  <span className="text-[10px] font-mono font-bold text-blue uppercase block mb-1">01. RESTRAINT OVER NOISE</span>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    Saying only what is necessary, with care and intention.
                  </p>
                </div>
                <div className="p-4 bg-[#EEF4F8] border border-navy/15 rounded-xs">
                  <span className="text-[10px] font-mono font-bold text-blue uppercase block mb-1">02. CHOSEN SOLITUDE</span>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    Cultivating internal quiet as a necessary foundation for genuine connection.
                  </p>
                </div>
                <div className="p-4 bg-[#EEF4F8] border border-navy/15 rounded-xs">
                  <span className="text-[10px] font-mono font-bold text-blue uppercase block mb-1">03. SLOW OBSERVATION</span>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    Paying attention to small details that re-anchor us in the present.
                  </p>
                </div>
                <div className="p-4 bg-[#EEF4F8] border border-navy/15 rounded-xs">
                  <span className="text-[10px] font-mono font-bold text-blue uppercase block mb-1">04. OPEN CONVERSATION</span>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    Inviting readers and listeners into unhurried dialogue through Echoes.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Social Links */}
            <div className="pt-6 border-t border-navy/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-navy/40 uppercase block">DIRECT ENQUIRIES</span>
                <a href={`mailto:${profile.email || 'elena@elegantechoes.com'}`} className="text-xs font-mono text-blue hover:underline">
                  {profile.email || 'elena@elegantechoes.com'}
                </a>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono font-bold text-navy/60">
                <a href={profile.twitterUrl || 'https://twitter.com'} target="_blank" rel="noreferrer" className="hover:text-blue uppercase">
                  TWITTER / X
                </a>
                <span>•</span>
                <a href={profile.instagramUrl || 'https://instagram.com'} target="_blank" rel="noreferrer" className="hover:text-blue uppercase">
                  INSTAGRAM
                </a>
                <span>•</span>
                <button onClick={() => navigate({ page: 'journal' })} className="hover:text-blue uppercase">
                  JOURNAL
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
