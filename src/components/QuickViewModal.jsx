import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Heart, Star, Truck, RotateCcw, Shield, Ruler } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart, onWishlist, isWishlisted }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const imgs = product.images || [product.img, product.img2].filter(Boolean);
  const sizes = product.sizes ? product.sizes.map(s => ({ size: s.size, inStock: s.stock > 0 })) : ['S','M','L','XL','XXL'].map(s => ({ size: s, inStock: true }));
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    onAddToCart(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <div className="overlay-bg" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 500 }}>
      <div
        id="quickview-modal"
        className="modal-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 940, maxHeight: '92dvh', overflowY: 'auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderRadius: 'var(--r-xl)',
        }}
      >
        {/* Image Column */}
        <div style={{ position: 'relative', background: 'var(--c-surface-2)' }}>
          <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
            <img
              src={imgs[selectedImg]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
            />
          </div>

          {/* Thumbnails */}
          {imgs.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', padding: '14px', position: 'absolute', bottom: 0, left: 0 }}>
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  style={{
                    width: 56, height: 56,
                    border: selectedImg === i ? '2px solid var(--c-accent)' : '2px solid rgba(255,255,255,0.3)',
                    borderRadius: 'var(--r-sm)', overflow: 'hidden', padding: 0, cursor: 'pointer',
                    flexShrink: 0, opacity: selectedImg === i ? 1 : 0.7,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          {/* Close */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-12px' }}>
            <button className="btn-ghost" onClick={onClose} aria-label="Close" style={{ borderRadius: '50%', padding: '8px' }}>
              <X size={20} />
            </button>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {product.badge && (
              <span className={`badge badge-${product.badge === 'NEW' ? 'new' : product.badge === 'SALE' ? 'sale' : 'trending'}`}>
                {product.badge}
              </span>
            )}
            {hasDiscount && <span className="badge badge-sale">{discountPct}% OFF</span>}
          </div>

          {/* Title */}
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--c-text-muted)', marginBottom: '6px' }}>
              {product.category}
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(1.2rem, 1rem + 1vw, 1.6rem)', lineHeight: 1.2 }}>{product.name}</h2>
          </div>

          {/* Rating */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color={i < Math.floor(product.rating) ? '#f59e0b' : 'var(--c-border)'} />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>({product.reviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
              ₹{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span style={{ fontSize: '1rem', color: 'var(--c-text-light)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {hasDiscount && (
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-success)' }}>
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          <div className="divider" />

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
                Color
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.colors.map(c => (
                  <div key={c.hex} title={c.name} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: c.hex, border: '3px solid var(--c-border)',
                    cursor: 'pointer', transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-text)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-border)'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Size
              </span>
              <button style={{ fontSize: '0.78rem', color: 'var(--c-accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Ruler size={12} /> Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sizes.map(s => (
                <button
                  key={s.size}
                  onClick={() => { if (s.inStock) { setSelectedSize(s.size); setSizeError(false); } }}
                  className={`size-pill ${selectedSize === s.size ? 'active' : ''} ${!s.inStock ? 'out-of-stock' : ''}`}
                >
                  {s.size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p style={{ color: 'var(--c-danger)', fontSize: '0.78rem', marginTop: '8px', fontWeight: 600 }}>
                Please select a size
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <span style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
              Quantity
            </span>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--c-border)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '8px 16px', fontWeight: 700, fontSize: '1rem' }}>−</button>
              <span style={{ padding: '8px 18px', fontWeight: 700, borderLeft: '1.5px solid var(--c-border)', borderRight: '1.5px solid var(--c-border)', minWidth: 40, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ padding: '8px 16px', fontWeight: 700, fontSize: '1rem' }}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-primary"
              onClick={handleAdd}
              style={{
                flex: 1, padding: '15px 24px',
                background: added ? 'var(--c-success)' : 'var(--c-text)',
                borderRadius: 'var(--r-full)',
              }}
            >
              {added ? '✓ Added to Bag!' : <><ShoppingBag size={16} /> Add to Bag — ₹{(product.price * qty).toLocaleString()}</>}
            </button>
            <button
              onClick={() => onWishlist(product.id)}
              className="btn btn-outline"
              style={{
                padding: '15px',
                borderRadius: '50%',
                width: 52, height: 52,
                color: isWishlisted ? '#ef4444' : 'var(--c-text)',
                borderColor: isWishlisted ? '#ef4444' : 'var(--c-border)',
              }}
            >
              <Heart size={18} fill={isWishlisted ? '#ef4444' : 'none'} />
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '18px', background: 'var(--c-surface-2)', borderRadius: 'var(--r-lg)' }}>
            {[
              { icon: <Truck size={15} />, text: 'Free shipping on orders above ₹999' },
              { icon: <RotateCcw size={15} />, text: 'Easy 7-day returns & exchanges' },
              { icon: <Shield size={15} />, text: '100% authentic, quality guaranteed' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
                <span style={{ color: 'var(--c-accent)', flexShrink: 0 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* Fabric & Care */}
          {(product.fabric || product.care) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {product.fabric && (
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
                  <strong style={{ color: 'var(--c-text)' }}>Fabric:</strong> {product.fabric}
                </p>
              )}
              {product.fit && (
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
                  <strong style={{ color: 'var(--c-text)' }}>Fit:</strong> {product.fit}
                </p>
              )}
              {product.care && (
                <p style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)' }}>
                  <strong style={{ color: 'var(--c-text)' }}>Care:</strong> {product.care}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--c-text-muted)' }}>
              {product.description}
            </p>
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 640px) {
            #quickview-modal { grid-template-columns: 1fr !important; max-height: 95dvh !important; }
          }
        ` }} />
      </div>
    </div>
  );
}
