import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { ExternalLink } from 'lucide-react';

const IconInstagram = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80', tag: 'Oversized Tee', user: '@arjun.style' },
  { img: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&q=80', tag: 'Street Look', user: '@priya.drip' },
  { img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', tag: 'Resort Shirt', user: '@dev.fits' },
  { img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80', tag: 'Denim Jacket', user: '@sneha.wear' },
  { img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80', tag: 'Graphic Hoodie', user: '@rohan.ootd' },
  { img: 'https://images.unsplash.com/photo-1602810319250-a663f0af2f75?w=400&q=80', tag: 'Linen Shirt', user: '@kavya.insane' },
  { img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80', tag: 'Acid Wash', user: '@vikram.style' },
  { img: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=80', tag: 'Bomber Jacket', user: '@meera.fits' },
];

function GalleryItem({ item, index }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        aspectRatio: '1',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.img}
        alt={item.tag}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}
        loading="lazy"
      />
      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '8px',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <IconInstagram size={24} />
        <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>{item.tag}</p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>{item.user}</p>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id="social" className="section" style={{ background: 'var(--c-bg-warm)' }}>
      <div className="container">
        <div ref={headerRef} className={`section-header reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="label">Community</span>
          <h2>As Seen on You</h2>
          <p>Tag @insaneclothing to get featured. Real people, real style.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}>
          {GALLERY.map((item, i) => (
            <GalleryItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href="https://www.instagram.com/insane_clothing.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{
              display: 'inline-flex', gap: '8px',
              padding: '12px 28px', borderRadius: 'var(--r-full)',
            }}
          >
            <IconInstagram size={16} /> Follow @insaneclothing <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          #social .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}} />
    </section>
  );
}
