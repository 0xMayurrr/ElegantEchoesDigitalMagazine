import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function PodcastEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [episodeNumber, setEpisodeNumber] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState<'draft'|'published'>('draft');
  
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState('');
  
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchPodcast(id);
    }
  }, [id, isEditing]);

  async function fetchPodcast(podcastId: string) {
    const { data } = await supabase.from('podcasts').select('*').eq('id', podcastId).single();
    if (data) {
      setEpisodeNumber(data.episode_number?.toString() || '');
      setTitle(data.title);
      setSlug(data.slug);
      setDescription(data.description || '');
      setDuration(data.duration || '');
      setStatus(data.status as 'draft'|'published');
      setCoverUrl(data.cover_image || '');
      setAudioUrl(data.audio_url || '');
    }
  }

  useEffect(() => {
    if (!isEditing && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isEditing]);

  const uploadFile = async (bucket: string, file: File | null, existingUrl: string): Promise<string> => {
    if (!file) return existingUrl;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent, saveStatus: 'draft' | 'published') => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalCoverUrl = await uploadFile('podcast-artwork', coverFile, coverUrl);
      const finalAudioUrl = await uploadFile('podcast-audio', audioFile, audioUrl);

      const payload = {
        episode_number: episodeNumber ? parseInt(episodeNumber) : null,
        title,
        slug,
        description,
        duration,
        status: saveStatus,
        cover_image: finalCoverUrl,
        audio_url: finalAudioUrl,
        published_at: saveStatus === 'published' ? new Date().toISOString() : null,
      };

      if (isEditing && id) {
        await supabase.from('podcasts').update(payload).eq('id', id);
      } else {
        await supabase.from('podcasts').insert([payload]);
      }
      navigate('/admin/podcasts');
    } catch (err) {
      console.error(err);
      alert('Error saving podcast episode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-navy/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl text-navy font-bold mb-2">{isEditing ? 'Edit Episode' : 'New Episode'}</h1>
          <p className="text-navy/60 font-sans text-sm">Upload your audio and set artwork.</p>
        </div>
        <div className="flex gap-4">
          <button 
            disabled={loading}
            onClick={(e) => handleSave(e, 'draft')}
            className="px-5 py-2.5 bg-white border border-navy/20 text-navy text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-[#EEF4F8] transition-colors"
          >
            Save Draft
          </button>
          <button 
            disabled={loading}
            onClick={(e) => handleSave(e, 'published')}
            className="px-5 py-2.5 bg-navy text-white text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-primary transition-colors"
          >
            {loading ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Episode Number</label>
            <input type="number" value={episodeNumber} onChange={e => setEpisodeNumber(e.target.value)} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm" />
          </div>
          <div className="col-span-9">
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-serif" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-[#EEF4F8] border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-mono text-navy/70" required />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Duration (MM:SS)</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-mono" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-serif resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 border border-dashed border-navy/20 rounded-sm bg-[#EEF4F8]/50">
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-4">Cover Artwork</label>
            <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} className="w-full text-xs font-mono text-navy/70 file:mr-4 file:py-2 file:px-4 file:border file:border-navy/20 file:rounded-sm file:text-xs file:font-bold file:uppercase file:bg-white file:text-navy hover:file:bg-[#EEF4F8]" />
            {coverUrl && !coverFile && <img src={coverUrl} alt="Cover" className="mt-4 w-32 h-32 object-cover border border-navy/10 shadow-sm" />}
          </div>

          <div className="p-5 border border-dashed border-navy/20 rounded-sm bg-[#EEF4F8]/50">
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-4">Audio File</label>
            <input type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files?.[0] || null)} className="w-full text-xs font-mono text-navy/70 file:mr-4 file:py-2 file:px-4 file:border file:border-navy/20 file:rounded-sm file:text-xs file:font-bold file:uppercase file:bg-white file:text-navy hover:file:bg-[#EEF4F8]" />
            {audioUrl && !audioFile && (
              <div className="mt-4 text-xs font-mono text-navy/50 break-all bg-white p-2 border border-navy/10 rounded-sm">
                Current File: {audioUrl}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
