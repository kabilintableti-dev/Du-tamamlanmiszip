import React, { useState, useEffect } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { verifyAdminPassword } from '@/lib/mediaApi';

const SESSION_KEY = 'eskiz_admin_password';

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) {
      setChecking(false);
      return;
    }
    verifyAdminPassword(stored).then((ok) => {
      setUnlocked(ok);
      setChecking(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const ok = await verifyAdminPassword(password);
    setSubmitting(false);
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, password);
      setUnlocked(true);
    } else {
      setError('Şifre yanlış.');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-eskiz-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-eskiz-gold animate-spin" />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-eskiz-dark flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] border border-eskiz-gold/20 rounded-lg p-8 w-full max-w-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-eskiz-gold w-6 h-6" />
            <h1 className="text-xl font-serif text-eskiz-light">Yönetici Girişi</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full bg-black/30 border border-eskiz-light/20 rounded px-4 py-3 text-eskiz-light mb-3 focus:outline-none focus:border-eskiz-gold"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-eskiz-gold text-eskiz-dark font-bold py-3 rounded hover:bg-eskiz-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
