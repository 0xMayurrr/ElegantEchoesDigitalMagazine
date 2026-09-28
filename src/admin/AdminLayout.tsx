import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Mic, 
  MessageSquare, 
  User,
  Sparkles,
  ImageIcon,
  Settings,
  LogOut
} from 'lucide-react';

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-[#EEF4F8] flex items-center justify-center font-mono text-sm text-navy/50">Loading Admin...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Articles', path: '/admin/articles', icon: FileText },
    { name: 'Podcasts', path: '/admin/podcasts', icon: Mic },
    { name: 'Comments', path: '/admin/comments', icon: MessageSquare },
    { name: 'About Her (Profile)', path: '/admin/profile', icon: User },
    { name: 'Mascot & Wardrobe', path: '/admin/mascot', icon: Sparkles },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#EEF4F8]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-navy/10 flex flex-col shadow-xs">
        <div className="p-6 border-b border-navy/10">
          <Link to="/admin" className="font-serif text-lg font-bold text-navy tracking-widest uppercase">
            Elegant Echoes
          </Link>
          <div className="text-[10px] font-mono text-navy/50 tracking-widest uppercase mt-1">
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xs text-xs font-mono tracking-wide transition-colors ${
                  isActive 
                    ? 'bg-[#EEF4F8] text-blue font-bold border-l-2 border-blue' 
                    : 'text-navy/70 hover:bg-[#EEF4F8]/60 hover:text-navy'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-blue' : 'opacity-70'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy/10">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xs text-xs font-mono font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#EEF4F8]">
        <Outlet />
      </main>
    </div>
  );
}
