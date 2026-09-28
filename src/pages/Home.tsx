import type { NavState } from '../App'
import FeaturedStory from '../components/FeaturedStory'
import TrendingSection from '../components/TrendingSection'
import LatestGridSection from '../components/LatestGridSection'
import FeaturedJournalSection from '../components/FeaturedJournalSection'
import VoicesPodcastSection from '../components/VoicesPodcastSection'
import ExploreJournalSection from '../components/ExploreJournalSection'
import MostReadSection from '../components/MostReadSection'
import AboutSection from '../components/AboutSection'

interface HomeProps {
  navigate: (state: NavState) => void
}

function Footer({ navigate }: { navigate: (state: NavState) => void }) {
  return (
    <footer className="bg-[#EEF4F8] py-16 text-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-navy/15">
          <div>
            <button
              onClick={() => navigate({ page: 'home' })}
              className="font-serif text-navy tracking-[0.18em] text-lg font-bold uppercase hover:text-[#D6E4F0] transition-colors block mb-2"
            >
              ELEGANT ECHOES
            </button>
            <p className="text-xs text-navy/50 max-w-sm font-sans">
              A personal publication on solitude, stories, reflections, and quiet living.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 font-mono text-xs text-navy/60">
            <button
              onClick={() => navigate({ page: 'journal' })}
              className="hover:text-navy transition-colors uppercase"
            >
              JOURNAL
            </button>
            <button
              onClick={() => navigate({ page: 'podcast' })}
              className="hover:text-navy transition-colors uppercase"
            >
              PODCAST
            </button>
            <button
              onClick={() => navigate({ page: 'about' })}
              className="hover:text-navy transition-colors uppercase"
            >
              ABOUT
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-navy/40 font-mono">
          <p>© 2026 ELEGANT ECHOES. ALL RIGHTS RESERVED.</p>
          <p className="font-serif italic text-navy/50 text-sm">
            Written with care. Published with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Home({ navigate }: HomeProps) {
  return (
    <main className="bg-[#EEF4F8]">
      {/* Section 1 — Featured */}
      <FeaturedStory navigate={navigate} />

      {/* Section 2 — Trending / Popular */}
      <TrendingSection navigate={navigate} />

      {/* Section 3 — Latest Stories */}
      <LatestGridSection navigate={navigate} />

      {/* Section 4 — Featured Journal */}
      <FeaturedJournalSection navigate={navigate} />

      {/* Section 5 — Voices / Podcast */}
      <VoicesPodcastSection navigate={navigate} />

      {/* Section 6 — Explore Journal */}
      <ExploreJournalSection navigate={navigate} />

      {/* Section 7 — Most Read */}
      <MostReadSection navigate={navigate} />

      {/* Section 8 — About */}
      <AboutSection />

      {/* Footer */}
      <Footer navigate={navigate} />
    </main>
  )
}
