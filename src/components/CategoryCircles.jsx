import React from 'react';

const CATEGORIES = [
  {
    label: 'New Arrivals',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80',
    alt: 'New arrivals fashion',
  },
  {
    label: 'T-Shirts',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80',
    alt: 'Oversized T-Shirts',
  },
  {
    label: 'Shirts',
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80',
    alt: 'Men\'s Shirts',
  },
  {
    label: 'Hoodies',
    img: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=300&q=80',
    alt: 'Hoodies and sweatshirts',
  },
  {
    label: 'Cargos',
    img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&q=80',
    alt: 'Cargo pants and bottoms',
  },
  {
    label: 'Accessories',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80',
    alt: 'Caps and accessories',
  },
];

export default function CategoryCircles({ onSelect, activeCategory }) {
  return (
    <section id="collections" style={{ padding: '48px 0 32px' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          gap: 'clamp(12px, 3vw, 32px)',
          justifyContent: 'center',
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                id={`cat-circle-${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelect(cat.label)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  flexShrink: 0,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform var(--t-spring)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: 'clamp(64px, 10vw, 88px)',
                  height: 'clamp(64px, 10vw, 88px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: isActive ? '3px solid var(--c-accent)' : '3px solid var(--c-border)',
                  transition: 'border-color var(--t-normal)',
                  boxShadow: isActive ? '0 0 0 4px var(--c-accent-light)' : 'none',
                }}>
                  <img
                    src={cat.img}
                    alt={cat.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  />
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--c-accent)' : 'var(--c-text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `#collections div::-webkit-scrollbar { display: none; }` }} />
    </section>
  );
}
