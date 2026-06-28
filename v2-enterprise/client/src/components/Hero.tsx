'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SLIDES = [
  {
    id: 1,
    tag: 'The Insane Look',
    headline: 'Elevated\nStreetwear',
    sub: 'Effortless confidence for every occasion.',
    cta: 'Shop The Look',
    cta2: 'Explore Collections',
    category: 'Shirts',
    img: '/showcase-model.png',
    imgAlt: 'Model wearing a checkered shirt',
    style: { filter: 'brightness(0.9) contrast(1.1) saturate(0.8) sepia(0.1)' }
  },
  {
    id: 2,
    tag: 'Night Drive',
    headline: 'Modern\nClassics',
    sub: 'Statement pieces that command attention, day or night.',
    cta: 'Shop The Look',
    cta2: 'Explore Collections',
    category: 'New Arrivals',
    img: '/showcase-slide-2.png',
    imgAlt: 'Two models posing by a car at night',
  },
  {
    id: 3,
    tag: 'Best Sellers',
    headline: 'Oversized\nObsession',
    sub: 'Drop-shoulder tees and hoodies crafted for the streets.',
    cta: 'Shop T-Shirts',
    cta2: 'All Products',
    category: 'T-Shirts',
    img: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80',
    imgAlt: 'Model wearing oversized streetwear',
  },
  {
    id: 4,
    tag: 'New Drop',
    headline: 'The Linen\nEdit',
    sub: 'Breathable luxury for sun-soaked days and warm evenings.',
    cta: 'Shop Linen',
    cta2: 'View Lookbook',
    category: 'Shirts',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80',
    imgAlt: 'Linen clothing collection',
  },
];

export default function Hero() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slide = SLIDES[current];

  return (
    <section
      id="hero"
      aria-label="Featured collections"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        maxHeight: 1000,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1)' : 'scale(1.1)',
            transition: 'opacity 1s ease, transform 8s ease',
          }}
        >
          <img
            src={s.img}
            alt={s.imgAlt}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center 30%',
              ...(s.style || {})
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Dark overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 40px)',
        width: '100%',
      }}>
        <div
          key={current}
          style={{
            maxWidth: 680,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Tag */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            color: '#D4AF37',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            width: 'fit-content',
            backdropFilter: 'blur(8px)',
          }}>
            {slide.tag}
          </span>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 2rem + 5vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#fff',
              whiteSpace: 'pre-line',
            }}
          >
            {slide.headline}
          </h1>

          {/* Subheadline */}
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(0.95rem, 0.8rem + 0.5vw, 1.15rem)',
            lineHeight: 1.7,
            maxWidth: 480,
          }}>
            {slide.sub}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
            <button
              onClick={() => router.push(`/shop?category=${slide.category}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#fff',
                color: '#111',
                padding: '16px 32px',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#111';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {slide.cta} <ArrowRight size={16} />
            </button>
            <button
              onClick={() => router.push('/shop')}
              style={{ 
                padding: '16px 32px', fontSize: '0.9rem', 
                background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px', cursor: 'pointer', backdropFilter: 'blur(4px)',
                transition: 'all 0.2s ease', fontWeight: 700
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            >
              {slide.cta2}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div style={{
        position: 'absolute', bottom: 48, right: 'clamp(20px, 4vw, 40px)', zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '16px',
      }} className="hidden md:flex">
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Slide indicators */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 32 : 8,
                height: 3,
                borderRadius: '9999px',
                background: i === current ? '#D4AF37' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none', cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }} className="hidden md:flex">
        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500 }}>
          Scroll to explore
        </span>
        <div style={{
          width: 1, height: 40, position: 'relative', overflow: 'hidden',
          background: 'rgba(255,255,255,0.15)', borderRadius: 2,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '50%',
            background: 'rgba(255,255,255,0.6)', borderRadius: 2,
            animation: 'scrollDown 2s ease infinite',
          }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` }} />
    </section>
  );
}
