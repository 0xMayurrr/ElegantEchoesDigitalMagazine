import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ArticlesList from './ArticlesList';
import ArticleEditor from './ArticleEditor';
import PodcastsList from './PodcastsList';
import PodcastEditor from './PodcastEditor';
import CommentsList from './CommentsList';
import ProfileEditor from './ProfileEditor';
import MascotEditor from './MascotEditor';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/new" element={<ArticleEditor />} />
          <Route path="articles/:id/edit" element={<ArticleEditor />} />
          <Route path="podcasts" element={<PodcastsList />} />
          <Route path="podcasts/new" element={<PodcastEditor />} />
          <Route path="podcasts/:id/edit" element={<PodcastEditor />} />
          <Route path="comments" element={<CommentsList />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="mascot" element={<MascotEditor />} />
          <Route path="media" element={<div className="p-10 font-mono text-sm text-navy/60">Media Management (Coming Soon)</div>} />
          <Route path="settings" element={<ProfileEditor />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
