import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Droplets, Ruler, Wind, Leaf } from 'lucide-react';

const FEATURES = [
  {
    icon: <Droplets size={28} />,
    title: 'Premium Fabric',
    desc: 'Handpicked 280-400 GSM cotton. Every thread chosen for softness, structure, and longevity.',
    img: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
  },
  {
    icon: <Ruler size={28} />,
    title: 'Perfect Fit',
    desc: 'Engineered patterns tested across 500+ body types. From relaxed to tailored — confidence in every cut.',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
  },
  {
    icon: <Wind size={28} />,
    title: 'Breathable Materials',
    desc: 'Moisture-wicking technology woven into every piece. Stay cool, dry, and comfortable all day.',
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Sustainable Production',
    desc: 'Ethical factories, organic dyes, minimal waste. Fashion that respects the planet.',
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
  },
];

function FeatureBlock({ feature, index, isReversed }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 80px)',
        alignItems: 'center',
        direction: isReversed ? 'rtl' : 'ltr',
        padding: 'clamp(40px, 6vw, 80px) 0',
        transitionDelay: '0.1s',
      }}
    >
      {/* Image */}
      <div style={{
        direction: 'ltr',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        aspectRatio: '4/3',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <img
          src={feature.img}
          alt={feature.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 'var(--r-lg)',
          background: 'var(--c-accent-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--c-accent)',
        }}>
          {feature.icon}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(1.4rem, 1rem + 1.5vw, 2.2rem)',
          lineHeight: 1.1, letterSpacing: '-0.02em',
        }}>
          {feature.title}
        </h3>
        <p style={{
          fontSize: 'clamp(0.9rem, 0.8rem + 0.4vw, 1.05rem)',
          color: 'var(--c-text-muted)', lineHeight: 1.8, maxWidth: 440,
        }}>
          {feature.desc}
        </p>
        <div style={{ height: 2, width: 48, background: 'var(--c-accent)', borderRadius: 2, marginTop: '4px' }} />
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="showcase" className="section" style={{ background: 'var(--c-bg)' }}>
      <div className="container">
        <div ref={headerRef} className={`section-header reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="label">Why Insane</span>
          <h2>Crafted for Confidence</h2>
          <p>Every piece is designed with obsessive attention to fabric, fit, and finish.</p>
        </div>

        {FEATURES.map((f, i) => (
          <FeatureBlock key={f.title} feature={f} index={i} isReversed={i % 2 === 1} />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          #showcase .container > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}} />
    </section>
  );
}
