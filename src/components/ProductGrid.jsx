import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
];

export default function ProductGrid({ products, searchQuery, activeCategory, onAddToCart, onQuickView, onWishlist, wishlist }) {
  const [sortBy, setSortBy] = useState('recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [headerRef, headerVisible] = useScrollReveal();

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory && activeCategory !== 'All') {
      if (activeCategory === 'New Arrivals') {
        list = list.filter(p => p.isNew || p.badge === 'NEW');
      } else if (activeCategory === 'Best Sellers') {
        list = list.filter(p => p.isBestSeller || p.badge === 'TRENDING');
      } else if (activeCategory === 'Sale') {
        list = list.filter(p => p.badge === 'SALE' || (p.originalPrice && p.originalPrice > p.price));
      } else if (activeCategory === 'Men') {
        list = list.filter(p => p.gender === 'Men' || p.gender === 'Unisex');
      } else if (activeCategory === 'Women') {
        list = list.filter(p => p.gender === 'Women' || p.gender === 'Unisex');
      } else if (activeCategory === 'Collections') {
        // Show all
      } else {
        list = list.filter(p => p.category === activeCategory);
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (p.description || '').toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price_asc': list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'popular': list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0)); break;
      case 'newest': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  const currentSort = SORT_OPTIONS.find(o => o.value === sortBy);

  return (
    <section id="shop" className="section" style={{ background: 'var(--c-bg-warm)' }}>
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`reveal ${headerVisible ? 'visible' : ''}`}
          style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: '32px', flexWrap: 'wrap', gap: '16px',
          }}
        >
          <div>
            <span className="label" style={{ display: 'block', marginBottom: '8px', color: 'var(--c-accent)' }}>
              {searchQuery ? 'Search Results' : 'Shop'}
            </span>
            <h2 className="title-lg" style={{ textTransform: 'none' }}>
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategory && activeCategory !== 'All'
                  ? activeCategory
                  : 'All Products'}
            </h2>
            <p style={{ color: 'var(--c-text-muted)', fontSize: '0.88rem', marginTop: '6px' }}>
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              id="sort-dropdown-btn"
              onClick={() => setIsSortOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', border: '1.5px solid var(--c-border)',
                borderRadius: 'var(--r-full)', background: 'var(--c-surface)',
                fontSize: '0.82rem', fontWeight: 500, color: 'var(--c-text)',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              <SlidersHorizontal size={14} />
              <span>{currentSort?.label}</span>
              <ChevronDown size={13} style={{ transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {isSortOpen && (
              <div className="fade-in" style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                background: 'var(--c-surface)', border: '1px solid var(--c-border)',
                borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xl)',
                zIndex: 50, width: 210, overflow: 'hidden',
              }}>
                {SORT_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => { setSortBy(o.value); setIsSortOpen(false); }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '12px 18px', fontSize: '0.85rem',
                      fontWeight: sortBy === o.value ? 700 : 400,
                      color: sortBy === o.value ? 'var(--c-accent)' : 'var(--c-text)',
                      background: sortBy === o.value ? 'var(--c-accent-light)' : 'transparent',
                      transition: 'background 0.15s ease',
                      cursor: 'pointer', border: 'none',
                    }}
                    onMouseEnter={e => { if (sortBy !== o.value) e.currentTarget.style.background = 'var(--c-surface-2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = sortBy === o.value ? 'var(--c-accent-light)' : 'transparent'; }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid-4">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onWishlist={onWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '100px 24px',
            border: '2px dashed var(--c-border)', borderRadius: 'var(--r-xl)',
          }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔍</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>No products found</p>
            <p style={{ color: 'var(--c-text-muted)', fontSize: '0.92rem' }}>
              Try clearing your search or switching categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
