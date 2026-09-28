import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [status, setStatus] = useState<'draft'|'published'>('draft');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      fetchArticle(id);
    }
  }, [id, isEditing]);

  async function fetchArticle(articleId: string) {
    const { data } = await supabase.from('articles').select('*').eq('id', articleId).single();
    if (data) {
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || '');
      setContent(data.content || '');
      setCategory(data.category || '');
      setReadingTime(data.readingTime || '');
      setStatus(data.status as 'draft'|'published');
      setCoverImageUrl(data.cover_image || '');
    }
  }

  // Auto-generate slug from title if not editing
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isEditing]);

  const uploadImage = async (): Promise<string> => {
    if (!coverImageFile) return coverImageUrl;
    const fileExt = coverImageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage.from('article-images').upload(filePath, coverImageFile);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from('article-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent, saveStatus: 'draft' | 'published') => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalImageUrl = await uploadImage();
      const payload = {
        title,
        slug,
        excerpt,
        content,
        category,
        reading_time: readingTime,
        status: saveStatus,
        cover_image: finalImageUrl,
        published_at: saveStatus === 'published' ? new Date().toISOString() : null,
      };

      if (isEditing && id) {
        await supabase.from('articles').update(payload).eq('id', id);
      } else {
        await supabase.from('articles').insert([payload]);
      }
      navigate('/admin/articles');
    } catch (err) {
      console.error(err);
      alert('Error saving article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-navy/10 pb-6">
        <div>
          <h1 className="font-serif text-3xl text-navy font-bold mb-2">{isEditing ? 'Edit Article' : 'New Article'}</h1>
          <p className="text-navy/60 font-sans text-sm">Write your essay or reflection.</p>
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
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-serif" required />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-[#EEF4F8] border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-mono text-navy/70" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Reading Time</label>
            <input type="text" placeholder="e.g. 5 min read" value={readingTime} onChange={e => setReadingTime(e.target.value)} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Excerpt</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} className="w-full bg-white border border-navy/15 p-3 text-sm outline-none focus:border-blue rounded-sm font-serif resize-none" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={e => setCoverImageFile(e.target.files?.[0] || null)} className="w-full bg-white border border-navy/15 p-2 text-sm outline-none focus:border-blue rounded-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#EEF4F8] file:text-navy hover:file:bg-[#EEF4F8]/70" />
          {coverImageUrl && !coverImageFile && <img src={coverImageUrl} alt="Current Cover" className="mt-4 h-32 object-cover border border-navy/10 rounded-sm" />}
        </div>

        <div className="mb-20">
          <label className="block text-[10px] font-bold text-navy/70 uppercase tracking-widest mb-2">Content</label>
          <div className="bg-white">
            <ReactQuill theme="snow" value={content} onChange={setContent} className="h-96 font-serif" />
          </div>
        </div>
      </form>
    </div>
  );
}
