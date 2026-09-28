import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Database } from '../types/database';
import { FileEdit, Trash2, Plus } from 'lucide-react';

type Article = Database['public']['Tables']['articles']['Row'];

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setArticles(data);
    setLoading(false);
  }

  async function deleteArticle(id: string) {
    if (confirm('Are you sure you want to delete this article?')) {
      await supabase.from('articles').delete().eq('id', id);
      fetchArticles();
    }
  }

  async function toggleStatus(article: Article) {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    const payload = newStatus === 'published' 
      ? { status: newStatus as 'published', published_at: new Date().toISOString() }
      : { status: newStatus as 'draft', published_at: null };
      
    await supabase.from('articles').update(payload).eq('id', article.id);
    fetchArticles();
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-navy font-bold mb-2">Articles</h1>
          <p className="text-navy/60 font-sans text-sm">Manage your editorial content.</p>
        </div>
        <Link 
          to="/admin/articles/new" 
          className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wider uppercase hover:bg-primary transition-colors"
        >
          <Plus size={16} /> New Article
        </Link>
      </div>

      <div className="bg-white border border-navy/10 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-navy/50 font-mono text-sm">Loading articles...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EEF4F8] border-b border-navy/10">
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Title</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Category</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Date</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-navy/50 font-sans text-sm">
                    No articles found.
                  </td>
                </tr>
              )}
              {articles.map(article => (
                <tr key={article.id} className="border-b border-navy/5 hover:bg-[#EEF4F8]/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-serif font-semibold text-navy text-base">{article.title}</p>
                    <p className="font-mono text-[10px] text-navy/40 mt-1">{article.slug}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-[#EEF4F8] text-primary text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-sm border border-navy/10">
                      {article.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => toggleStatus(article)}
                      className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm transition-colors ${
                        article.status === 'published' 
                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                          : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                      }`}
                    >
                      {article.status}
                    </button>
                  </td>
                  <td className="py-4 px-6 text-xs text-navy/60 font-sans">
                    {new Date(article.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/articles/${article.id}/edit`}
                        className="p-2 text-navy/50 hover:text-blue hover:bg-[#EEF4F8] rounded-sm transition-colors"
                      >
                        <FileEdit size={16} />
                      </Link>
                      <button 
                        onClick={() => deleteArticle(article.id)}
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
