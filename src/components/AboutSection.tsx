import { motion } from 'framer-motion'
import type { NavState } from '../App'
import { useAuthorProfile } from '../lib/profile'

export default function AboutSection({ navigate }: { navigate?: (state: NavState) => void }) {
  const profile = useAuthorProfile()

  return (
    <section id="about" className="py-16 lg:py-24 border-b border-navy/10 bg-[#EEF4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* PHOTO */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#EEF4F8]/10 rounded-xs border border-navy/15 shadow-2xs max-w-sm mx-auto lg:max-w-none">
              <img
                src={profile.imageUrl || '/rathu.png'}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = '/rathu.png'
                }}
              />
            </div>
          </motion.div>

          {/* ABOUT HER */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] tracking-[0.3em] font-bold text-blue uppercase">
                ABOUT HER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy mb-6">
              {profile.name}
            </h2>

            <p className="text-navy/70 leading-relaxed text-sm sm:text-base font-sans mb-5">
              {profile.bio1}
            </p>

            {profile.bio2 && (
              <p className="text-navy/70 leading-relaxed text-sm sm:text-base font-sans mb-6">
                {profile.bio2}
              </p>
            )}

            {/* Personal Quote */}
            {profile.quote && (
              <blockquote className="border-l-2 border-blue pl-4 py-1 mb-8 bg-[#D6E4F0]/30 rounded-r-2xs">
                <p className="font-serif text-base sm:text-lg italic text-navy/90 leading-relaxed">
                  {profile.quote}
                </p>
              </blockquote>
            )}

            {/* Links */}
            <div className="flex items-center justify-between pt-4 border-t border-navy/15">
              <div className="flex items-center gap-6">
                {[
                  { label: 'TWITTER / X', href: profile.twitterUrl || 'https://twitter.com' },
                  { label: 'INSTAGRAM', href: profile.instagramUrl || 'https://instagram.com' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] tracking-[0.15em] font-semibold text-navy/60 hover:text-blue transition-colors uppercase font-mono"
                  >
                    {label}
                  </a>
                ))}
              </div>

              {navigate && (
                <button
                  onClick={() => navigate({ page: 'about' })}
                  className="text-xs tracking-[0.2em] font-bold text-blue hover:text-primary uppercase font-mono flex items-center gap-1.5"
                >
                  <span>READ FULL BIO</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
