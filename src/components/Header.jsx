import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, User, Heart, Menu, X, Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'New Arrivals', category: 'New Arrivals' },
  { label: 'Men', category: 'Men' },
  { label: 'Women', category: 'Women' },
  { label: 'Collections', category: 'Collections' },
  { label: 'Best Sellers', category: 'Best Sellers' },
  { label: 'Sale', category: 'Sale' },
];

export default function Header({ cartCount, wishlistCount, onCartClick, onAuthClick, onSearch, theme, toggleTheme, onCategorySelect, activeCategory, onNavigate, currentPage }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchVal);
    if (onNavigate) onNavigate('home');
  };

  const handleClearSearch = () => {
    setSearchVal('');
    onSearch('');
    setIsSearchOpen(false);
  };

  const handleNavClick = (category) => {
    onCategorySelect(category);
    setIsMobileMenuOpen(false);
    if (onNavigate) onNavigate('home');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    onCategorySelect('All');
    onSearch('');
    if (onNavigate) onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentPage === 'home' || !currentPage;
  const isTransparent = isHome && !isScrolled && !isSearchOpen;

  return (
    <>
      <header
        id="main-header"
        style={{
          position: 'fixed',
          top: 'var(--bar-height)',
          left: 0, right: 0,
          zIndex: 100,
          background: isTransparent ? 'transparent' : 'var(--c-surface)',
          backdropFilter: isTransparent ? 'none' : 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px) saturate(180%)',
          borderBottom: isTransparent ? '1px solid transparent' : '1px solid var(--c-border-light)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          height: 'var(--header-height)',
        }}
      >
        <div style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}>
          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className="btn-ghost show-mobile"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            style={{ display: 'none', color: isTransparent ? '#fff' : 'var(--c-text)' }}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <a
            href="/"
            id="site-logo"
            onClick={handleLogoClick}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: '2.2rem',
              letterSpacing: '-0.02em',
              color: isTransparent ? '#fff' : 'var(--c-text)',
              flexShrink: 0,
              transition: 'color 0.3s ease',
            }}
          >
            INSANE
          </a>

          {/* Desktop Nav */}
          <nav className="hide-mobile" style={{ display: 'flex', gap: '4px', flex: 1, justifyContent: 'center' }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.category}
                id={`nav-${link.category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleNavClick(link.category)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--c-text-muted)',
                  borderRadius: 'var(--r-full)',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  background: 'transparent',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = isTransparent ? '#fff' : 'var(--c-text)';
                  e.currentTarget.style.background = isTransparent ? 'rgba(255,255,255,0.1)' : 'var(--c-surface-2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--c-text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  ref={searchInputRef}
                  id="search-input"
                  type="text"
                  placeholder="Search products…"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="input"
                  style={{ padding: '8px 16px', width: 220, fontSize: '0.85rem', borderRadius: 'var(--r-full)' }}
                />
                <button type="button" className="btn-ghost" onClick={handleClearSearch} aria-label="Close search" style={{ padding: '6px' }}>
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                id="search-btn"
                className="btn-ghost"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                style={{ color: isTransparent ? '#fff' : 'var(--c-text)', padding: '8px' }}
              >
                <Search size={20} />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              className="btn-ghost"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ color: isTransparent ? '#fff' : 'var(--c-text)', padding: '8px' }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist */}
            <button
              id="wishlist-btn"
              className="btn-ghost hide-mobile"
              aria-label="Wishlist"
              style={{ position: 'relative', color: isTransparent ? '#fff' : 'var(--c-text)', padding: '8px' }}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: 0, right: 0,
                  background: 'var(--c-accent)', color: '#fff',
                  fontSize: '0.58rem', fontWeight: 800,
                  width: 16, height: 16, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid ' + (isTransparent ? 'transparent' : 'var(--c-surface)'),
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Auth */}
            <button
              id="auth-btn"
              className="btn-ghost hide-mobile"
              onClick={onAuthClick}
              aria-label="Account"
              style={{ color: isTransparent ? '#fff' : 'var(--c-text)', padding: '8px' }}
            >
              <User size={20} />
            </button>

            {/* Cart */}
            <button
              id="cart-btn"
              onClick={onCartClick}
              aria-label="Shopping bag"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: 'var(--r-full)',
                background: isTransparent ? 'rgba(255,255,255,0.15)' : 'var(--c-text)',
                backdropFilter: isTransparent ? 'blur(8px)' : 'none',
                color: isTransparent ? '#fff' : 'var(--c-bg)',
                fontWeight: 600, fontSize: '0.82rem',
                transition: 'all 0.3s ease',
                position: 'relative',
                border: isTransparent ? '1px solid rgba(255,255,255,0.2)' : 'none',
              }}
            >
              <ShoppingBag size={17} />
              <span className="hide-mobile">Bag</span>
              {cartCount > 0 && (
                <span
                  id="cart-count-badge"
                  style={{
                    background: 'var(--c-accent)', color: '#fff',
                    fontSize: '0.58rem', fontWeight: 800,
                    width: 18, height: 18, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'absolute', top: -6, right: -6,
                    border: '2px solid ' + (isTransparent ? 'transparent' : 'var(--c-surface)'),
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Menu */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500 }}>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s ease' }}
          />
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 320,
            background: 'var(--c-surface)',
            animation: 'slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex', flexDirection: 'column',
            boxShadow: 'var(--shadow-2xl)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid var(--c-border)' }}>
              <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
                INSANE
              </span>
              <button className="btn-ghost" onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '8px' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.category}
                  onClick={() => handleNavClick(link.category)}
                  style={{
                    display: 'block', width: '100%',
                    textAlign: 'left', padding: '16px 28px',
                    fontWeight: 600, fontSize: '1.05rem',
                    color: 'var(--c-text)',
                    background: 'transparent',
                    transition: 'background 0.2s ease',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--c-surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div style={{ padding: '20px 28px', borderTop: '1px solid var(--c-border)', display: 'flex', gap: '12px' }}>
              <button className="btn btn-primary" onClick={onAuthClick} style={{ flex: 1, padding: '12px' }}>Sign In</button>
              <button className="btn-ghost" onClick={toggleTheme} style={{ padding: '12px' }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
