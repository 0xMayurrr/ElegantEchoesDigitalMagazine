import { useState, useEffect } from 'react'

export interface AuthorProfile {
  name: string
  title: string
  imageUrl: string
  bio1: string
  bio2: string
  quote: string
  location: string
  email: string
  twitterUrl: string
  instagramUrl: string
}

export const DEFAULT_PROFILE: AuthorProfile = {
  name: 'Elena Marín',
  title: 'Writer, podcaster, and editor',
  imageUrl: '/rathu.png',
  bio1: 'Writer, podcaster, and editor based between Lisbon and Barcelona. I write about solitude, memory, travel, and the small moments that quietly reshape who we are. Elegant Echoes began as a private journal in 2021 and evolved into a digital publication for curious minds seeking depth.',
  bio2: 'I host the Voices podcast, where I engage in unhurried conversations about authenticity, creative courage, and what it costs to be honest in an accelerated world.',
  quote: '"I write to find out what I think. The essay is the most honest form I know."',
  location: 'Lisbon, Portugal',
  email: 'elena@elegantechoes.com',
  twitterUrl: 'https://twitter.com',
  instagramUrl: 'https://instagram.com',
}

const STORAGE_KEY = 'elegant_echoes_author_profile'

export function getStoredProfile(): AuthorProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.error('Failed to load author profile from localStorage', e)
  }
  return DEFAULT_PROFILE
}

export function saveStoredProfile(profile: AuthorProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    window.dispatchEvent(new Event('author_profile_updated'))
  } catch (e) {
    console.error('Failed to save author profile to localStorage', e)
  }
}

export function useAuthorProfile(): AuthorProfile {
  const [profile, setProfile] = useState<AuthorProfile>(getStoredProfile)

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getStoredProfile())
    }
    window.addEventListener('author_profile_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('author_profile_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return profile
}
