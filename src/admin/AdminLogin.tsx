import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4F8] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-navy/15 p-8 shadow-sm rounded-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-navy tracking-widest uppercase mb-2">
            Elegant Echoes
          </h1>
          <p className="font-mono text-xs tracking-[0.2em] text-navy/50 uppercase">
            Admin Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="username"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#EEF4F8] border border-navy/20 px-4 py-2.5 text-sm text-navy outline-none focus:border-blue transition-colors rounded-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy/70 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#EEF4F8] border border-navy/20 px-4 py-2.5 text-sm text-navy outline-none focus:border-blue transition-colors rounded-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-primary text-white text-sm font-semibold tracking-widest uppercase py-3 transition-colors mt-4 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
