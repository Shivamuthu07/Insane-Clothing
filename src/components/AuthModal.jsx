import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 1800);
  };

  return (
    <div
      className="overlay-bg"
      onClick={onClose}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 700 }}
    >
      <div
        id="auth-modal"
        className="modal-panel"
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 440, padding: '44px 40px', borderRadius: 'var(--r-xl)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-12px' }}>
          <button className="btn-ghost" onClick={onClose} aria-label="Close" style={{ borderRadius: '50%', padding: '8px' }}>
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--c-accent-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem',
            }}>🎉</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.5rem' }}>
              {mode === 'login' ? 'Welcome Back!' : 'Account Created!'}
            </h2>
            <p style={{ color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              {mode === 'login' ? 'You\'re now signed in.' : 'Start exploring our latest drops!'}
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: '1.6rem', letterSpacing: '-0.03em', marginBottom: '8px',
              }}>
                {mode === 'login' ? 'Welcome Back' : 'Join the Crew'}
              </h2>
              <p style={{ color: 'var(--c-text-muted)', fontSize: '0.88rem' }}>
                {mode === 'login'
                  ? 'Sign in to access your orders & wishlist.'
                  : 'Create an account for exclusive drops & offers.'}
              </p>
            </div>

            {/* Google Login */}
            <button
              type="button"
              style={{
                width: '100%', padding: '13px', marginBottom: '20px',
                borderRadius: 'var(--r-full)',
                border: '1.5px solid var(--c-border)',
                background: 'var(--c-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                fontWeight: 600, fontSize: '0.88rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--c-surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--c-surface)'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div className="divider" style={{ flex: 1 }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--c-text-light)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>or</span>
              <div className="divider" style={{ flex: 1 }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {mode === 'register' && (
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-light)', pointerEvents: 'none' }} />
                  <input
                    className="input"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{ paddingLeft: '44px', borderRadius: 'var(--r-full)' }}
                  />
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-light)', pointerEvents: 'none' }} />
                <input
                  className="input"
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ paddingLeft: '44px', borderRadius: 'var(--r-full)' }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-light)', pointerEvents: 'none' }} />
                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ paddingLeft: '44px', paddingRight: '44px', borderRadius: 'var(--r-full)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--c-text-light)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {mode === 'login' && (
                <button type="button" style={{ alignSelf: 'flex-end', fontSize: '0.78rem', color: 'var(--c-accent)', fontWeight: 600 }}>
                  Forgot Password?
                </button>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '14px', marginTop: '4px', fontWeight: 700, letterSpacing: '0.04em', borderRadius: 'var(--r-full)' }}
              >
                {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--c-text-muted)', marginTop: '24px' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}
                style={{ color: 'var(--c-accent)', fontWeight: 700, fontSize: '0.85rem' }}
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
