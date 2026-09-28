import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Database } from '../types/database';
import { FileEdit, Trash2, Plus } from 'lucide-react';

type Podcast = Database['public']['Tables']['podcasts']['Row'];

export default function PodcastsList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  async function fetchPodcasts() {
    const { data } = await supabase
      .from('podcasts')
      .select('*')
      .order('episode_number', { ascending: false });
    
    if (data) setPodcasts(data);
    setLoading(false);
  }

  async function deletePodcast(id: string) {
    if (confirm('Are you sure you want to delete this episode?')) {
      await supabase.from('podcasts').delete().eq('id', id);
      fetchPodcasts();
    }
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-navy font-bold mb-2">Podcasts</h1>
          <p className="text-navy/60 font-sans text-sm">Manage your audio episodes.</p>
        </div>
        <Link 
          to="/admin/podcasts/new" 
          className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wider uppercase hover:bg-primary transition-colors"
        >
          <Plus size={16} /> New Episode
        </Link>
      </div>

      <div className="bg-white border border-navy/10 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-navy/50 font-mono text-sm">Loading episodes...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EEF4F8] border-b border-navy/10">
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Episode</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Title</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Duration</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-navy/50 font-sans text-sm">
                    No podcasts found.
                  </td>
                </tr>
              )}
              {podcasts.map(podcast => (
                <tr key={podcast.id} className="border-b border-navy/5 hover:bg-[#EEF4F8]/30 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-xs text-navy/60 tracking-widest uppercase">EP {podcast.episode_number || '--'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-serif font-semibold text-navy text-base">{podcast.title}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm ${
                      podcast.status === 'published' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {podcast.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-navy/60 font-mono">
                    {podcast.duration || '--:--'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/podcasts/${podcast.id}/edit`}
                        className="p-2 text-navy/50 hover:text-blue hover:bg-[#EEF4F8] rounded-sm transition-colors"
                      >
                        <FileEdit size={16} />
                      </Link>
                      <button 
                        onClick={() => deletePodcast(podcast.id)}
                        className="p-2 text-navy/50 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
