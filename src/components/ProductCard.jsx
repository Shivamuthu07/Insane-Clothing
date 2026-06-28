import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

const SIZES_DEFAULT = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCard({ product, onAddToCart, onQuickView, onWishlist, isWishlisted }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizes, setShowSizes] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const sizes = product.sizes
    ? product.sizes.map(s => s.size)
    : SIZES_DEFAULT;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!selectedSize) {
      setShowSizes(true);
      return;
    }
    onAddToCart(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleSizeSelect = (size, e) => {
    e.stopPropagation();
    setSelectedSize(size);
    setShowSizes(false);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article
      id={`product-card-${product.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--c-surface)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowSizes(false); }}
      onClick={() => onQuickView(product)}
    >
      {/* Image Container */}
      <div
        style={{ position: 'relative', aspectRatio: '3/4', background: 'var(--c-surface-2)', overflow: 'hidden' }}
      >
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
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {product.badge && (
            <span className={`badge badge-${product.badge === 'NEW' ? 'new' : product.badge === 'SALE' ? 'sale' : product.badge === 'TRENDING' ? 'trending' : 'hot'}`}>
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="badge badge-sale">{discountPct}% OFF</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          id={`wishlist-${product.id}`}
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
            transition: 'all 0.25s ease',
            color: isWishlisted ? '#ef4444' : '#888',
            opacity: hovered || isWishlisted ? 1 : 0,
            transform: hovered || isWishlisted ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <Heart size={15} fill={isWishlisted ? '#ef4444' : 'none'} />
        </button>

        {/* Quick View + Add to Cart on hover */}
        {hovered && (
          <div
            className="fade-in"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '12px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
              paddingTop: '40px',
            }}
          >
            {showSizes ? (
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={(e) => handleSizeSelect(s, e)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 'var(--r-full)',
                      background: selectedSize === s ? '#fff' : 'rgba(255,255,255,0.2)',
                      color: selectedSize === s ? '#111' : '#fff',
                      fontSize: '0.72rem', fontWeight: 700,
                      border: '1px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer', backdropFilter: 'blur(4px)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1, padding: '10px',
                    background: addedFeedback ? '#22c55e' : '#fff',
                    color: addedFeedback ? '#fff' : '#111',
                    borderRadius: 'var(--r-full)', fontWeight: 700, fontSize: '0.78rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {addedFeedback ? '✓ Added!' : <><ShoppingBag size={14} /> Add to Bag</>}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  <Eye size={15} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--c-text-muted)' }}>
          {product.category}
        </span>
        <h3 style={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.3, color: 'var(--c-text)' }}>
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{product.rating}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--c-text)' }}>
            ₹{product.price.toLocaleString()}
          </span>
          {hasDiscount && (
            <>
              <span style={{ fontSize: '0.8rem', color: 'var(--c-text-light)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-success)' }}>
                {discountPct}% off
              </span>
            </>
          )}
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 1 && (
          <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
            {product.colors.slice(0, 4).map(c => (
              <div key={c.hex} style={{
                width: 14, height: 14, borderRadius: '50%',
                background: c.hex, border: '2px solid var(--c-border)',
              }} title={c.name} />
            ))}
            {product.colors.length > 4 && (
              <span style={{ fontSize: '0.65rem', color: 'var(--c-text-light)', alignSelf: 'center' }}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
