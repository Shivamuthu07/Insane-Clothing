import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Send, Phone } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ref, visible] = useScrollReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setEmail(''); setPhone(''); }, 3000);
    }
  };

  return (
    <section id="newsletter" className="section" style={{
      background: 'var(--c-text)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative gradient orbs */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={ref}
          className={`reveal ${visible ? 'visible' : ''}`}
          style={{
            maxWidth: 600,
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <span style={{
            display: 'inline-flex', padding: '6px 16px',
            borderRadius: 'var(--r-full)',
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37', fontSize: '0.72rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.14em',
          }}>
            Exclusive Access
          </span>

          <h2 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(1.8rem, 1.2rem + 2.5vw, 3rem)',
            color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em',
          }}>
            Stay Ahead of<br />Every Drop
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(0.9rem, 0.8rem + 0.3vw, 1.05rem)',
            lineHeight: 1.7, maxWidth: 440,
          }}>
            Be the first to know about new collections, exclusive drops, and insider-only offers.
          </p>

          {submitted ? (
            <div style={{
              padding: '20px 32px',
              background: 'rgba(34, 197, 94, 0.15)',
              borderRadius: 'var(--r-lg)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#22c55e',
              fontWeight: 600,
              fontSize: '0.92rem',
              animation: 'scaleIn 0.3s ease forwards',
            }}>
              ✓ You're in! Watch your inbox for exclusive drops.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: '12px',
              width: '100%', maxWidth: 440,
            }}>
              <div style={{
                display: 'flex', gap: '8px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 'var(--r-full)',
                padding: '6px 6px 6px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1, background: 'transparent', border: 'none',
                    color: '#fff', fontSize: '0.9rem', outline: 'none',
                    padding: '8px 0',
                  }}
                />
                <button type="submit" style={{
                  padding: '12px 24px', borderRadius: 'var(--r-full)',
                  background: '#D4AF37', color: '#fff',
                  fontWeight: 700, fontSize: '0.82rem',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c9a22e'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  Subscribe <Send size={14} />
                </button>
              </div>

              <div style={{
                display: 'flex', gap: '8px', alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 'var(--r-full)',
                padding: '6px 20px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Phone size={14} color="rgba(255,255,255,0.4)" />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    flex: 1, background: 'transparent', border: 'none',
                    color: '#fff', fontSize: '0.85rem', outline: 'none',
                    padding: '8px 0',
                  }}
                />
              </div>
            </form>
          )}

          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
