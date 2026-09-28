import { useState } from 'react'
import {
  getMascotSettings,
  saveMascotSettings,
  MascotSettings,
} from '../lib/mascot'
import { Sparkles, Plus, Trash2, Check, Shirt, MessageSquare, Sliders, Upload } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function MascotEditor() {
  const [settings, setSettings] = useState<MascotSettings>(getMascotSettings)
  const [newQuote, setNewQuote] = useState('')
  const [savedToast, setSavedToast] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleSave = () => {
    saveMascotSettings(settings)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  const handleAddQuote = () => {
    if (!newQuote.trim()) return
    const updated = {
      ...settings,
      quotes: [...settings.quotes, newQuote.trim()],
    }
    setSettings(updated)
    setNewQuote('')
  }

  const handleDeleteQuote = (index: number) => {
    const updatedQuotes = settings.quotes.filter((_, i) => i !== index)
    setSettings({ ...settings, quotes: updatedQuotes })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `mascot-custom-${Date.now()}.${fileExt}`
      const filePath = `mascots/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('article-covers')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('article-covers').getPublicUrl(filePath)

      if (data?.publicUrl) {
        setSettings({
          ...settings,
          activeOutfit: 'custom',
          customImageUri: data.publicUrl,
        })
      }
    } catch (err: any) {
      console.error('Failed to upload custom mascot:', err.message || err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-blue uppercase font-bold mb-1">
            <Sparkles className="w-4 h-4 text-blue" />
            <span>Interactive Companion Studio</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy">
            Mascot & Wardrobe Studio
          </h1>
          <p className="text-xs text-navy/60 font-sans mt-1">
            Customize her poses, wardrobe outfits, loading screen style, and cheerful speech bubble quotes.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-navy hover:bg-blue text-white font-serif text-xs tracking-widest uppercase font-bold px-6 py-3 rounded shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER: Wardrobe & Pose Gallery */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Wardrobe & Pose Gallery */}
          <div className="bg-white rounded-lg border border-navy/10 shadow-xs p-6">
            <h2 className="font-serif text-lg font-bold text-navy mb-4 flex items-center gap-2 border-b border-navy/10 pb-3">
              <Shirt className="w-5 h-5 text-blue" />
              <span>Wardrobe & Pose Gallery</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              
              {/* Pose 1: Sitting with Coffee */}
              <div
                onClick={() => setSettings({ ...settings, loaderPose: 'sitting' })}
                className={`cursor-pointer rounded-lg border-2 p-3 transition-all flex flex-col items-center text-center ${
                  settings.loaderPose === 'sitting'
                    ? 'border-blue bg-blue/5 shadow-sm'
                    : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <div className="w-24 h-28 flex items-center justify-center mb-2">
                  <img src="/cartoon-sitting.png" alt="Sitting Pose" className="h-full object-contain" />
                </div>
                <span className="text-xs font-serif font-bold text-navy">Cozy Sitting</span>
                <span className="text-[10px] text-navy/50 font-mono mt-0.5">Holding Coffee ☕</span>
              </div>

              {/* Pose 2: Royal Blue Waving */}
              <div
                onClick={() => setSettings({ ...settings, loaderPose: 'waving' })}
                className={`cursor-pointer rounded-lg border-2 p-3 transition-all flex flex-col items-center text-center ${
                  settings.loaderPose === 'waving'
                    ? 'border-blue bg-blue/5 shadow-sm'
                    : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <div className="w-24 h-28 flex items-center justify-center mb-2">
                  <img src="/cartoon-blue.png" alt="Waving Outfit" className="h-full object-contain" />
                </div>
                <span className="text-xs font-serif font-bold text-navy">Royal Blue</span>
                <span className="text-[10px] text-navy/50 font-mono mt-0.5">Waving Hello 👋</span>
              </div>

              {/* Pose 3: Dancing & Cheering */}
              <div
                onClick={() => setSettings({ ...settings, loaderPose: 'dancing' })}
                className={`cursor-pointer rounded-lg border-2 p-3 transition-all flex flex-col items-center text-center ${
                  settings.loaderPose === 'dancing'
                    ? 'border-blue bg-blue/5 shadow-sm'
                    : 'border-navy/10 hover:border-navy/30'
                }`}
              >
                <div className="w-24 h-28 flex items-center justify-center mb-2">
                  <img src="/cartoon-dance.png" alt="Dancing Pose" className="h-full object-contain" />
                </div>
                <span className="text-xs font-serif font-bold text-navy">Dancing Joy</span>
                <span className="text-[10px] text-navy/50 font-mono mt-0.5">Arms Up High 💃</span>
              </div>

              {/* Pose 4: Walking Stepping */}
              <div className="rounded-lg border border-navy/10 p-3 flex flex-col items-center text-center bg-navy/5">
                <div className="w-24 h-28 flex items-center justify-center mb-2">
                  <img src="/cartoon-walk.png" alt="Walking Cycle" className="h-full object-contain" />
                </div>
                <span className="text-xs font-serif font-bold text-navy">Walking Stride</span>
                <span className="text-[10px] text-navy/50 font-mono mt-0.5">Leg Movement 🚶‍♀️</span>
              </div>

            </div>

            {/* Custom Avatar Upload */}
            <div className="pt-4 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold font-serif text-navy">Upload Custom Mascot Artwork</h4>
                <p className="text-[11px] text-navy/50">Upload a custom PNG illustration frame to display on the site.</p>
              </div>

              <label className="cursor-pointer bg-white border border-navy/20 hover:border-blue text-navy hover:text-blue px-4 py-2 rounded text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue" />
                <span>{uploading ? 'Uploading...' : 'Choose PNG File'}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Section 2: Speech Bubble Quotes Manager */}
          <div className="bg-white rounded-lg border border-navy/10 shadow-xs p-6">
            <h2 className="font-serif text-lg font-bold text-navy mb-4 flex items-center gap-2 border-b border-navy/10 pb-3">
              <MessageSquare className="w-5 h-5 text-blue" />
              <span>Speech Bubble Quotes ({settings.quotes.length})</span>
            </h2>

            {/* Add New Quote */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddQuote()}
                placeholder="Add a new cute quote or message (e.g. 'Enjoying your reading? ✨')"
                className="flex-1 bg-[#EEF4F8] border border-navy/15 rounded px-3 py-2 text-xs font-sans text-navy focus:outline-none focus:border-blue"
              />
              <button
                onClick={handleAddQuote}
                className="bg-blue hover:bg-navy text-white text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Active Quotes List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {settings.quotes.map((q, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded bg-[#EEF4F8]/60 border border-navy/10 text-xs font-serif text-navy"
                >
                  <span>"{q}"</span>
                  <button
                    onClick={() => handleDeleteQuote(index)}
                    className="text-navy/40 hover:text-red-500 p-1 transition-colors"
                    title="Delete quote"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Settings & Live Preview */}
        <div className="space-y-8">
          
          {/* Settings Card */}
          <div className="bg-white rounded-lg border border-navy/10 shadow-xs p-6 space-y-6">
            <h2 className="font-serif text-lg font-bold text-navy border-b border-navy/10 pb-3 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue" />
              <span>Companion Controls</span>
            </h2>

            {/* Toggle Enable */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold font-serif text-navy block">Enable Mascot Companion</span>
                <span className="text-[11px] text-navy/50 block">Show her around the website.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                className="w-5 h-5 accent-blue cursor-pointer"
              />
            </div>

            {/* Default Loading Screen Pose */}
            <div>
              <label className="text-xs font-bold font-serif text-navy block mb-2">
                Loading Screen Pose
              </label>
              <select
                value={settings.loaderPose}
                onChange={(e) => setSettings({ ...settings, loaderPose: e.target.value as any })}
                className="w-full bg-[#EEF4F8] border border-navy/15 rounded px-3 py-2 text-xs font-mono text-navy outline-none"
              >
                <option value="sitting">Sitting on Title Text (With Coffee ☕)</option>
                <option value="waving">Royal Blue Waving 👋</option>
                <option value="dancing">Dancing & Cheering 💃</option>
              </select>
            </div>

            {/* Movement Speed */}
            <div>
              <label className="text-xs font-bold font-serif text-navy block mb-2">
                Walking Speed Across Bottom
              </label>
              <select
                value={settings.movementSpeed}
                onChange={(e) => setSettings({ ...settings, movementSpeed: e.target.value as any })}
                className="w-full bg-[#EEF4F8] border border-navy/15 rounded px-3 py-2 text-xs font-mono text-navy outline-none"
              >
                <option value="slow">Slow & Cozy (24s)</option>
                <option value="normal">Normal Pace (18s)</option>
                <option value="fast">Brisk Walk (12s)</option>
              </select>
            </div>

          </div>

          {/* Live Preview Card */}
          <div className="bg-[#EEF4F8] rounded-lg border border-navy/15 p-6 flex flex-col items-center text-center relative overflow-hidden">
            <span className="text-[10px] font-mono tracking-widest text-blue uppercase font-bold mb-3">Live Wardrobe Preview</span>
            
            <div className="w-32 h-44 flex items-center justify-center my-2">
              <img
                src={
                  settings.loaderPose === 'dancing'
                    ? '/cartoon-dance.png'
                    : settings.loaderPose === 'waving'
                    ? '/cartoon-blue.png'
                    : '/cartoon-sitting.png'
                }
                alt="Wardrobe Preview"
                className="h-full object-contain filter drop-shadow-md animate-bounce"
              />
            </div>

            <div className="mt-2 bg-white px-3 py-1.5 rounded-full border border-blue/30 text-xs font-serif text-navy shadow-xs">
              "{settings.quotes[0] || 'Welcome!'}"
            </div>
          </div>

        </div>

      </div>

      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy text-white text-xs font-mono px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-blue">
          <Check className="w-4 h-4 text-blue" />
          <span>Mascot & Wardrobe Settings Saved Successfully!</span>
        </div>
      )}
    </div>
  )
}
