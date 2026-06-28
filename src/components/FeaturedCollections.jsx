import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { COLLECTIONS } from '../data/products';
import { ArrowRight } from 'lucide-react';

function CollectionCard({ col, index, onSelect }) {
  const [ref, visible] = useScrollReveal();
  const isLarge = index === 0 || index === 3;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{
        transitionDelay: `${index * 0.1}s`,
        gridColumn: isLarge ? 'span 2' : 'span 1',
        position: 'relative',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        minHeight: isLarge ? 420 : 340,
      }}
      onClick={() => onSelect(col.name)}
    >
      <div className="img-zoom-wrap" style={{ position: 'absolute', inset: 0 }}>
        <img
          src={col.img}
          alt={col.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(24px, 4vw, 40px)',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: isLarge ? 'clamp(1.6rem, 1rem + 2vw, 2.4rem)' : 'clamp(1.2rem, 0.8rem + 1.5vw, 1.8rem)',
          color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>
          {col.name}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.5, maxWidth: 320, marginBottom: '16px' }}>
          {col.description}
        </p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#D4AF37', fontSize: '0.82rem', fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          Explore Collection <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}

export default function FeaturedCollections({ onCategorySelect }) {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="collections" className="section" style={{ background: 'var(--c-bg)' }}>
      <div className="container">
        <div ref={headerRef} className={`section-header reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="label">Curated For You</span>
          <h2>Featured Collections</h2>
          <p>Discover our handpicked collections designed for every mood, moment, and style.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {COLLECTIONS.map((col, i) => (
            <CollectionCard key={col.id} col={col} index={i} onSelect={onCategorySelect} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          #collections .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #collections .container > div:last-child > div {
            grid-column: span 1 !important;
            min-height: 280px !important;
          }
        }
      `}} />
    </section>
  );
}
