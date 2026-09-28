import { useState, useEffect } from 'react'

export interface MascotSettings {
  enabled: boolean
  activeOutfit: 'blue' | 'pink' | 'custom'
  customImageUri?: string
  quotes: string[]
  loaderPose: 'sitting' | 'dancing' | 'waving'
  movementSpeed: 'slow' | 'normal' | 'fast'
}

export const DEFAULT_MASCOT_SETTINGS: MascotSettings = {
  enabled: true,
  activeOutfit: 'blue',
  quotes: [
    'Welcome to Elegant Echoes! 💙',
    'Written & curated with love by Rathina ✨',
    'Take a quiet breath & enjoy your reading ☕',
    'Solitude is where reflection lives 📖',
    'Have a wonderful & peaceful day! 🌸',
    'Think happy, stay vibrant! ☀️',
  ],
  loaderPose: 'sitting',
  movementSpeed: 'normal',
}

const STORAGE_KEY = 'ee_mascot_settings'
const EVENT_NAME = 'ee_mascot_updated'

export function getMascotSettings(): MascotSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...DEFAULT_MASCOT_SETTINGS, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.error('Error loading mascot settings:', e)
  }
  return DEFAULT_MASCOT_SETTINGS
}

export function saveMascotSettings(settings: MascotSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    window.dispatchEvent(new Event(EVENT_NAME))
  } catch (e) {
    console.error('Error saving mascot settings:', e)
  }
}

export function useMascotSettings(): MascotSettings {
  const [settings, setSettings] = useState<MascotSettings>(getMascotSettings)

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(getMascotSettings())
    }
    window.addEventListener(EVENT_NAME, handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return settings
}
