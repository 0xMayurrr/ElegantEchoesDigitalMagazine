import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

type Comment = Database['public']['Tables']['comments']['Row'] & {
  articles: { title: string } | null;
};

export default function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*, articles(title)')
      .order('created_at', { ascending: false });
    
    if (data) setComments(data as any);
    setLoading(false);
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    await supabase.from('comments').update({ status }).eq('id', id);
    fetchComments();
  }

  async function deleteComment(id: string) {
    if (confirm('Are you sure you want to delete this comment forever?')) {
      await supabase.from('comments').delete().eq('id', id);
      fetchComments();
    }
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-navy font-bold mb-2">Comments</h1>
        <p className="text-navy/60 font-sans text-sm">Moderate discussions.</p>
      </div>

      <div className="bg-white border border-navy/10 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-navy/50 font-mono text-sm">Loading comments...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EEF4F8] border-b border-navy/10">
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest w-64">Commenter</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest">Comment</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest w-32">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-navy/60 uppercase tracking-widest text-right w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-navy/50 font-sans text-sm">
                    No comments found.
                  </td>
                </tr>
              )}
              {comments.map(comment => (
                <tr key={comment.id} className="border-b border-navy/5 hover:bg-[#EEF4F8]/30 transition-colors">
                  <td className="py-4 px-6 align-top">
                    <p className="font-bold text-navy text-sm">{comment.name}</p>
                    <p className="text-xs text-navy/60">{comment.email || 'No email'}</p>
                    <p className="font-mono text-[9px] text-navy/40 uppercase tracking-widest mt-2">{new Date(comment.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <p className="text-sm text-navy/80 font-serif leading-relaxed">{comment.content}</p>
                    {comment.articles && (
                      <p className="text-[10px] text-navy/50 font-mono mt-3 uppercase tracking-widest bg-[#EEF4F8] inline-block px-2 py-1 rounded-sm border border-navy/5">
                        On: {comment.articles.title}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6 align-top">
                    <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm ${
                      comment.status === 'approved' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : comment.status === 'rejected'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {comment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 align-top">
                    <div className="flex items-center justify-end gap-1">
                      {comment.status !== 'approved' && (
                        <button 
                          onClick={() => updateStatus(comment.id, 'approved')}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-sm transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {comment.status !== 'rejected' && (
                        <button 
                          onClick={() => updateStatus(comment.id, 'rejected')}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-sm transition-colors"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      <div className="w-px h-4 bg-navy/10 mx-1"></div>
                      <button 
                        onClick={() => deleteComment(comment.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete"
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
