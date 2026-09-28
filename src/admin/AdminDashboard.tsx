import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { FileText, Mic, MessageSquare, Activity } from 'lucide-react';

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalPodcasts: number;
  pendingComments: number;
  totalEchoes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalPodcasts: 0,
    pendingComments: 0,
    totalEchoes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: totalA },
          { count: pubA },
          { count: draftA },
          { count: totalP },
          { count: pendingC },
          { count: totalE }
        ] = await Promise.all([
          supabase.from('articles').select('*', { count: 'exact', head: true }),
          supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
          supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
          supabase.from('podcasts').select('*', { count: 'exact', head: true }),
          supabase.from('comments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('echoes').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          totalArticles: totalA || 0,
          publishedArticles: pubA || 0,
          draftArticles: draftA || 0,
          totalPodcasts: totalP || 0,
          pendingComments: pendingC || 0,
          totalEchoes: totalE || 0,
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-navy font-bold mb-2">Welcome back.</h1>
        <p className="text-navy/60 font-sans text-sm">Here is the overview of your publication.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Articles" value={stats.totalArticles} icon={FileText} loading={loading} />
        <StatCard title="Published Articles" value={stats.publishedArticles} icon={FileText} loading={loading} />
        <StatCard title="Drafts" value={stats.draftArticles} icon={FileText} loading={loading} />
        <StatCard title="Podcasts" value={stats.totalPodcasts} icon={Mic} loading={loading} />
        <StatCard title="Pending Comments" value={stats.pendingComments} icon={MessageSquare} loading={loading} />
        <StatCard title="Total Echoes" value={stats.totalEchoes} icon={Activity} loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Quick Actions */}
        <div className="bg-white border border-navy/10 rounded-sm p-6 shadow-sm">
          <h2 className="text-sm font-bold text-navy uppercase tracking-wider mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link to="/admin/articles/new" className="px-4 py-3 bg-[#EEF4F8] hover:bg-[#EEF4F8]/70 border border-navy/10 rounded-sm text-sm font-medium text-navy transition-colors flex items-center justify-between">
              Write New Article <span className="text-blue">→</span>
            </Link>
            <Link to="/admin/podcasts/new" className="px-4 py-3 bg-[#EEF4F8] hover:bg-[#EEF4F8]/70 border border-navy/10 rounded-sm text-sm font-medium text-navy transition-colors flex items-center justify-between">
              Publish New Episode <span className="text-blue">→</span>
            </Link>
            <Link to="/admin/comments" className="px-4 py-3 bg-[#EEF4F8] hover:bg-[#EEF4F8]/70 border border-navy/10 rounded-sm text-sm font-medium text-navy transition-colors flex items-center justify-between">
              Moderate Comments ({stats.pendingComments}) <span className="text-blue">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, loading }: { title: string, value: number, icon: any, loading: boolean }) {
  return (
    <div className="bg-white p-6 border border-navy/10 rounded-sm shadow-sm flex items-start justify-between">
      <div>
        <h3 className="text-xs font-bold text-navy/60 uppercase tracking-wider mb-2">{title}</h3>
        <div className="text-3xl font-serif text-navy">
          {loading ? '...' : value}
        </div>
      </div>
      <div className="p-3 bg-[#EEF4F8] rounded-sm text-primary">
        <Icon size={20} />
      </div>
    </div>
  );
}
