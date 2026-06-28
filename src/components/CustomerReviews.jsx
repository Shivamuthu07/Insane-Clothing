import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Star } from 'lucide-react';
import { REVIEWS, AGGREGATE_STATS } from '../data/reviews';

function ReviewCard({ review, index }) {
  return (
    <div
      style={{
        background: 'var(--c-surface)',
        borderRadius: 'var(--r-lg)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '1px solid var(--c-border-light)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        minWidth: 300,
        flexShrink: 0,
        scrollSnapAlign: 'start',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'var(--c-surface-2)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '0.82rem', color: 'var(--c-text-muted)',
          fontFamily: 'var(--font-heading)',
        }}>
          {review.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{review.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < review.rating ? '#f59e0b' : 'none'} color={i < review.rating ? '#f59e0b' : 'var(--c-border)'} />
              ))}
            </div>
            {review.verified && (
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--c-success)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ✓ Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <p style={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.3 }}>{review.title}</p>

      {/* Text */}
      <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', lineHeight: 1.7 }}>
        {review.text}
      </p>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div style={{ display: 'flex', gap: '8px' }}>
          {review.images.map((img, i) => (
            <div key={i} style={{
              width: 64, height: 64, borderRadius: 'var(--r-sm)',
              overflow: 'hidden', border: '1px solid var(--c-border)',
            }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <p style={{ fontSize: '0.72rem', color: 'var(--c-text-light)' }}>
        {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        {review.helpful > 0 && ` · ${review.helpful} found helpful`}
      </p>
    </div>
  );
}

export default function CustomerReviews() {
  const [headerRef, headerVisible] = useScrollReveal();
  const { totalReviews, averageRating, ratingBreakdown } = AGGREGATE_STATS;
  const maxCount = Math.max(...Object.values(ratingBreakdown));

  return (
    <section id="reviews" className="section" style={{ background: 'var(--c-bg)' }}>
      <div className="container">
        <div ref={headerRef} className={`section-header reveal ${headerVisible ? 'visible' : ''}`}>
          <span className="label">Social Proof</span>
          <h2>Loved by Thousands</h2>
          <p>Real reviews from real customers. No filters, no fakes.</p>
        </div>

        {/* Aggregate Stats */}
        <div style={{
          display: 'flex', gap: '48px', justifyContent: 'center', alignItems: 'center',
          marginBottom: '48px', flexWrap: 'wrap',
        }}>
          {/* Average Rating */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '3.5rem', lineHeight: 1, letterSpacing: '-0.04em' }}>
              {averageRating}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', margin: '8px 0' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.round(averageRating) ? '#f59e0b' : 'none'} color={i < Math.round(averageRating) ? '#f59e0b' : 'var(--c-border)'} />
              ))}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
              {totalReviews.toLocaleString()} reviews
            </p>
          </div>

          {/* Rating breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 220 }}>
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, width: 16, textAlign: 'right' }}>{star}</span>
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                <div style={{
                  flex: 1, height: 6, background: 'var(--c-surface-2)',
                  borderRadius: 'var(--r-full)', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', borderRadius: 'var(--r-full)',
                    background: star >= 4 ? '#f59e0b' : star === 3 ? '#fbbf24' : '#ef4444',
                    width: `${(ratingBreakdown[star] / maxCount) * 100}%`,
                    transition: 'width 1s ease',
                  }} />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--c-text-light)', width: 40, textAlign: 'right' }}>
                  {ratingBreakdown[star]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards - horizontal scroll */}
        <div className="h-scroll" style={{ gap: '20px', paddingBottom: '8px' }}>
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
