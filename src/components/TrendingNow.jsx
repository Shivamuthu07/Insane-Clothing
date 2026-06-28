import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

function TrendingCard({ product, onQuickView, onWishlist, isWishlisted, onAddToCart }) {
  const [hovered, setHovered] = React.useState(false);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        scrollSnapAlign: 'start',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onQuickView(product)}
    >
      <div style={{
        position: 'relative',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        aspectRatio: '3/4',
        background: 'var(--c-surface-2)',
        marginBottom: '14px',
      }}>
        <img
          src={hovered && product.img2 ? product.img2 : product.img}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          loading="lazy"
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.badge && (
            <span className={`badge badge-${product.badge === 'NEW' ? 'new' : product.badge === 'SALE' ? 'sale' : 'trending'}`}>
              {product.badge}
            </span>
          )}
          {hasDiscount && <span className="badge badge-sale">{discountPct}% OFF</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
          aria-label="Add to wishlist"
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            color: isWishlisted ? '#ef4444' : '#666',
            transition: 'all 0.2s ease',
            opacity: hovered || isWishlisted ? 1 : 0,
            transform: hovered || isWishlisted ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          <Heart size={15} fill={isWishlisted ? '#ef4444' : 'none'} />
        </button>

        {/* Quick actions on hover */}
        {hovered && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12,
            display: 'flex', gap: '8px',
            animation: 'slideUp 0.3s ease forwards',
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product, product.sizes?.[1]?.size || 'M'); }}
              style={{
                flex: 1, padding: '10px',
                background: 'var(--c-text)', color: 'var(--c-bg)',
                borderRadius: 'var(--r-full)', fontWeight: 600, fontSize: '0.78rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                border: 'none', cursor: 'pointer',
              }}
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer', color: '#111',
              }}
            >
              <Eye size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '0 4px' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--c-text-muted)', marginBottom: '4px' }}>
          {product.category}
        </p>
        <h3 style={{ fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.3, marginBottom: '6px' }}>
          {product.name}
        </h3>
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{product.rating}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)' }}>({product.reviews})</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
            ₹{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <span style={{ fontSize: '0.82rem', color: 'var(--c-text-light)', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {/* Color swatches */}
        {product.colors && product.colors.length > 1 && (
          <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
            {product.colors.map(c => (
              <div key={c.hex} style={{
                width: 14, height: 14, borderRadius: '50%',
                background: c.hex, border: '2px solid var(--c-border)',
              }} title={c.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrendingNow({ products, onQuickView, onWishlist, wishlist, onAddToCart }) {
  const scrollRef = useRef(null);
  const [headerRef, headerVisible] = useScrollReveal();

  const trending = products
    .filter(p => p.isBestSeller || p.badge === 'TRENDING')
    .slice(0, 10);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 310, behavior: 'smooth' });
    }
  };

  return (
    <section id="trending" className="section" style={{ background: 'var(--c-bg-warm)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''}`}>
            <span className="label" style={{ display: 'block', marginBottom: '8px', color: 'var(--c-accent)' }}>Hot Right Now</span>
            <h2 className="title-lg">Trending Now</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }} className="hide-mobile">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1.5px solid var(--c-border)', background: 'var(--c-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-text)'; e.currentTarget.style.color = 'var(--c-bg)'; e.currentTarget.style.borderColor = 'var(--c-text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-surface)'; e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.borderColor = 'var(--c-border)'; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1.5px solid var(--c-border)', background: 'var(--c-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-text)'; e.currentTarget.style.color = 'var(--c-bg)'; e.currentTarget.style.borderColor = 'var(--c-text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-surface)'; e.currentTarget.style.color = 'var(--c-text)'; e.currentTarget.style.borderColor = 'var(--c-border)'; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="h-scroll" style={{ gap: '24px', paddingBottom: '8px' }}>
          {trending.map(p => (
            <TrendingCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              onWishlist={onWishlist}
              isWishlisted={wishlist.includes(p.id)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
