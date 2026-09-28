import { useState } from 'react'
import { getStoredProfile, saveStoredProfile, type AuthorProfile } from '../lib/profile'
import { supabase } from '../lib/supabase'
import { User, Save, Upload, CheckCircle2 } from 'lucide-react'

export default function ProfileEditor() {
  const [profile, setProfile] = useState<AuthorProfile>(getStoredProfile)
  const [saving, setSaving] = useState(false)
  const [savedToast, setSavedToast] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleChange = (field: keyof AuthorProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `author-${Date.now()}.${fileExt}`
      const filePath = `profile/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('article-covers')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('article-covers').getPublicUrl(filePath)
      handleChange('imageUrl', data.publicUrl)
    } catch (err: any) {
      console.error('Error uploading image:', err)
      alert(err.message || 'Error uploading profile image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    saveStoredProfile(profile)
    setSaving(false)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-navy/15">
        <div>
          <div className="flex items-center gap-2 text-blue text-xs font-mono font-bold uppercase mb-1">
            <User size={16} />
            <span>AUTHOR & PUBLICATION PROFILE</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy">Edit Author Profile (About Her)</h1>
          <p className="text-xs text-navy/60 font-sans mt-1">
            Update author name, bio, portrait photo, quotes, and social links across the website.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue hover:bg-primary text-white text-xs font-mono font-bold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      {savedToast && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Author profile updated successfully! Changes reflect on the About section & page.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Image & Basic Info Card */}
        <div className="bg-white border border-navy/15 rounded-sm p-6 shadow-2xs space-y-6">
          <h2 className="font-serif text-lg font-bold text-navy border-b border-navy/10 pb-3">
            Author Details & Portrait
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Preview & Upload */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-40 h-48 overflow-hidden rounded-xs border border-navy/20 bg-cream mb-3 shadow-2xs relative">
                <img
                  src={profile.imageUrl || '/rathu.png'}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = '/rathu.png'
                  }}
                />
              </div>

              <label className="bg-cream hover:bg-light-blue text-navy text-xs font-mono font-bold px-3 py-1.5 rounded border border-navy/20 cursor-pointer flex items-center gap-1.5 transition-colors">
                <Upload size={14} />
                <span>{uploadingImage ? 'Uploading...' : 'Upload New Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
              <span className="text-[10px] text-navy/40 font-mono mt-1">Or enter image URL below</span>
            </div>

            {/* Inputs */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Elena Marín"
                  className="w-full bg-cream border border-navy/20 px-3.5 py-2 text-sm text-navy outline-none focus:border-blue rounded-xs font-sans font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                  Title / Role
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Writer, podcaster, and editor"
                  className="w-full bg-cream border border-navy/20 px-3.5 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-sans"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                  Portrait Image URL
                </label>
                <input
                  type="text"
                  value={profile.imageUrl}
                  onChange={(e) => handleChange('imageUrl', e.target.value)}
                  placeholder="/rathu.png or https://..."
                  className="w-full bg-cream border border-navy/20 px-3.5 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                  Location / Base
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Lisbon, Portugal"
                  className="w-full bg-cream border border-navy/20 px-3.5 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-sans"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Quote Card */}
        <div className="bg-white border border-navy/15 rounded-sm p-6 shadow-2xs space-y-6">
          <h2 className="font-serif text-lg font-bold text-navy border-b border-navy/10 pb-3">
            Bio Paragraphs & Personal Quote
          </h2>

          <div>
            <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
              Bio Paragraph 1 (Homepage & Main About)
            </label>
            <textarea
              rows={3}
              value={profile.bio1}
              onChange={(e) => handleChange('bio1', e.target.value)}
              className="w-full bg-cream border border-navy/20 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-blue rounded-xs font-sans leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
              Bio Paragraph 2 (Podcast & Secondary Focus)
            </label>
            <textarea
              rows={3}
              value={profile.bio2}
              onChange={(e) => handleChange('bio2', e.target.value)}
              className="w-full bg-cream border border-navy/20 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-blue rounded-xs font-sans leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
              Personal Featured Quote
            </label>
            <textarea
              rows={2}
              value={profile.quote}
              onChange={(e) => handleChange('quote', e.target.value)}
              placeholder='"I write to find out what I think..."'
              className="w-full bg-cream border border-navy/20 px-3.5 py-2.5 text-xs text-navy outline-none focus:border-blue rounded-xs font-serif italic"
            />
          </div>
        </div>

        {/* Contact & Social Links Card */}
        <div className="bg-white border border-navy/15 rounded-sm p-6 shadow-2xs space-y-6">
          <h2 className="font-serif text-lg font-bold text-navy border-b border-navy/10 pb-3">
            Contact Email & Social Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                Direct Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="elena@elegantechoes.com"
                className="w-full bg-cream border border-navy/20 px-3 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                Twitter / X URL
              </label>
              <input
                type="text"
                value={profile.twitterUrl}
                onChange={(e) => handleChange('twitterUrl', e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full bg-cream border border-navy/20 px-3 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold text-navy uppercase block mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={profile.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full bg-cream border border-navy/20 px-3 py-2 text-xs text-navy outline-none focus:border-blue rounded-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue hover:bg-primary text-white text-xs font-mono font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Author Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
