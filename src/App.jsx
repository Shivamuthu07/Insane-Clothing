import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import TrendingNow from './components/TrendingNow';
import ProductShowcase from './components/ProductShowcase';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import CustomerReviews from './components/CustomerReviews';
import SocialProof from './components/SocialProof';
import Newsletter from './components/Newsletter';
// Data import removed, fetching from API instead
import { ArrowUp } from 'lucide-react';

// Inline SVG brand icons (not in lucide-react)
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Theme sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch products from Python Backend API
  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.PRODUCTS || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch from Python API, falling back to local JS:', err);
        // Fallback to static data if backend is not running
        import('./data/products').then(module => {
          setProducts(module.PRODUCTS);
          setIsLoading(false);
        });
      });
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // ── Cart Ops ─────────────────────────────────────────────────────────────
  const handleAddToCart = (product, size, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i.cartId === existing.cartId ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        cartId: `${product.id}-${size}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        img: product.img,
        size,
        qty,
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartId, delta) => {
    setCart(prev =>
      prev.map(i => i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
        .filter(i => !(i.cartId === cartId && i.qty + delta < 1))
    );
  };

  const handleRemove = (cartId) => setCart(prev => prev.filter(i => i.cartId !== cartId));
  const handleClearCart = () => setCart([]);

  // ── Wishlist Ops ─────────────────────────────────────────────────────────
  const handleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  // ── Category / Search ────────────────────────────────────────────────────
  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
    if (cat !== 'All' && cat !== 'Collections') {
      setTimeout(() => {
        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q) {
      setActiveCategory('All');
      setTimeout(() => {
        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  // ── Announcement Bar ───────────────────────────────────────────────
  const annItems = [
    '⚡ USE CODE INSANE10 FOR 10% OFF',
    '🚚 FREE SHIPPING ABOVE ₹999',
    '🔥 NEW DROPS EVERY FRIDAY',
    '✨ EASY 7-DAY RETURNS',
    '💳 PAY IN 3 WITH RAZORPAY',
  ];
  const annText = annItems.join('    ·    ');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--c-bg)' }}>

      {/* ── Announcement Bar ────────────────────────────────────── */}
      <div id="announcement-bar" className="announcement-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}>
        <div className="announcement-track">
          {[annText, annText, annText].map((t, i) => (
            <span key={i} aria-hidden={i > 0}>{t}</span>
          ))}
        </div>
      </div>

      {/* Spacer for fixed bars */}
      <div style={{ height: 'calc(var(--bar-height) + var(--header-height))' }} />

      {/* ── Header ─────────────────────────────────────────────── */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        onSearch={handleSearch}
        theme={theme}
        toggleTheme={toggleTheme}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      {/* ── Main Content ────────────────────────────────────────── */}
      <main style={{ flex: 1 }}>
        {/* Hero */}
        {!searchQuery && activeCategory === 'All' && (
          <>
            <div style={{ marginTop: 'calc(-1 * (var(--bar-height) + var(--header-height)))' }}>
              <Hero onShopCategory={handleCategorySelect} />
            </div>

            {/* Featured Collections */}
            <FeaturedCollections onCategorySelect={handleCategorySelect} />

            {/* Trending Now */}
            <TrendingNow
              products={products}
              onQuickView={setQuickViewProduct}
              onWishlist={handleWishlist}
              wishlist={wishlist}
              onAddToCart={handleAddToCart}
            />

            {/* Product Showcase - Apple Style */}
            <ProductShowcase />
          </>
        )}

        {/* Product Grid */}
        {isLoading ? (
          <div style={{ padding: '100px', textAlign: 'center', color: 'var(--c-text-muted)' }}>
            Loading products...
          </div>
        ) : (
          <ProductGrid
            products={products}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            onWishlist={handleWishlist}
            wishlist={wishlist}
          />
        )}

        {/* Below-grid sections (only on home) */}
        {!searchQuery && activeCategory === 'All' && (
          <>
            {/* Customer Reviews */}
            <CustomerReviews />

            {/* Social Proof */}
            <SocialProof />

            {/* Feature Strip */}
            <section style={{
              background: 'var(--c-bg)',
              padding: 'clamp(48px, 6vw, 80px) 0',
              borderTop: '1px solid var(--c-border-light)',
              borderBottom: '1px solid var(--c-border-light)',
            }}>
              <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                  {[
                    { emoji: '🚀', title: 'Express Shipping', sub: 'Delivered in 2–4 business days' },
                    { emoji: '↩️', title: 'Easy Returns', sub: '7-day hassle-free returns' },
                    { emoji: '🔒', title: 'Secure Checkout', sub: '256-bit SSL encrypted payments' },
                    { emoji: '🎁', title: 'Loyalty Rewards', sub: 'Earn points on every purchase' },
                  ].map(f => (
                    <div key={f.title} style={{
                      textAlign: 'center', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: '12px',
                    }}>
                      <span style={{ fontSize: '2rem' }}>{f.emoji}</span>
                      <strong style={{ fontSize: '0.92rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{f.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)', lineHeight: 1.5 }}>{f.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <Newsletter />
          </>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer id="footer" style={{
        background: 'var(--c-text)', color: 'var(--c-bg)',
        padding: 'clamp(60px, 8vw, 100px) 0 32px',
      }}>
        <div className="container">
          {/* Top row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px', marginBottom: '64px',
          }}>
            {/* Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{
                fontFamily: '"Playfair Display", serif', fontWeight: 700,
                fontSize: '2.4rem', letterSpacing: '-0.02em', lineHeight: 1,
              }}>
                INSANE
              </span>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, opacity: 0.55, maxWidth: 260 }}>
                Premium streetwear built for the bold. Designed in India, worn worldwide.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8, fontSize: '0.9rem', fontWeight: 600, marginTop: '4px' }}>
                <IconWhatsApp /> <span>+91 70108 68451</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                {[
                  { icon: <IconInstagram />, label: 'Instagram', url: 'https://www.instagram.com/insane_clothing.in' },
                  { icon: <IconFacebook />, label: 'Facebook', url: '#' },
                  { icon: <IconYoutube />, label: 'YouTube', url: '#' },
                  { icon: <IconWhatsApp />, label: 'WhatsApp', url: 'https://wa.me/917010868451' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: 40, height: 40, borderRadius: '50%',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--c-bg)', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; e.currentTarget.style.color = '#D4AF37'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-bg)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Shop', links: ['New Arrivals', 'T-Shirts', 'Shirts', 'Hoodies', 'Cargos', 'Jackets', 'Accessories'] },
              { title: 'Help', links: ['Size Guide', 'Track Order', 'Shipping Info', 'Returns & Exchanges', 'Contact Us', 'FAQ'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Use', 'Sustainability'] },
            ].map(col => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{
                  fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase',
                  letterSpacing: '0.12em', opacity: 0.4,
                }}>
                  {col.title}
                </span>
                {col.links.map(link => (
                  <a key={link} href="#" style={{
                    fontSize: '0.88rem', opacity: 0.6, transition: 'opacity 0.2s',
                    lineHeight: 1,
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '16px',
          }}>
            <span style={{ fontSize: '0.78rem', opacity: 0.4 }}>
              © {new Date().getFullYear()} Insane Clothing. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Visa', 'Mastercard', 'UPI', 'RazorPay', 'Stripe'].map(p => (
                <span key={p} style={{
                  fontSize: '0.7rem', fontWeight: 700, opacity: 0.25,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Overlays ────────────────────────────────────────────── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={handleClearCart}
      />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
        />
      )}

      {isAuthOpen && (
        <AuthModal onClose={() => setIsAuthOpen(false)} />
      )}

      {/* ── Back-to-Top ─────────────────────────────────────────── */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fade-in"
          style={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 200,
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--c-text)', color: 'var(--c-bg)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-xl), 0 0 30px rgba(212,175,55,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-text)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
